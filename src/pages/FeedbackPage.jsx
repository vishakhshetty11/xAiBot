import { useState } from "react";

export default function FeedbackPage() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const [filter, setFilter] = useState(0);

  const filtered = filter
    ? history.filter(h => h.rating === filter)
    : history;

  return (
    <div className="feedback-page">
      <h2>All Feedback</h2>

      <select onChange={(e) => setFilter(Number(e.target.value))}>
        <option value="0">All Ratings</option>
        {[1,2,3,4,5].map(n => (
          <option key={n} value={n}>{n} Star</option>
        ))}
      </select>

      {filtered.map((chat, i) => (
        <div key={i} className="feedback-card">
          <div>Rating: {chat.rating}</div>
          <div>{chat.feedback}</div>
        </div>
      ))}
    </div>
  );
}