import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ API Route for Text Generation (AskQuestion)
app.post("/api/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large", 
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    );

    const text = response.data[0]?.generated_text || "⚠️ No response generated.";
    res.json({ text });
  } catch (error) {
    console.error("Text Generation Error:", error.message);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

// ✅ API Route for Visual Generation (VisualAid)
app.post("/api/generate-visual", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
      { inputs: prompt },
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` },
        responseType: "arraybuffer",
      }
    );

    const imageBase64 = Buffer.from(response.data, "binary").toString("base64");
    const imageUrl = `data:image/png;base64,${imageBase64}`;

    res.json({ imageUrl });
  } catch (error) {
    console.error("Visual Generation Error:", error.message);
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
