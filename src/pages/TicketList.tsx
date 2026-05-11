import { useEffect, useState } from "react";
import { useTicketStore } from "../store/ticketStore";
import { Link } from "react-router-dom";

const statusMap = {
  pending: "待处理",
  "in-progress": "进行中",
  done: "已完成",
};

const priorityColor = {
  low: "bg-gray-200",
  medium: "bg-yellow-200",
  high: "bg-red-200",
};

export default function TicketList() {
  const { tickets, loading, error, fetchTickets } = useTicketStore();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets
    .filter((t) => (filterStatus === "all" ? true : t.status === filterStatus))
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="text-center py-10">加载中...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div>
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="搜索标题..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">全部</option>
          <option value="pending">待处理</option>
          <option value="in-progress">进行中</option>
          <option value="done">已完成</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标题</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">优先级</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link to={`/ticket/${ticket.id}`} className="text-blue-600 hover:underline">
                    {ticket.title}
                  </Link>
                </td>
                <td className="px-6 py-4">{statusMap[ticket.status]}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${priorityColor[ticket.priority]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(ticket.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}