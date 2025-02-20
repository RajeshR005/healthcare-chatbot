require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: "Missing API key! Check your .env file." });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            { 
                contents: [{ parts: [{ text: userMessage }] }] 
            }
        );

        console.log("Full API Response:", response.data);  // Debugging

        const botReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that request.";
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Error fetching AI response:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to get a response from AI." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get("/", (req, res) => {
    res.send("Welcome to the Healthcare Chatbot API!");
});

