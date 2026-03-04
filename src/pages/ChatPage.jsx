import { useState } from "react";
import { sampleData } from "../data/sampleData";
import ChatMessage from "../components/ChatMessage";
import RatingModal from "../components/RatingModal";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const suggestions = [
    "Hi, what is the weather?",
    "Hi, what is my location?",
    "Hi, what is the temperature?",
    "Hi, how are you?"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.message.value;
    if (!input) return;

    const userMsg = { sender: "user", text: input };

    const botReply =
      sampleData[input] ||
      "Sorry, Did not understand your query!";

    const botMsg = { sender: "bot", text: botReply };

    setMessages([...messages, userMsg, botMsg]);
    e.target.reset();
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const saveConversation = (rating, feedback) => {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push({ messages, rating, feedback, date: new Date() });
    localStorage.setItem("history", JSON.stringify(history));
    setMessages([]);
    setShowModal(false);
  };

  return (
    <div className="chat-wrapper">
      {messages.length === 0 && (
        <div className="welcome-section">
          <h2>How Can I Help You Today?</h2>
          <div className="bot-icon">🧠</div>

          <div className="suggestions">
            {suggestions.map((text, index) => (
              <div
                key={index}
                className="suggestion-card"
                onClick={() =>
                  setMessages([
                    { sender: "user", text },
                    {
                      sender: "bot",
                      text:
                        sampleData[text] ||
                        "Sorry, Did not understand your query!"
                    }
                  ])
                }
              >
                <h4>{text}</h4>
                <p>Get immediate AI generated response</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} msg={msg} />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          name="message"
          placeholder="Message Bot AI..."
        />
        <button type="submit">Ask</button>
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>

      {showModal && <RatingModal onSubmit={saveConversation} />}
    </div>
  );
}