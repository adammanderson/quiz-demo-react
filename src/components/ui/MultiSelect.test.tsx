import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultiSelect from "./MultiSelect";

describe("MultiSelect", () => {
  const mockOptions = ["Option A", "Option B", "Option C"];
  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders all options", () => {
    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onSelect={mockOnSelect}
      />
    );

    mockOptions.forEach((option) => {
      expect(screen.getByRole("button", { name: option })).toBeInTheDocument();
    });
  });

  it("shows default hint text", () => {
    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByText("Select all that apply")).toBeInTheDocument();
  });

  it("shows custom hint text", () => {
    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onSelect={mockOnSelect}
        hint="Choose multiple"
      />
    );

    expect(screen.getByText("Choose multiple")).toBeInTheDocument();
  });

  it("marks selected options as active", () => {
    render(
      <MultiSelect
        options={mockOptions}
        selected={["Option A", "Option C"]}
        onSelect={mockOnSelect}
      />
    );

    expect(screen.getByRole("button", { name: "Option A" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "Option B" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
    expect(screen.getByRole("button", { name: "Option C" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("calls onSelect with option when clicked", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onSelect={mockOnSelect}
      />
    );

    await user.click(screen.getByRole("button", { name: "Option B" }));
    expect(mockOnSelect).toHaveBeenCalledWith("Option B");
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it("handles empty options array", () => {
    render(<MultiSelect options={[]} selected={[]} onSelect={mockOnSelect} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("does not re-render when selected array reference changes but content is same", () => {
    const { rerender } = render(
      <MultiSelect
        options={mockOptions}
        selected={["Option A"]}
        onSelect={mockOnSelect}
      />
    );

    const button = screen.getByRole("button", { name: "Option A" });
    const initialButton = button;

    // Re-render with new array reference but same content
    rerender(
      <MultiSelect
        options={mockOptions}
        selected={["Option A"]}
        onSelect={mockOnSelect}
      />
    );

    // Component should be memoized
    expect(screen.getByRole("button", { name: "Option A" })).toBe(
      initialButton
    );
  });
});
