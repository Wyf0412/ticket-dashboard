import { create } from "zustand";
import { api }from "../api";
import type { Ticket, TicketInput } from "../api";

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  fetchTickets: () => Promise<void>;
  addTicket: (ticket: TicketInput) => Promise<void>;
  updateTicketStatus: (id: string, status: Ticket["status"]) => Promise<void>;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  loading: false,
  error: null,

  fetchTickets: async () => {
    set({ loading: true, error: null });
    try {
<<<<<<< HEAD
      const res = await api.get<Ticket[]>("/api/tickets");
=======
      const res = await api.get<Ticket[]>("/tickets");
>>>>>>> 65b23d54a98f973802ecae85fdee71ccb87c0261
      set({ tickets: res.data, loading: false });
    } catch (err) {
      set({ error: "加载工单失败", loading: false });
    }
  },

  addTicket: async (ticket) => {
    set({ loading: true, error: null });
    try {
      const newTicket = {
        ...ticket,
        createdAt: new Date().toISOString(),
      };
<<<<<<< HEAD
      const res = await api.post<Ticket>("/api/tickets", newTicket);
=======
      const res = await api.post<Ticket>("/tickets", newTicket);
>>>>>>> 65b23d54a98f973802ecae85fdee71ccb87c0261
      set((state) => ({ tickets: [...state.tickets, res.data], loading: false }));
    } catch (err) {
      set({ error: "添加工单失败", loading: false });
      throw err;
    }
  },

  updateTicketStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
<<<<<<< HEAD
      const res = await api.patch<Ticket>(`/api/tickets/${id}`, { status });
=======
      const res = await api.patch<Ticket>(`/tickets/${id}`, { status });
>>>>>>> 65b23d54a98f973802ecae85fdee71ccb87c0261
      set((state) => ({
        tickets: state.tickets.map((t) => (t.id === id ? res.data : t)),
        loading: false,
      }));
    } catch (err) {
      set({ error: "更新状态失败", loading: false });
    }
  },
}));