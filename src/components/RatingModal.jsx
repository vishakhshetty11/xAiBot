import { useState } from "react";

export default function RatingModal({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Rate this Conversation</h3>

        <div className="stars">
          {[1,2,3,4,5].map(num => (
            <span
              key={num}
              onClick={() => setRating(num)}
              className={num <= rating ? "active" : ""}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button onClick={() => onSubmit(rating, feedback)}>
          Submit
        </button>
      </div>
    </div>
  );
}