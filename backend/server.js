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

app.post("/api/generate-visual", async (req, res) => {           // <-- New endpoint
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Use multimodal Gemini model for text + image
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-multimodal" });  // <-- Changed to multimodal

    const result = await model.generateContent({
      prompt: `Create a simple visual explanation (diagram, chart, or illustration) for this topic: "${prompt}". Make it very easy to understand for students. You can include ASCII diagrams if images are not available.`, // <-- New detailed prompt for visuals
      modalities: ["text", "image"],  // <-- Request both text + image
    });

    // Extract text and image from Gemini response
    const text = result.response.text();                                   // <-- Get textual explanation
    const imageUrl = result.response.image?.[0]?.url || null;              // <-- Get image if available

    // Send both text and image back to frontend
    res.json({
      text: text ? text.trim() : "⚠️ No visual explanation generated.",
      imageUrl,     // <-- Added imageUrl
    });
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
