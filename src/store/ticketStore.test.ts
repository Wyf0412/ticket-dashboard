import { describe, it, expect, beforeEach, vi } from "vitest";
import { useTicketStore } from "./ticketStore";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe("ticketStore", () => {
  beforeEach(() => {
    useTicketStore.setState({ tickets: [], loading: false, error: null });
    vi.clearAllMocks();
  });

  it("fetchTickets should update tickets on success", async () => {
    const mockTickets = [{ id: "1", title: "Test", description: "", status: "pending", priority: "low", createdAt: "" }];
    (api.get as any).mockResolvedValue({ data: mockTickets });

    await useTicketStore.getState().fetchTickets();
    const state = useTicketStore.getState();
    expect(state.tickets).toEqual(mockTickets);
    expect(state.loading).toBe(false);
  });

  it("fetchTickets should set error on failure", async () => {
    (api.get as any).mockRejectedValue(new Error("Network error"));
    await useTicketStore.getState().fetchTickets();
    const state = useTicketStore.getState();
    expect(state.error).toBe("加载工单失败");
  });
});