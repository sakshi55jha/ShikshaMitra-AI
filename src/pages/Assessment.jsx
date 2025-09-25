import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Edit, Send } from "lucide-react";


const AssessmentPage = () => {
  const [prompt, setPrompt] = useState("");
  const [assessment, setAssessment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a topic or prompt");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate an assessment on the topic: ${prompt}. 
          Include:
          1. Fill in the blanks (3 questions),
          2. True/False (3 questions),
          3. MCQs with 4 options (3 questions),
          4. Subjective type (2 questions).`
        }),
      });

      const data = await res.json();
      setAssessment(data.text);
    } catch (error) {
      console.error("Error generating assessment:", error);
      setAssessment("❌ Error generating assessment. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-8 p-6 md:p-12">
      {/* Header Section */}
      <div className="flex items-center space-x-4 bg-orange-50 p-6 rounded-2xl shadow-md border border-orange-200">
        <div className="p-3 bg-white rounded-full shadow-lg">
          <FileText size={24} className="text-orange-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">AI Worksheet Generator</h1>
          <p className="text-sm text-gray-500">Create differentiated assessments for your students</p>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border">
        {/* Topic Input */}
        <div className="flex items-center space-x-3 text-lg font-semibold mb-4 text-gray-700">
          <Edit size={20} />
          <span>Enter Your Topic</span>
        </div>

        <textarea
          className="w-full h-32 border border-gray-300 rounded-lg p-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          rows="3"
          placeholder="Enter a topic (e.g., Photosynthesis, Algebra, World War II)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Action Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-orange-600 hover:to-orange-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span>Generating...</span>
                <span className="animate-pulse">...</span>
              </>
            ) : (
              <>
                <span>Generate Worksheet</span>
                <Send size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Box */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mt-4 border border-red-200">
          <p>{error}</p>
        </div>
      )}

      {assessment && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Assessment</h3>
          <div className="prose max-w-none">
            <ReactMarkdown>{assessment}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;
