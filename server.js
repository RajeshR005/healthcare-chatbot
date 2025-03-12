require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Use the correct API key
const COHERE_API_KEY = process.env.COHERE_API_KEY || "your_new_cohere_api_key";

// ✅ Use a supported model
const COHERE_MODEL = "command-r-plus"; // Change model if needed

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!COHERE_API_KEY) {
        return res.status(500).json({ error: "Missing Cohere API key! Check your .env file." });
    }

    try {
        const response = await axios.post(
            "https://api.cohere.com/v1/generate", // Cohere's text generation API
            {
                model: COHERE_MODEL, 
                prompt: userMessage,
                max_tokens: 150, // Adjust if needed
                temperature: 0.7, // Adjust for randomness
            },
            {
                headers: {
                    "Authorization": `Bearer ${COHERE_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Full API Response:", JSON.stringify(response.data, null, 2)); // Debugging

        let botReply = response.data.generations?.[0]?.text || "I'm not sure how to respond to that.";

        res.json({ reply: botReply });

    } catch (error) {
        console.error("❌ Error fetching AI response:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to get a response from AI." });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
