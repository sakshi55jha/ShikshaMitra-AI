import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { InferenceClient } from "@huggingface/inference";
import axios from "axios";


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const hf = new InferenceClient({ apiKey: process.env.HF_TOKEN });
const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY 
const FREEPIK_BASE_URL = process.env.FREEPIK_BASE_URL;


/* --------------------- ✅ Assessment Generation --------------------- */
app.post("/api/generate-assessment", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const finalText = text ? text.trim() : "⚠️ No response from Gemini";

    res.json({ questions: finalText });
  } catch (error) {
    console.error("Assessment Generation Error:", error.message);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

/* --------------------- ✅ Text Generation --------------------- */
app.post("/api/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

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
app.post("/api/ai-img", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Send request to Freepik Mystic API
    const response = await axios.post(
      FREEPIK_BASE_URL,
      {
        prompt,
        resolution: "2k",
        aspect_ratio: "square_1_1",
        model: "realism",
        creative_detailing: 33,
        engine: "automatic",
        filter_nsfw: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-freepik-api-key": FREEPIK_API_KEY,
        },
      }
    );

    console.log("Freepik API Response:", response.data);

    // Return task_id to frontend
    return res.json({
      task_id: response.data.data.task_id,
      status: response.data.data.status,
    });
  } catch (err) {
    console.error("Error generating visual:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate visual" });
  }
});

// Route to check task status
app.get("/api/check-status/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    const response = await axios.get(
      `${FREEPIK_BASE_URL}/${taskId}`,
      {
        headers: {
          "x-freepik-api-key": FREEPIK_API_KEY,
        },
      }
    );

    console.log("Status Response:", response.data);

    return res.json(response.data.data);
  } catch (err) {
    console.error("Error checking status:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to check status" });
  }
});

app.post("/api/visual-aid", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // Pick model here
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Create a simple, clear ASCII diagram or flowchart to explain: ${topic}.
      Keep it beginner-friendly and structured.
      Use only plain text characters like -> | -- [] () etc.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ diagram: text });
  } catch (error) {
    console.error("Error generating diagram:", error);
    res.status(500).json({ error: "Failed to generate diagram" });
  }
});

app.post("/api/generate-lesson", async (req, res) => {
  try {
    const { subject, grade, topic } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Create a detailed lesson plan for:
      - Subject: ${subject}
      - Grade: ${grade}
      - Topic: ${topic}

      Include objectives, teaching methods, activities, and outcomes.
    `;

    const result = await model.generateContent(prompt);
    const lessonPlan = result.response.text();

    res.json({ success: true, lessonPlan });
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/* --------------------- ✅ Start Server --------------------- */
app.listen(5000, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
                                                                                                                                                                                                                              