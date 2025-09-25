import { useState } from "react";
import { PenTool, Brain, ImageIcon as ImageIconLucide, Download } from "lucide-react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export default function ImgGenerate() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const generateVisual = async () => {
    setLoading(true);
    setImage(null);
    setError("");

    try {
      // Step 1: Request image generation
      const startRes = await fetch(`${API_BASE_URL}/api/ai-img`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const startData = await startRes.json();
      const taskId = startData.task_id;

      // Step 2: Poll for completion
      let status = "IN_PROGRESS";
      let result = null;

      while (status === "IN_PROGRESS") {
        await new Promise((r) => setTimeout(r, 5000)); // wait 5 sec

        const checkRes = await fetch(
          `${API_BASE_URL}/api/check-status/${taskId}`
        );
        const checkData = await checkRes.json();

        status = checkData.status;
        result = checkData.generated;
      }

      if (status === "COMPLETED" && result?.length > 0) {
        setImage(result[0]);
      } else {
        setError("Image generation failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error generating visual. Please check your connection or server.");
    } finally {
      setLoading(false);
    }
  };

  // The NEW and IMPROVED function to handle image download
  const handleDownload = async () => {
    if (image) {
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = 'generated_image.png'; // Suggested filename
        document.body.appendChild(link);
        link.click();
        
        // Clean up: remove the temporary link and revoke the URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Failed to download image:", err);
        setError("Could not download the image. Please try again.");
      }
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
          <h1 className="text-xl font-bold text-gray-800">AI Image Generator</h1>
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
          placeholder="Enter a topic (e.g., A diagram of the water cycle, a chart explaining photosynthesis)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Action Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={generateVisual}
            disabled={loading}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-purple-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span>Generating...</span>
                <span className="animate-pulse">...</span>
              </>
            ) : (
              <>
                <span>Generate Visual</span>
                <ImageIconLucide size={16} />
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

      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border flex justify-center items-center mt-6">
          <div className="text-gray-500 text-lg">Generating image...</div>
        </div>
      )}

      {image && !loading && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Visual</h3>
          <div className="flex flex-col items-center">
            <img src={image} alt="Generated Visual Aid" className="max-w-full h-auto rounded-lg shadow-md mb-4" />
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
            >
              <Download size={16} />
              <span>Download Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}