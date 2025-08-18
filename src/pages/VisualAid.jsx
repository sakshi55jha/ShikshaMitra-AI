import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function VisualAid() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.text) {
        setResult(data.text.trim()); // keep Markdown as is
      } else {
        setResult("⚠️ No response from server");
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">AI Visual Aid (Gemini)</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your question or topic..."
        className="border p-2 w-full my-2"
      />

      <button
        onClick={generate}
        disabled={loading || !prompt.trim()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
