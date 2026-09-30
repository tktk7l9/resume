import { describe, expect, it } from "vitest";
import {
  focusTargetAfterSubmit,
  initialContactState,
  normalizeContactField,
  validateContactField,
} from "@/app/[locale]/contact/state";

describe("normalizeContactField", () => {
  it("trims every field", () => {
    expect(normalizeContactField("name", "  山田 太郎  ")).toBe("山田 太郎");
  });

  it("folds full-width characters in the email address", () => {
    expect(
      normalizeContactField("email", " ｙａｍａｄａ＠ｅｘａｍｐｌｅ．ｃｏｍ "),
    ).toBe("yamada@example.com");
  });

  it("keeps full-width characters in free text", () => {
    expect(normalizeContactField("message", "ＡＢＣ")).toBe("ＡＢＣ");
  });
});

describe("validateContactField", () => {
  it("accepts a full-width email address", () => {
    expect(validateContactField("email", "ｙａｍａｄａ＠example.com")).toBe(
      true,
    );
  });

  it("requires at least 10 characters in the message", () => {
    expect(validateContactField("message", "短い")).toBe(false);
    expect(validateContactField("message", "これは十分に長い本文です")).toBe(
      true,
    );
  });
});

describe("initialContactState", () => {
  it("starts with empty values", () => {
    expect(initialContactState.values).toEqual({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  });
});

describe("focusTargetAfterSubmit", () => {
  const base = { ...initialContactState, status: "error" as const };

  it("does nothing before the first submit", () => {
    expect(focusTargetAfterSubmit(initialContactState)).toBeNull();
  });

  it("moves to the success message once the form is gone", () => {
    expect(
      focusTargetAfterSubmit({ ...initialContactState, status: "success" }),
    ).toBe("success");
  });

  it("returns the first invalid field in form order", () => {
    expect(
      focusTargetAfterSubmit({
        ...base,
        fieldErrors: { message: true, email: true },
      }),
    ).toBe("email");
  });

  it("returns the form-level error when no field is invalid", () => {
    expect(focusTargetAfterSubmit({ ...base, formError: "server" })).toBe(
      "formError",
    );
  });
});
