import { useState } from "react";

export default function VisualAid() {
  const [prompt, setPrompt] = useState("");
  const [imageResult, setImageResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateVisual = async () => {
    setLoading(true);
    setImageResult("");

    try {
      const res = await fetch("http://localhost:5000/api/generate-visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.imageUrl) setImageResult(data.imageUrl);
      else setImageResult("⚠️ No visual generated.");
    } catch (err) {
      console.error(err);
      setImageResult("❌ Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Visual Aid</h2>

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

      {imageResult && (
        <div className="mt-4">
          {imageResult.startsWith("data:image") ? (
            <img
              src={imageResult}
              alt="Generated Visual"
              className="border rounded shadow-md max-w-full"
            />
          ) : (
            <p>{imageResult}</p>
          )}
        </div>
      )}
    </div>
  );
}
