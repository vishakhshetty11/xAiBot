import { Link } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      <div className={`sidebar ${open ? "active" : ""}`}>
        
        {/* Mac Dots */}
        <div className="mac-dots">
          <span className="red"></span>
          <span className="yellow"></span>
          <span className="green"></span>
        </div>

        {/* New Chat Section */}
        <Link to="/" onClick={() => setOpen(false)} className="new-chat">
          <span className="logo-icon">🧠</span>
          <span>New Chat</span>
          <span className="edit-icon">✎</span>
        </Link>

        {/* Past Conversations */}
        <Link
          to="/history"
          onClick={() => setOpen(false)}
          className="past-chat-btn"
        >
          Past Conversations
        </Link>

      </div>
    </>
  );
}