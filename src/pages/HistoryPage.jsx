import { useEffect, useState } from "react";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("history")) || [];
        setHistory(saved.reverse());
    }, []);

    return (
        <div className="history-page">
            <h2>Conversation History</h2>

            {history.length === 0 && (
                <div className="no-history">
                    No conversations saved yet.
                </div>
            )}

            {history.length > 0 && (
                <>
                    <div className="history-section-title">
                        Today’s Chats
                    </div>

                    {history.map((chat, i) => (
                        <div key={i} className="history-card">
                            {chat.messages.map((msg, idx) => (
                                <div key={idx} className="history-message">
                                    <div className="history-avatar">
                                        {msg.sender === "user" ? "👤" : "🧠"}
                                    </div>

                                    <div className="history-content">
                                        <strong>
                                            {msg.sender === "user" ? "You" : "Soul AI"}
                                        </strong>

                                        <p>{msg.text}
                                            {msg.reaction && (
                                                <div style={{ fontSize: "14px", marginTop: "4px" }}>
                                                    Reaction: {msg.reaction === "like" ? "👍" : "👎"}
                                                </div>
                                            )}
                                        </p>

                                        <div className="history-time">
                                            {new Date(chat.date).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {chat.rating && (
                                <div className="history-rating">
                                    Rating:
                                    <span>
                                        {"★".repeat(chat.rating)}
                                    </span>
                                </div>
                            )}

                            {chat.feedback && (
                                <div className="history-feedback">
                                    Feedback: {chat.feedback}
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}