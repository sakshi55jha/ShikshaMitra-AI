// src/pages/GenerateContent.jsx
import { useState } from "react";

export default function GenerateContent() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const handleGenerate = () => {
    if (!topic.trim()) {
      setContent("⚠️ Please enter a topic first.");
      return;
    }

    // Fake AI content (can later connect to API)
    setContent(`
      📘 Lesson Content for "${topic}":
      
      1. Introduction: A brief overview of ${topic}.
      2. Key Concepts: Main points explained in simple terms.
      3. Examples: Real-life examples of ${topic}.
      4. Summary: Quick recap for students.
    `);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Lesson Content</h2>

      {/* Input box */}
      <input
        type="text"
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter a topic (e.g., Photosynthesis)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={handleGenerate}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Generate
      </button>

      {/* Content Section */}
      {content && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border whitespace-pre-line">
          {content}
        </div>
      )}
    </div>
  );
}
