const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");

// Create Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database("chatbot.db");

// Create chats table if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS chats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_message TEXT,
        bot_reply TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Load CSV datasets
let diseaseSymptoms = [];
let diseaseDescriptions = [];
let symptomSeverity = [];

// Helper function to load CSV
function loadCSV(filePath, callback) {
    const data = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => data.push(row))
        .on("end", () => callback(data));
}

// Load disease-symptom mapping
loadCSV("./dataset/disease_symptom.csv", (data) => {
    diseaseSymptoms = data.map(row => {
        const symptoms = Object.keys(row)
            .filter(key => key.startsWith("Symptom") && row[key])
            .map(key => row[key].trim().toLowerCase());
        return {
            disease: row.Disease.trim(),
            symptoms
        };
    });
    console.log("Loaded disease_symptom.csv");
});

// Load disease descriptions
loadCSV("./dataset/disease_description.csv", (data) => {
    diseaseDescriptions = data.map(row => ({
        disease: row.Disease.trim(),
        description: row.Description ? row.Description.trim() : ""
    }));
    console.log("Loaded disease_description.csv");
});

// Load symptom severity
loadCSV("./dataset/symptom_severity.csv", (data) => {
    symptomSeverity = data.map(row => ({
        symptom: row.Symptom ? row.Symptom.trim().toLowerCase() : "",
        severity: row.Severity ? row.Severity.trim().toLowerCase() : ""
    }));
    console.log("Loaded symptom_severity.csv");
});

// Chat endpoint
app.post("/chat", (req, res) => {
    if(!req.body.message) return res.json({ reply: "Please provide a message." });

    const userMessage = req.body.message.toLowerCase();
    let matchedDiseases = [];
    let warning = "";

    // Match symptoms with diseases
    diseaseSymptoms.forEach(entry => {
        entry.symptoms.forEach(symptom => {
            if(userMessage.includes(symptom)) {
                matchedDiseases.push(entry.disease);
            }
        });
    });

    // Check for emergency severity
    symptomSeverity.forEach(s => {
        if(userMessage.includes(s.symptom) && s.severity === "emergency") {
            warning = "⚠️ Emergency detected! ";
        }
    });

    let botReply = "";
    if(matchedDiseases.length > 0) {
        const disease = matchedDiseases[0]; // take first matched disease
        const description = diseaseDescriptions.find(d => d.disease === disease)?.description || "";
        botReply = `${warning}You might be experiencing ${disease}. ${description}`;
    } else {
        botReply = "Sorry, I couldn't identify the disease based on the symptoms provided.";
    }

    // Save chat to DB
    db.run("INSERT INTO chats (user_message, bot_reply) VALUES (?, ?)", [req.body.message, botReply]);

    res.json({ reply: botReply });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
