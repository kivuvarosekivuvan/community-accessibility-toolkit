import React, { useState } from 'react';
import './styles/UserFeedback.css';


const UserFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = () => {
    if (feedback) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);

      setFeedback('');
      setRating(0);
      setCategory('');
    } else {
      alert('Please provide your feedback.');
    }
  };

  return (
    <section className="feedback-section">
      <h2>User Feedback</h2>
      
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Compliment">Compliment</option>
        </select>
      </div>
      
      <div className="rating">
        <span>Rate your experience: </span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? 'filled' : ''}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your feedback..."
      ></textarea>

      <button onClick={handleSubmit}>Submit Feedback</button>

      {showSuccessPopup && (
        <div className="success-popup">
          <p>Feedback submitted successfully!</p>
        </div>
      )}
    </section>
  );
};

export default UserFeedback;