import { useState } from "react";
import sampleData from "../data/sampleData";
import ChatMessage from "../components/ChatMessage";

export default function ChatPage() {

    const [messages, setMessages] = useState([]);

    const suggestions = [
        "Hi, what is the weather?",
        "Hi, what is my location?",
        "Hi, what is the temperature?",
        "Hi, how are you?"
    ];

    const getBotReply = (question) => {

        const match = sampleData.find(
            (item) => item.question.toLowerCase() === question.toLowerCase()
        );

        return match
            ? match.response
            : "Sorry, Did not understand your query!";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const input = e.target.message.value;

        if (!input) return;

        const userMsg = {
            sender: "user",
            text: input
        };

        const botMsg = {
            sender: "bot",
            text: getBotReply(input),
            reaction: null,
            rating: null,
            feedback: null
        };

        setMessages(prev => [...prev, userMsg, botMsg]);

        e.target.reset();
    };

    // ⭐ update reaction / rating / feedback
    const handleReact = (index, data) => {

        setMessages(prev =>
            prev.map((msg, i) =>
                i === index ? { ...msg, ...data } : msg
            )
        );

    };

    const handleSave = () => {

        const history = JSON.parse(localStorage.getItem("history")) || [];

        history.push({
            messages,
            date: new Date()
        });

        localStorage.setItem("history", JSON.stringify(history));

        setMessages([]);
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
                                            text: getBotReply(text),
                                            reaction: null,
                                            rating: null,
                                            feedback: null
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

                        <ChatMessage
                            key={index}
                            msg={msg}
                            index={index}
                            onReact={handleReact}
                        />

                    ))}

                </div>

            )}

            <form onSubmit={handleSubmit} className="chat-input">

                <input
                    name="message"
                    placeholder="Message Bot AI..."
                />

                <button type="submit">
                    Ask
                </button>

                <button
                    type="button"
                    onClick={handleSave}
                >
                    Save
                </button>

            </form>

        </div>
    );
}