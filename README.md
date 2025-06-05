# 🌟 Community Accessibility Toolkit

Hello there! Welcome to the Community Accessibility Toolkit—your one-stop solution for building a more inclusive web. Whether you’re a developer, designer, or simply passionate about accessibility, this toolkit is crafted with you in mind.

**My goal?** To empower you with the resources and tools you need to ensure everyone can enjoy a seamless digital experience.

![Overview of the tool](https://github.com/user-attachments/assets/b68a5722-7726-4753-9529-a0e2e93284bb)

---



## ⚙️ Getting Started

### Prerequisites

- Node.js (v14 or higher)  
- npm or yarn  
- Python 3.8+  
- `virtualenv` (optional but recommended)

---

## 🔧 Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Initialize TextBlob corpora (only once):
```bash
python -m textblob.download_corpora
```
### Run the Flask server:
```bash
export FLASK_APP=app.py
export FLASK_ENV=development
python app.py
```
#### Expected output:
```nginx
Serving Flask app "app.py"
Environment: development
Debug mode: on
Running on http://127.0.0.1:5000/
```
### Optional: Test with cURL
```bash
curl -X POST http://127.0.0.1:5000/api/sentiment \
  -H "Content-Type: application/json" \
  -d '{"feedback":"Love the new features","rating":5,"category":"Compliment"}'
```
#### Expected response:
```json
{
  "score": 0.35,
  "label": "Positive",
  "rating": 5,
  "category": "Compliment"
}
```

---
## 🎨 Frontend Setup
```bash
cd ../frontend
npm install
npm install recharts
```
### Start the React dev server:
```bash
npm start
```
Default URL: http://localhost:3000
Ensure Flask is running on http://127.0.0.1:5000 so the sentiment endpoint works.









---

## 🧰 What’s Inside?

### 🎨 Contrast Color Analyzer  
Ever struggled with color choices? Our Contrast Color Analyzer is here to rescue you! Play around with different color combinations to find the perfect balance that’s not only beautiful but accessible. Simply input your colors and let the tool do the magic, helping you create designs that everyone can see and appreciate.

### 🔤 Font Size Adjuster  
Finding the right font size can feel like a quest. With our Font Size Adjuster, you can easily experiment with sizes for headings, text, and subheadings. This feature helps you discover what makes content easy to read and inviting for all your users.

### ⌨️ Keyboard Navigator  
Navigating a website shouldn’t be a maze! Our Keyboard Navigator is your friendly guide, teaching you how to move through web elements using just your keyboard. This is a game changer for anyone who finds traditional mouse navigation challenging. Let’s make your site accessible to everyone!

### ✅ My Checklist  
Stay on top of your accessibility game with My Checklist. This handy feature allows you to keep track of what you’ve accomplished and what’s still on your to-do list. It’s like having a personal assistant dedicated to ensuring your projects shine with accessibility!

### 📚 Resource Library  
Knowledge is power! Dive into our Resource Library, brimming with articles, guides, and best practices tailored to your interests. No matter your level of expertise, you’ll find valuable insights that can elevate your understanding of web accessibility.


<img width="200" alt="Screenshot 2025-06-05 at 14 23 37" src="https://github.com/user-attachments/assets/15299cf8-f06f-4b67-b05d-e44d52bbb20c" />

### 🎥 Video Tutorials  
Learning is always more fun with visuals! Our collection of YouTube video tutorials covers everything you need to know about web accessibility. Sit back, relax, and let experts guide you through best practices and innovative techniques.

### 💡 Curiosity Corner  
Feed your curiosity with fascinating facts and insights about accessibility in our Curiosity Corner. Discover why inclusive design matters and how it impacts real lives. You’ll be amazed at what you learn!

### 🗣️ User Feedback  
We’re all ears! Your thoughts and experiences are vital to us. The User Feedback feature allows you to share what you love and what could be better. Each submission is analyzed for sentiment (Positive / Neutral / Negative) on the backend using TextBlob, and displayed immediately on the form for instant feedback.

### 📊 Admin Dashboard  
**Only for admins:** View every feedback submission in a comprehensive table that includes timestamp, feedback text, category, rating, sentiment label, and sentiment score. Filter by category or sentiment, page through results, view summary cards, and even export all feedback as CSV. This helps administrators see trends at a glance and dive deep into user insights.

### 🌗 Dark Mode Toggle  
Your comfort matters! A Dark Mode option is built into the sidebar (click the moon icon) so you can switch themes without leaving the page.

### 🌍 Multilingual Accessibility  
We believe accessibility knows no borders. That’s why our toolkit is available in multiple languages, including English, Spanish, Swahili, and Sheng. Everyone deserves access to information in a language they understand and feel comfortable with.

---

## 🧪 Using the Toolkit

Open your browser to [http://localhost:3000](http://localhost:3000)

### Navigate through the sidebar to access tools like:

- Contrast Color Analyzer  
- Font Size Adjuster  
- Keyboard Navigator  
- Checklist  
- Resource Library  
- Video Tutorials  
- Curiosity Corner  
- User Feedback  
- Admin Dashboard  

---

### 📝 Submitting Feedback

1. Enter a category, rating, and your feedback text.
2. Click **Submit Feedback**.
3. Sentiment label and score will appear instantly.

---

### 🛠️ Admin Features

- View all feedback submissions.
- Filter by category or sentiment.
- Navigate paginated results.
- View summary cards and bar charts.
- Export feedback as CSV.
