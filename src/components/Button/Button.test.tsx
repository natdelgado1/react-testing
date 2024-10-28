import { describe, it, test, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button />", () => {
  it("Deberia renderizar el texto", () => {
    render(<Button label="click me" />);
    const button = screen.getByText("click me");
    expect(button).toBeInTheDocument();
  });

  it("Deberia llamar onClick al hacer click en el componente", async () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    const button = screen.getByText("Click me");
    await act(() => {
      fireEvent.click(button);
    });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
