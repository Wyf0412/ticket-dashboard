import type { VercelRequest, VercelResponse } from '@vercel/node';

// 模拟数据（内存存储，重启后重置，但对演示完全够用）
let tickets = [
  {
    id: '1',
    title: '登录页面样式错位',
    description: '在移动端视口下，登录按钮被遮挡',
    status: 'pending',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'API 请求超时未处理',
    description: '网络慢时页面一直 loading，没有超时提示',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: '表格排序功能失效',
    description: '点击表头排序状态混乱',
    status: 'done',
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, body, query } = req;

  // GET - 获取所有工单
  if (method === 'GET') {
    return res.status(200).json(tickets);
  }

  // POST - 创建工单
  if (method === 'POST') {
    const newTicket = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    tickets.push(newTicket);
    return res.status(201).json(newTicket);
  }

  // PATCH - 更新工单状态（通过查询参数 id）
  if (method === 'PATCH') {
    const id = query.id as string;
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    Object.assign(ticket, body);
    return res.status(200).json(ticket);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}