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
        const MODEL_NAME = "models/gemini-1.5-pro"; // Updated to correct model name

const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
    { 
        contents: [{ parts: [{ text: userMessage }] }] 
    }
);


        console.log("Full API Response:", JSON.stringify(response.data, null, 2));  // Debugging

        // **Fix: Correctly parse AI response**
        let botReply = "I'm not sure how to respond to that.";
        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            botReply = response.data.candidates[0].content.parts[0].text;
        }

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

