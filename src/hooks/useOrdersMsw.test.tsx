import React from "react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { useOrders } from "./useOrders";
import { SessionProvider, useSession } from "../context/AuthContext";

vi.mock("../context/AuthContext", async () => {
  const actual = await vi.importActual("../context/AuthContext");
  return {
    ...actual,
    useSession: vi.fn(),
  };
});

describe("useOrders MSW", () => {
  const mockUser = { id: "1", name: "Wilmer Garzon" };

  beforeEach(() => {
    (useSession as Mock).mockReturnValue({ user: mockUser });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </SessionProvider>
  );

  it("debe obtener good la data", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useOrders(), {
      wrapper,
    });
    const initialLoading = result.current.loading;
    expect(initialLoading).toBe(true);

    await waitForNextUpdate();

    const lengthOrders = result.current.orders.length;
    expect(lengthOrders).toBe(1);
  });

  it("debe obtener un error", async () => {
    server.use(
      http.get("http://localhost:3001/orders", () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "Internal Server Error",
        });
      })
    );
    const { result, waitForNextUpdate } = renderHook(() => useOrders(), {
      wrapper,
    });
    await waitForNextUpdate();
    const error = result.current.error;
    expect(error).toBe("Failed to fetch orders. Please try again later.");
  });
});