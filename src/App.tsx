import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TicketList from "./pages/TicketList";
import TicketDetail from "./pages/TicketDetail";
import CreateTicket from "./pages/CreateTicket";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md p-4">
          <div className="container mx-auto flex gap-4">
            <Link to="/" className="text-blue-600 hover:underline">工单列表</Link>
            <Link to="/create" className="text-blue-600 hover:underline">创建工单</Link>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/ticket/:id" element={<TicketDetail />} />
            <Route path="/create" element={<CreateTicket />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;