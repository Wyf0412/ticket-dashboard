import axios from "axios";

export const api = axios.create({
  baseURL: "",   // 空字符串
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

export type TicketInput = Omit<Ticket, "id" | "createdAt">;