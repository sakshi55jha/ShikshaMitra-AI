import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, Book, Send, Tag, FlaskConical } from "lucide-react";
import { API_BASE_URL } from "../config";


export default function AskQuestion() {
    //   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

   // Example questions for the UI
  const exampleQuestions = [
    {
      category: "Mathematics",
      question: "How can I explain fractions to 3rd grade students using everyday objects?",
      icon: <Tag size={20} />,
    },
    {
      category: "Science",
      question: "What are some interactive ways to teach the solar system to mixed grade levels?",
      icon: <FlaskConical size={20} />,
    },
  ];

  const generateAnswer = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/generate-text`, {
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

  const handleExampleClick = (question) => {
    setPrompt(question);
    generateAnswer();
  };

  return (
      <div className="flex flex-col space-y-8 p-6 md:p-12">
      {/* Header Section */}
      <div className="flex items-center space-x-4 bg-green-50 p-6 rounded-2xl shadow-md border border-green-200">
        <div className="p-3 bg-white rounded-full shadow-lg">
          <MessageCircle size={24} className="text-green-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 md:text-2xl">AI Teaching Assistant</h1>
          <p className="text-sm text-gray-500">Ask questions and get practical teaching advice</p>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border">
        {/* Question Input */}
        <div className="flex items-center space-x-3 text-lg font-semibold mb-4 text-gray-700">
          <Book size={20} />
          <span>Ask Your Teaching Question</span>
        </div>

        <textarea
          className="w-full h-32 border border-gray-300 rounded-lg p-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          placeholder="Type your question here... For example: 'How can I teach multiplication to different grade levels at the same time?'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Action Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={generateAnswer}
            disabled={loading || !prompt.trim()}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Ask ShikshaMitra</span>
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Answer Display */}
      {answer && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border mt-6">
          <h3 className="text-lg font-semibold mb-2">Response</h3>
          <div className="prose max-w-none">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Example Questions Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Example Questions to Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exampleQuestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleExampleClick(item.question)}
              className="bg-white rounded-2xl shadow-md p-6 border cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  {item.icon}
                </div>
                <span className="font-semibold text-gray-800">{item.category}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.question}
              </p>
            </div>
          ))}
        </div>
        </div>
        </div>
  );
}