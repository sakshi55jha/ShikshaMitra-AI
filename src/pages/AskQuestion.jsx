import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function AskQuestion() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:5000/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.text) {
        setAnswer(data.text.trim()); // keep Markdown formatting
      } else {
        setAnswer("⚠️ No response from server");
      }
    } catch (err) {
      console.error(err);
      setAnswer("❌ Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>

      <textarea
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        placeholder="Type your question here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateAnswer}
        disabled={loading || !prompt.trim()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Generating..." : "Ask"}
      </button>

      {answer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border">
          <strong>Answer:</strong>
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
