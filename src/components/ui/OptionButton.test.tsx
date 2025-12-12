import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import OptionButton from "./OptionButton";

describe("OptionButton", () => {
  it("renders the option text", () => {
    render(
      <OptionButton option="Test Option" active={false} onSelect={vi.fn()} />
    );

    expect(
      screen.getByRole("button", { name: "Test Option" })
    ).toBeInTheDocument();
  });

  it("calls onSelect with the option when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <OptionButton option="Test Option" active={false} onSelect={onSelect} />
    );

    await user.click(screen.getByRole("button"));

    expect(onSelect).toHaveBeenCalledWith("Test Option");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("sets aria-pressed to false when not active", () => {
    render(
      <OptionButton option="Test Option" active={false} onSelect={vi.fn()} />
    );

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("applies the option-selected class when active", () => {
    render(
      <OptionButton option="Test Option" active={true} onSelect={vi.fn()} />
    );

    expect(screen.getByRole("button")).toHaveClass("option", "option-selected");
  });

  it("does not apply the option-selected class when not active", () => {
    render(
      <OptionButton option="Test Option" active={false} onSelect={vi.fn()} />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("option");
    expect(button).not.toHaveClass("option-selected");
  });
});
