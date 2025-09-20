Digital Triage Chatbot
🌍 Problem

Many people in rural or underserved areas struggle to access doctors. Sometimes they end up in emergency rooms for conditions that could be handled at home or a local clinic.

Our chatbot helps people:

Describe their symptoms in simple words.

Understand how urgent their situation is.

Get guidance on what to do next (self-care, visit clinic, or call emergency services).

Let doctors review chatbot recommendations if needed.

🎯 Goals

Collect symptoms in natural language (typed or spoken).

Assess urgency: mild, moderate, severe, emergency.

Provide safe and easy-to-follow guidance.

Make it available on web or messaging apps like WhatsApp/SMS.

Simple dashboard for doctors to review conversations.

💡 How It Works

User enters symptoms
Example: “I have chest pain and trouble breathing.”

Chatbot analyzes symptoms

Keyword-based detection (like chest pain → emergency).

Rule-based logic ensures safety (always escalate serious cases).

Chatbot gives guidance

Mild: “Rest, drink water, monitor symptoms.”

Moderate: “Consult a clinic or telemedicine within 24 hours.”

Emergency: “Call emergency services immediately (108/911).”

Clinician review

Doctors can see logs and triage decisions on a simple dashboard.

🛠 Tech Stack

Backend: Node.js (Express.js)

Frontend: HTML, CSS, JavaScript

Database: SQLite (stores conversations & triage logs)

Logic: Rule-based symptom analysis + basic local AI/NLP

UI: Simple web dashboard for doctors

Access: Web app or SMS/WhatsApp

No external APIs are used—everything works locally.

🚀 Sample Cases

Mild: “I have a mild headache.” → “Rest, drink water, monitor symptoms.”

Moderate: “Fever for 3 days and sore throat.” → “Consult a clinic/telemedicine within 24 hours.”

Emergency: “Severe chest pain and difficulty breathing.” → “Call emergency services immediately.”

Child in distress: “My child has high fever and cough.” → “Seek emergency pediatric care immediately.”

⚡ How to Run
# Clone the repo
git clone https://github.com/deepika0602/triagechatbot.git
cd triagechatbot/backend

# Install dependencies
npm install

# Start the server
node server.js


Open frontend/index.html in your browser to use the chatbot.

📌 Impact

Safe and easy first-level guidance for users.

Works on low bandwidth and basic devices.

Helps doctors review triage decisions quickly.

Can be expanded to multiple languages or offline use.
