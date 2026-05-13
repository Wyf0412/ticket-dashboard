import axios from "axios";

export const api = axios.create({
  baseURL: "",
  timeout: 5000,
});

// 响应拦截器统一处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// 定义工单类型
export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

export type TicketInput = Omit<Ticket, "id" | "createdAt">;