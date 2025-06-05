// frontend/src/components/UserFeedback.js

import React, { useState } from 'react';
import './styles/UserFeedback.css';

const UserFeedback = () => {
  // Form state
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');

  // Result & UI state
  const [sentimentResult, setSentimentResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Clear previous errors
    setErrorMessage('');
    setSentimentResult(null);

    // 1) Validate feedback text is not empty
    if (!feedback.trim()) {
      setErrorMessage('Please provide your feedback.');
      return;
    }

    // 2) Prepare payload
    const payload = {
      feedback: feedback.trim(),
      rating,
      category: category.trim(),
    };

    setLoading(true);

    try {
      // 3) Send to Flask (using 127.0.0.1 to force IPv4)
      const res = await fetch('http://127.0.0.1:5000/api/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 400) {
        // If backend returned 400 because feedback was missing
        const errJson = await res.json();
        setErrorMessage(errJson.error || 'Invalid request.');
        setLoading(false);
        return;
      }

      if (!res.ok) {
        console.error('Server returned status:', res.status);
        setErrorMessage('Server error. Please try again later.');
        setLoading(false);
        return;
      }

      // 4) Parse JSON response: { score, label, rating, category }
      const result = await res.json();
      setSentimentResult(result);

      // 5) Show a temporary "success" banner
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 3000);

      // 6) Clear form fields
      setFeedback('');
      setRating(0);
      setCategory('');
    } catch (err) {
      console.error('Fetch error:', err);
      setErrorMessage('Could not connect to the sentiment service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="feedback-section" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>User Feedback</h2>

      {/* Category Dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="categorySelect" style={{ fontWeight: 'bold' }}>Category:</label>{' '}
        <select
          id="categorySelect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '0.3rem', minWidth: '150px' }}
        >
          <option value="">Select a category</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Compliment">Compliment</option>
        </select>
      </div>

      {/* Rating Stars */}
      <div className="rating" style={{ marginBottom: '1rem' }}>
        <span style={{ fontWeight: 'bold' }}>Rate your experience:{' '}</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? 'filled' : ''}`}
            onClick={() => setRating(star)}
            style={{
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: rating >= star ? '#FFD700' : '#CCC',
              marginRight: '0.25rem',
            }}
            aria-label={`${star} star rating`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' ? setRating(star) : null)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Feedback Textarea */}
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your feedback..."
        rows={4}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #CCC',
          resize: 'vertical',
        }}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Submitting…' : 'Submit Feedback'}
      </button>

      {/* Error Message */}
      {errorMessage && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px',
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Success Banner */}
      {showSuccessBanner && !errorMessage && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '4px',
          }}
        >
          Feedback submitted successfully!
        </div>
      )}

      {/* Sentiment Result (in-page) */}
      {sentimentResult && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f1f1f1',
            borderRadius: '4px',
          }}
        >
          <h3>Sentiment Analysis Result</h3>
          <p>
            <strong>Label:</strong>{' '}
            <span
              style={{
                color:
                  sentimentResult.label === 'Positive'
                    ? 'green'
                    : sentimentResult.label === 'Negative'
                    ? 'red'
                    : 'gray',
              }}
            >
              {sentimentResult.label}
            </span>
          </p>
          <p>
            <strong>Score:</strong> {sentimentResult.score.toFixed(2)}
          </p>
          <p>
            <strong>Category:</strong> {sentimentResult.category || '—'}
          </p>
          <p>
            <strong>Rating:</strong> {sentimentResult.rating || '—'}{' '}
            {sentimentResult.rating
              ? Array(sentimentResult.rating)
                  .fill('★')
                  .join('') +
                Array(5 - sentimentResult.rating)
                  .fill('☆')
                  .join('')
              : ''}
          </p>
        </div>
      )}
    </section>
  );
};

export default UserFeedback;
