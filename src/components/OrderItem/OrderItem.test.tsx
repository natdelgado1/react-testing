import { render, screen } from "@testing-library/react";
import { OrderItem } from "./OrderItem";
import { Order } from "../../types/Orders";
import { vi } from "vitest";

// Mocking the StatusBadge component to avoid rendering its internal logic
vi.mock("../../components/StatusBadge", () => ({
  StatusBadge: ({ status }: { status: string }) => <span>{status}</span>,
}));

const mockOrder: Order = {
  id: "1234567890abcdef",
  orderDate: "2023-11-01T10:30:00Z",
  status: "Shipped",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  products: [
    { id: "prod1", name: "Product 1", quantity: 2, price: 19.99 },
    { id: "prod2", name: "Product 2", quantity: 1, price: 49.99 },
  ],
  paymentMethod: "CREDIT_CARD",
  total: 89.97,
};

describe("OrderItem Component", () => {
  it("should display the order ID truncated to 8 characters", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText("Order #12345678")).toBeInTheDocument();
  });

  it("should format and display the order date correctly", () => {
    render(<OrderItem order={mockOrder} />);
    const formattedDate = new Date(mockOrder.orderDate).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("should display the customer's name and email", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText(mockOrder.customer.name)).toBeInTheDocument();
    expect(screen.getByText(mockOrder.customer.email)).toBeInTheDocument();
  });

  it("should display the correct status in the StatusBadge", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText(mockOrder.status)).toBeInTheDocument();
  });

  it("should list all products with correct quantity and price", () => {
    render(<OrderItem order={mockOrder} />);
    mockOrder.products.forEach((product) => {
      expect(
        screen.getByText(`${product.name} x${product.quantity}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`$${(product.price * product.quantity).toFixed(2)}`)
      ).toBeInTheDocument();
    });
  });

  it("should display the payment method correctly formatted", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText("CREDIT CARD")).toBeInTheDocument();
  });

  it("should display the total amount with two decimal points", () => {
    render(<OrderItem order={mockOrder} />);
    expect(screen.getByText(`$${mockOrder.total.toFixed(2)}`)).toBeInTheDocument();
  });
});
