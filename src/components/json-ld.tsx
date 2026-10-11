// Renders a schema.org payload as a <script type="application/ld+json">.
// ld+json is a data block that never executes, so it is outside CSP script-src
// and gets no nonce. `<` is escaped so an embedded string can never close the
// script element or open an HTML comment (src/lib/trust-boundary.test.tsx).
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data; every < is escaped
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
