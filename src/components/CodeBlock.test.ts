import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { extractText } from "./CodeBlock";

describe("extractText", () => {
  it("returns a string child as-is", () => {
    expect(extractText("hello")).toBe("hello");
  });

  it("stringifies number and bigint children", () => {
    expect(extractText(42)).toBe("42");
    expect(extractText(42n)).toBe("42");
  });

  it("returns empty string for null, undefined and boolean", () => {
    expect(extractText(null)).toBe("");
    expect(extractText(undefined)).toBe("");
    expect(extractText(true)).toBe("");
    expect(extractText(false)).toBe("");
  });

  it("extracts text from nested elements", () => {
    const node = createElement("code", null, createElement("span", null, "const"), " x");
    expect(extractText(node)).toBe("const x");
  });

  it("extracts text from arrays", () => {
    expect(extractText(["a", "b", 1])).toBe("ab1");
  });

  it("extracts text from non-array iterables", () => {
    expect(extractText(new Set(["a", "b"]))).toBe("ab");

    function* gen() {
      yield "x";
      yield "y";
    }
    expect(extractText(gen())).toBe("xy");
  });
});
