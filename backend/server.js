import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// API Route for visual generation (VisualAid)
app.post("/api/generate-visual", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-multimodal" });

    const result = await model.generateContent({
      prompt: [
        {
          type: "text",
          text: `Create a simple diagram, chart, or visual explanation for the topic: "${prompt}". Prefer ASCII art, flowchart, or easy-to-draw visual.`
        }
      ],
      temperature: 0.5,
      maxOutputTokens: 500
    });

    const text = result.response.text();
    if (!text) {
      return res.json({ text: "⚠️ No visual explanation generated." });
    }

    res.json({ text: text.trim() });
  } catch (error) {
    console.error("Visual Generation Error:", error.message);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});




// ✅ API Route for text generation (AskQuestion)
app.post("/api/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const finalText = text ? text.trim() : "⚠️ No response from Gemini";

    res.json({ text: finalText });
  } catch (error) {
    console.error("Text Generation Error:", error.message);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

// ✅ API Route for visual generation (VisualAid)
app.post("/api/generate-visual", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-image" });
    const result = await model.generateImage(prompt);
    // Assuming generateImage returns a URL or base64
    const imageUrl = result.response.imageUrl || result.response.base64;

    res.json({ image: imageUrl });
  } catch (error) {
    console.error("Visual Generation Error:", error.message);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
