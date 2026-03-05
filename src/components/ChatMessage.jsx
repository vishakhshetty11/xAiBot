import { useState } from "react";

export default function ChatMessage({ msg, index, onReact }) {

    const [showStars, setShowStars] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");

    const isUser = msg.sender === "user";

    const handleLike = () => {
        setShowStars(true);
        onReact(index, { reaction: { type: "like" } });
    };

    const handleDislike = () => {
        setShowModal(true);
        onReact(index, { reaction: { type: "dislike" } });
    };

    const handleStarClick = (star) => {
        onReact(index, { rating: star });
    };

    const submitFeedback = () => {
        onReact(index, {
            feedback: feedbackText,
            reaction: { type: "dislike", feedback: feedbackText }
        });
        setShowModal(false);
    };

    return (
        <div className={`message ${isUser ? "user" : "bot"}`}>

            {/* REQUIRED FOR CYPRESS TEST */}
            <span>{isUser ? "You" : "Soul AI"}</span>

            <p>{msg.text}</p>

            {msg.feedback && (
                <div className="message-feedback">
                    <strong>Feedback:</strong> {msg.feedback}
                </div>
            )}

            {!isUser && (
                <>
                    <div className="reaction-buttons">
                        <button onClick={handleLike}>👍</button>
                        <button onClick={handleDislike}>👎</button>
                    </div>

                    {showStars && (
                        <div className="star-rating">
                            {[1,2,3,4,5].map((star)=>(
                                <span
                                    key={star}
                                    className={msg.rating >= star ? "star active" : "star"}
                                    onClick={()=>handleStarClick(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    )}

                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">

                                <h3>Provide Feedback</h3>

                                <textarea
                                    placeholder="Write your feedback..."
                                    value={feedbackText}
                                    onChange={(e)=>setFeedbackText(e.target.value)}
                                />

                                <div style={{marginTop:"10px"}}>
                                    <button onClick={submitFeedback}>
                                        Submit
                                    </button>

                                    <button onClick={()=>setShowModal(false)}>
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </>
            )}

        </div>
    );
}