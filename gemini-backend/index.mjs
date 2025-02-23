import express from "express";
import Gemini from "gemini-ai";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Gemini setup
const gemini = new Gemini("AIzaSyDhrgv_yXR1pPrpG4xZmq3wpCFLmVH3tpQ", { fetch });
let geminiChat = gemini.createChat(); // Default chat session

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message, newChat } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Reset chat history if requested
  if (newChat) {
    geminiChat = gemini.createChat(); // Create a new chat instance
  }

  try {
    const result = await geminiChat.ask(message);
    res.json({ response: result });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
