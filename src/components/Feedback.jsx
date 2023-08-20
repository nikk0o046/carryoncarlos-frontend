import React, { useState } from 'react';

function Feedback({ onFeedbackSubmit }) {
  const [thumbs, setThumbs] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = () => {
    onFeedbackSubmit({ thumbs, feedbackText: feedbackText });
  };

  return (
    <div className="feedback-section">
        <div className="thumbs-section">
            <button onClick={() => setThumbs('up')}>👍</button>
            <button onClick={() => setThumbs('down')}>👎</button>
        </div>
        <textarea 
            className="feedback-textarea"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Additional feedback..."
        ></textarea>
        <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
}

export default Feedback;
