🌟 Community Accessibility Toolkit
Hello there! Welcome to the Community Accessibility Toolkit—your one-stop solution for building a more inclusive web. Whether you’re a developer, designer, or simply passionate about accessibility, this toolkit is crafted with you in mind. My goal? To empower you with the resources and tools you need to ensure everyone can enjoy a seamless digital experience.

![Overview of the tool](Screenshot 2024-11-05 at 08.37.15)

What’s Inside?
🎨 Contrast Color Analyzer
Ever struggled with color choices? Our Contrast Color Analyzer is here to rescue you! Play around with different color combinations to find the perfect balance that’s not only beautiful but accessible. Simply input your colors and let the tool do the magic, helping you create designs that everyone can see and appreciate.

🔤 Font Size Adjuster
Finding the right font size can feel like a quest. With our Font Size Adjuster, you can easily experiment with sizes for headings, text, and subheadings. This feature helps you discover what makes content easy to read and inviting for all your users.

⌨️ Keyboard Navigator
Navigating a website shouldn’t be a maze! Our Keyboard Navigator is your friendly guide, teaching you how to move through web elements using just your keyboard. This is a game changer for anyone who finds traditional mouse navigation challenging. Let’s make your site accessible to everyone!

✅ My Checklist
Stay on top of your accessibility game with My Checklist. This handy feature allows you to keep track of what you’ve accomplished and what’s still on your to-do list. It’s like having a personal assistant dedicated to ensuring your projects shine with accessibility!

📚 Resource Library
Knowledge is power! Dive into our Resource Library, brimming with articles, guides, and best practices tailored to your interests. No matter your level of expertise, you’ll find valuable insights that can elevate your understanding of web accessibility.

🎥 Video Tutorials
Learning is always more fun with visuals! Our collection of YouTube video tutorials covers everything you need to know about web accessibility. Sit back, relax, and let experts guide you through best practices and innovative techniques.

💡 Curiosity Corner
Feed your curiosity with fascinating facts and insights about accessibility in our Curiosity Corner. Discover why inclusive design matters and how it impacts real lives. You’ll be amazed at what you learn!

🗣️ User Feedback
We’re all ears! Your thoughts and experiences are vital to us. The User Feedback feature allows you to share what you love and what could be better. Each submission is analyzed for sentiment (Positive / Neutral / Negative) on the backend using TextBlob, and displayed immediately on the form for instant feedback.

📊 Admin Dashboard
Only for admins: view every feedback submission in a comprehensive table that includes timestamp, feedback text, category, rating, sentiment label, and sentiment score. Filter by category or sentiment, page through results, view summary cards, and even export all feedback as CSV. This helps administrators see trends at a glance and dive deep into user insights.

🌗 Dark Mode Toggle
Your comfort matters! A Dark Mode option is built into the sidebar (click the moon icon) so you can switch themes without leaving the page.

🌍 Multilingual Accessibility
We believe accessibility knows no borders. That’s why our toolkit is available in multiple languages, including English, Spanish, Swahili, and Sheng. Everyone deserves access to information in a language they understand and feel comfortable with.

Getting Started
Prerequisites
Node.js (v14 or higher)

npm or yarn

Python 3.8+

virtualenv (optional but recommended)

1. Clone the repository
bash
git clone https://github.com/kivuvarosekivuvan/community-accessibility-toolkit.git
cd community-accessibility-toolkit

2. Backend Setup
bash
cd backend
python3 -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt

Create requirements.txt with:

Flask
flask-cors
textblob
Initialize TextBlob data (only needed once):

bash
python -m textblob.download_corpora
Run the Flask server:

bash
export FLASK_APP=app.py
export FLASK_ENV=development
python app.py
You should see:

pgsql
* Serving Flask app "app.py"
* Environment: development
* Debug mode: on
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
Test with cURL (optional):

bash
curl -X POST http://127.0.0.1:5000/api/sentiment \
  -H "Content-Type: application/json" \
  -d '{"feedback":"Love the new features","rating":5,"category":"Compliment"}'
Expected response:

json
{"score":0.35,"label":"Positive","rating":5,"category":"Compliment"}


3. Frontend Setup
bash
cd ../frontend
npm install
npm install recharts
Add to .gitignore:


node_modules/
build/
Start the React dev server:

bash
npm start
By default, it runs on http://localhost:3000/. Make sure Flask is running on http://127.0.0.1:5000/ so the sentiment endpoint is reachable.

4. Using the Toolkit
Open your browser to http://localhost:3000/.

Sidebar Navigation: click any tab to switch tools.

Contrast Color, Font Size, Keyboard Navigator, Checklist, Resource Library, Video Tutorials, Curiosity Corner, User Feedback, Discussion Forum, Achievements, Webinars, and Admin.

User Feedback: enter a category, rating, and feedback text, then click Submit Feedback. You’ll see the sentiment label and score instantly.

Admin Page: only for admins. View all feedback submissions, filter by text/category/sentiment, navigate pages, export CSV, and see summary cards + bar chart.
