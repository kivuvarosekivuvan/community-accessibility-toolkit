# # backend/app.py

# import json
# from flask import Flask, request, make_response
# from flask_cors import CORS
# from textblob import TextBlob

# app = Flask(__name__)
# CORS(app)  # Allow React (127.0.0.1:3000) to call this API

# @app.route("/api/sentiment", methods=["POST"])
# def sentiment():
#     """
#     Expects JSON payload: { feedback: string, rating: number, category: string }
#     Returns JSON (in fixed key-order): { score, label, rating, category }.
#     """
#     data = request.get_json() or {}
#     text = data.get("feedback", "").strip()
#     rating = data.get("rating", None)
#     category = data.get("category", "").strip()

#     # If no feedback text was provided, return 400 Bad Request
#     if not text:
#         error_payload = {"error": "Feedback text is required"}
#         resp = make_response(json.dumps(error_payload), 400)
#         resp.headers["Content-Type"] = "application/json"
#         return resp

#     # Run TextBlob sentiment analysis
#     blob = TextBlob(text)
#     score = blob.sentiment.polarity  # float in [-1.0, 1.0]
#     if score > 0:
#         label = "Positive"
#     elif score < 0:
#         label = "Negative"
#     else:
#         label = "Neutral"

#     # Build an Ordered dict (Python 3.7+ preserves insertion order)
#     ordered_response = {
#         "score": score,
#         "label": label,
#         "rating": rating,
#         "category": category
#     }

#     # Use make_response + json.dumps to ensure key order is preserved
#     resp = make_response(json.dumps(ordered_response, separators=(",", ":")), 200)
#     resp.headers["Content-Type"] = "application/json"
#     return resp

# if __name__ == "__main__":
#     # Bind only to IPv4 127.0.0.1:5000 (to avoid macOS IPv6/AirTunes conflicts)
#     app.run(debug=True, host="127.0.0.1", port=5000)



# backend/app.py

import json
from datetime import datetime
from flask import Flask, request, make_response
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # Allow React (127.0.0.1:3000) to call this API

# In‐memory store for all feedback submissions
# Each entry will be a dict containing:
# { id, timestamp, feedback, rating, category, score, label }
feedback_store = []

@app.route("/api/sentiment", methods=["POST"])
def sentiment():
    """
    Expects JSON payload: { feedback: string, rating: number, category: string }
    Returns JSON (in fixed key-order): { score, label, rating, category }.
    Also appends the full record (including feedback text+timestamp) to feedback_store.
    """
    data = request.get_json() or {}
    text = data.get("feedback", "").strip()
    rating = data.get("rating", None)
    category = data.get("category", "").strip()

    # If no feedback text, return 400
    if not text:
        error_payload = {"error": "Feedback text is required"}
        resp = make_response(json.dumps(error_payload), 400)
        resp.headers["Content-Type"] = "application/json"
        return resp

    # Compute sentiment via TextBlob
    blob = TextBlob(text)
    score = blob.sentiment.polarity  # float in [-1.0,1.0]
    if score > 0:
        label = "Positive"
    elif score < 0:
        label = "Negative"
    else:
        label = "Neutral"

    # Build the ordered response payload:
    ordered_response = {
        "score": score,
        "label": label,
        "rating": rating,
        "category": category
    }

    # Add a full record (including feedback text and timestamp) to feedback_store
    entry = {
        # Auto‐increment ID based on length
        "id": len(feedback_store) + 1,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "feedback": text,
        "rating": rating,
        "category": category,
        "score": score,
        "label": label,
    }
    feedback_store.append(entry)

    # Return only the sentiment summary to the calling client
    resp = make_response(json.dumps(ordered_response, separators=(",", ":")), 200)
    resp.headers["Content-Type"] = "application/json"
    return resp

@app.route("/api/feedbacks", methods=["GET"])
def get_all_feedbacks():
    """
    Returns the entire feedback_store (list of all submissions),
    sorted by newest first.
    """
    # Return the list in reverse order (newest first)
    sorted_list = list(reversed(feedback_store))
    resp = make_response(json.dumps(sorted_list), 200)
    resp.headers["Content-Type"] = "application/json"
    return resp

if __name__ == "__main__":
    # Bind to IPv4 127.0.0.1:5000
    app.run(debug=True, host="127.0.0.1", port=5000)
