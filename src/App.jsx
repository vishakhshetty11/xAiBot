import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import FeedbackPage from "./pages/FeedbackPage";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="main-section">
        {/* Navbar */}
        <div className="navbar">
          <button className="hamburger" onClick={() => setOpen(true)}>
            ☰
          </button>
          <h1>Bot AI</h1>
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}