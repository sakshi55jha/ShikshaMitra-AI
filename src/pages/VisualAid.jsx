import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function VisualAid() {
  const [prompt, setPrompt] = useState("");
  const [textResult, setTextResult] = useState("");
  const [imageResult, setImageResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVisual = async () => {
    setLoading(true);
    setTextResult("");
    setImageResult("");

    try {
      const res = await fetch("http://localhost:5000/api/generate-visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.text) setTextResult(data.text);
      if (data.imageUrl) setImageResult(data.imageUrl);
      if (!data.text && !data.imageUrl) setTextResult("⚠️ No visual explanation generated.");
    } catch (err) {
      console.error(err);
      setTextResult("❌ Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Visual Aid (Gemini)</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a topic to generate diagrams/charts..."
        className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />

      <button
        onClick={generateVisual}
        disabled={loading || !prompt.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {/* Display Textual Visual Explanation */}
      {textResult && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <ReactMarkdown>{textResult}</ReactMarkdown>
        </div>
      )}

      {/* Display Image if available */}
      {imageResult && (
        <div className="mt-4">
          <img
            src={imageResult}
            alt="Generated Visual"
            className="border rounded shadow-md max-w-full"
          />
        </div>
      )}
    </div>
  );
}
