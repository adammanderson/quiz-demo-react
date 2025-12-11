import { describe, it, expect } from "vitest";
import { getUpdatedOptions, toggleOption } from "../selection";

describe("selection utils", () => {
  it("adds an option when not present", () => {
    const next = getUpdatedOptions([], "A");
    expect(next).toEqual(["A"]);
  });

  it("removes an option when already present", () => {
    const next = getUpdatedOptions(["A", "B"], "A");
    expect(next).toEqual(["B"]);
  });

  it("keeps other options intact when toggling one", () => {
    const next = getUpdatedOptions(["A", "B", "C"], "B");
    expect(next).toEqual(["A", "C"]);
  });

  it("does not create duplicates when toggling add twice", () => {
    const once = toggleOption([], "A");
    const twice = toggleOption(once, "A"); // remove
    const thrice = toggleOption(twice, "A"); // add again
    expect(once).toEqual(["A"]);
    expect(twice).toEqual([]);
    expect(thrice).toEqual(["A"]);
  });
});
