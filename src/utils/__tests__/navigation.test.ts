import { describe, it, expect } from "vitest";
import { computeBounds } from "../navigation";

describe("navigation utils", () => {
  it("handles empty quiz gracefully", () => {
    const b = computeBounds(0, 0);
    expect(b.isFirst).toBe(true);
    expect(b.isLast).toBe(true);
  });

  it("detects first and last in a multi-question quiz", () => {
    expect(computeBounds(0, 3)).toEqual({ isFirst: true, isLast: false });
    expect(computeBounds(1, 3)).toEqual({ isFirst: false, isLast: false });
    expect(computeBounds(2, 3)).toEqual({ isFirst: false, isLast: true });
  });
});
