import { describe, expect, it } from "vitest";
import {
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
