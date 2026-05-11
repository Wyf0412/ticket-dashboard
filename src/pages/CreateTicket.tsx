import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTicketStore } from "../store/ticketStore";
import type { TicketInput } from "../api";

export default function CreateTicket() {
  const navigate = useNavigate();
  const { addTicket } = useTicketStore();
  const [form, setForm] = useState<TicketInput>({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addTicket(form);
      navigate("/");
    } catch (error) {
      alert("创建失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">创建工单</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">标题</label>
          <input
            id="title"
            type="text"
            required
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="desc" className="block mb-1 font-medium">描述</label>
          <textarea
            id="desc"
            rows={3}
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="priority" className="block mb-1 font-medium">优先级</label>
          <select
            id="priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
            className="w-full border p-2 rounded"
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {submitting ? "提交中..." : "创建"}
        </button>
      </form>
    </div>
  );
}