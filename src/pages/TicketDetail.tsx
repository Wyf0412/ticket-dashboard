<<<<<<< HEAD
import { useParams, useNavigate } from "react-router-dom";
=======
import { useParams } from "react-router-dom";
>>>>>>> 65b23d54a98f973802ecae85fdee71ccb87c0261
import { useTicketStore } from "../store/ticketStore";
import { useEffect } from "react";

export default function TicketDetail() {
  const { id } = useParams();
  const { tickets, fetchTickets, updateTicketStatus } = useTicketStore();
  const ticket = tickets.find((t) => t.id === id);

  useEffect(() => {
    if (!ticket && tickets.length === 0) fetchTickets();
  }, []);

  if (!ticket) return <div>工单不存在</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{ticket.title}</h1>
      <p className="mb-2">{ticket.description}</p>
      <p>优先级：{ticket.priority}</p>
      <p>状态：</p>
      <select
        value={ticket.status}
        onChange={(e) => updateTicketStatus(ticket.id, e.target.value as any)}
        className="border p-1 rounded"
      >
        <option value="pending">待处理</option>
        <option value="in-progress">进行中</option>
        <option value="done">已完成</option>
      </select>
      <button
        onClick={() => window.history.back()}
        className="mt-4 ml-4 bg-gray-300 px-3 py-1 rounded"
      >
        返回
      </button>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 65b23d54a98f973802ecae85fdee71ccb87c0261
