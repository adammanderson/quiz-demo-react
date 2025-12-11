import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("button", "custom-class");
  });

  it("forwards native button props", () => {
    render(
      <Button type="submit" disabled aria-label="Submit form">
        Submit
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-label", "Submit form");
  });
});
