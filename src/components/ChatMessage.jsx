import { useState } from "react";

export default function ChatMessage({ msg, index, onReact }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`message ${msg.sender}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {msg.sender === "bot" && (
        <>
          <span className="bot-name">
            <span>Soul AI</span>
          </span>

          <p>{msg.text}</p>

          {(hover || msg.reaction) && (
            <div className="reaction">
              <button
                className={msg.reaction === "like" ? "active" : ""}
                onClick={() => onReact(index, "like")}
              >
                👍
              </button>

              <button
                className={msg.reaction === "dislike" ? "active" : ""}
                onClick={() => onReact(index, "dislike")}
              >
                👎
              </button>
            </div>
          )}
        </>
      )}

      {msg.sender === "user" && <div>{msg.text}</div>}
    </div>
  );
}