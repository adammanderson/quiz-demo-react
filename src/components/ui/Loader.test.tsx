import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  it("renders with default props", () => {
    render(<Loader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    render(<Loader message="Loading quiz..." />);
    expect(screen.getByText("Loading quiz...")).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<Loader message="Please wait" />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-label", "Loading");
  });
});
