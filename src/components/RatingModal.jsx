import { useState } from "react";

export default function RatingModal({ close, onSubmit }) {

  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim() === "") return;
    onSubmit(text);
  };

  return (
    <div className="modal">

      <div className="modal-content">

        <h3>Give Feedback</h3>

        <textarea
          placeholder="Write feedback..."
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />

        <div style={{marginTop:"10px",display:"flex",gap:"10px"}}>

          <button onClick={handleSubmit}>
            Submit
          </button>

          <button onClick={close}>
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}