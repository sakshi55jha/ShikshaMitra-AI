import React, { useState } from "react";
import { PenTool, Brain, Image as ImageIcon, Download } from "lucide-react";


const VisualAid = () => {
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [topic, setTopic] = useState("");
  const [diagram, setDiagram] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateDiagram = async () => {
    if (!topic) {
      setError("Please enter a topic to generate a diagram.");
      return;
    }
    setLoading(true);
    setError("");
    setDiagram("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/visual-aid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (response.ok) {
        setDiagram(data.diagram);
      } else {
        setError(data.error || "Failed to generate diagram");
      }
    } catch (err) {
      setError("Server error. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (diagram) {
      const blob = new Blob([diagram], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`; // Create a clean filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col space-y-8 p-6 md:p-12">
      {/* Header Section */}
      <div className="flex items-center space-x-4 bg-purple-50 p-6 rounded-2xl shadow-md border border-purple-200">
        <div className="p-3 bg-white rounded-full shadow-lg">
          <PenTool size={24} className="text-purple-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">AI Visual Aid Generator</h1>
          <p className="text-sm text-gray-500">Create diagrams and charts for your lessons</p>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border">
        {/* Topic Input */}
        <div className="flex items-center space-x-3 text-lg font-semibold mb-4 text-gray-700">
          <Brain size={20} />
          <span>Enter Your Topic</span>
        </div>

        <textarea
          className="w-full h-32 border border-gray-300 rounded-lg p-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          rows="3"
          placeholder="Enter a topic (e.g., The Water Cycle, Photosynthesis, or The Human Digestive System)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        {/* Action Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={generateDiagram}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <span>Generating...</span>
                <span className="animate-pulse">...</span>
              </>
            ) : (
              <>
                <span>Generate Diagram</span>
                <ImageIcon size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Answer Display */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mt-4 border border-red-200">
          <p>{error}</p>
        </div>
      )}

      {diagram && (
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg mt-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Visual Aid</h3>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-green-300">
            {diagram}
          </pre>
        </div>
      )}
    </div>
  );
};

export default VisualAid;
