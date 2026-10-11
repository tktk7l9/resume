// Guards the trust boundary that the per-request script nonce relies on
// (src/lib/csp-nonce.ts). The Worker stamps the nonce on every inline <script>
// in the HTML and cannot tell an injected one from Next's own, so the server
// must never emit untrusted HTML. React escapes everything it renders except
// dangerouslySetInnerHTML, so that prop is allowed only in the files listed in
// ALLOWED, and each of those sinks is fed hostile input below.
// The scan reads the TypeScript AST: a mention in a comment or in JSX text does
// not count. A dependency that renders raw HTML internally is outside the scan;
// review one before adding it.
import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative, resolve, sep } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { JsonLd } from "@/components/json-ld";

const ROOT = resolve(__dirname, "../..");

/** The only files allowed to use dangerouslySetInnerHTML, each with why its HTML is trusted. */
const ALLOWED: Record<string, string> = {
  "src/components/json-ld.tsx":
    "JSON-LD helper: JSON.stringify output with every < escaped",
};

const SCRIPT_KINDS: Record<string, ts.ScriptKind> = {
  ".ts": ts.ScriptKind.TS,
  ".mts": ts.ScriptKind.TS,
  ".cts": ts.ScriptKind.TS,
  ".tsx": ts.ScriptKind.TSX,
  ".js": ts.ScriptKind.JS,
  ".mjs": ts.ScriptKind.JS,
  ".cjs": ts.ScriptKind.JS,
  ".jsx": ts.ScriptKind.JSX,
};

/** App source under src/. Tests are skipped: they never reach the server-rendered HTML. */
function appSourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === "__tests__" ? [] : appSourceFiles(path);
    }
    const isTest = /\.test\.[cm]?[jt]sx?$/.test(entry.name);
    return extname(entry.name) in SCRIPT_KINDS && !isTest ? [path] : [];
  });
}

/**
 * True when the code names `name` as an identifier or a string: a JSX
 * attribute, an object key, an import specifier. Comments and JSX text do not
 * count.
 */
function codeNames(code: string, ext: string, name: string): boolean {
  const source = ts.createSourceFile(
    `x${ext}`,
    code,
    ts.ScriptTarget.Latest,
    false,
    SCRIPT_KINDS[ext],
  );
  const visit = (node: ts.Node): boolean =>
    ((ts.isIdentifier(node) || ts.isStringLiteralLike(node)) &&
      node.text === name) ||
    ts.forEachChild(node, visit) === true;
  return visit(source);
}

describe("dangerouslySetInnerHTML", () => {
  const files = appSourceFiles(join(ROOT, "src")).map((file) =>
    relative(ROOT, file).split(sep).join("/"),
  );
  const users = files.filter((file) =>
    codeNames(
      readFileSync(join(ROOT, file), "utf8"),
      extname(file),
      "dangerouslySetInnerHTML",
    ),
  );

  it("scans the app source (pages, components, lib)", () => {
    expect(files).toEqual(
      expect.arrayContaining([
        "src/app/[locale]/layout.tsx",
        "src/components/contact-form.tsx",
        "src/lib/csp-nonce.ts",
      ]),
    );
    expect(files.some((file) => file.includes(".test."))).toBe(false);
  });

  it("appears only in allowlisted files", () => {
    expect(users.filter((file) => !(file in ALLOWED))).toEqual([]);
  });

  it("is still used by every allowlisted file (no stale entries)", () => {
    expect(
      Object.keys(ALLOWED).filter((file) => !users.includes(file)),
    ).toEqual([]);
  });

  it("is detected in code but not in comments or JSX text", () => {
    const prop = "dangerouslySetInnerHTML";
    expect(
      codeNames(
        "<div dangerouslySetInnerHTML={{ __html: x }} />",
        ".tsx",
        prop,
      ),
    ).toBe(true);
    expect(
      codeNames(
        'createElement("div", { dangerouslySetInnerHTML: { __html: x } })',
        ".js",
        prop,
      ),
    ).toBe(true);
    expect(
      codeNames(
        'const props = { ["dangerouslySetInnerHTML"]: html };',
        ".ts",
        prop,
      ),
    ).toBe(true);
    expect(
      codeNames(
        "// dangerouslySetInnerHTML is not used here\nexport {};",
        ".ts",
        prop,
      ),
    ).toBe(false);
    expect(
      codeNames("const p = <p>dangerouslySetInnerHTML</p>;", ".tsx", prop),
    ).toBe(false);
  });
});

describe("JSON-LD (src/components/json-ld.tsx)", () => {
  it("never lets a string close the script element or open a comment", () => {
    const data = {
      "@type": "Person",
      name: "</script><script>alert(1)</script>",
      jobTitle: ["</SCRIPT >", "<!--<script>", "-->"],
    };
    const html = renderToStaticMarkup(<JsonLd data={data} />);
    const match =
      /^<script type="application\/ld\+json">([\s\S]*)<\/script>$/.exec(html);
    expect(match).not.toBeNull();
    const body = match?.[1] ?? "";
    expect(body).not.toMatch(/<\/script/i);
    expect(body).not.toContain("<!--");
    expect(body).not.toContain("<");
    // Crawlers still read the same data.
    expect(JSON.parse(body)).toEqual(data);
  });
});
