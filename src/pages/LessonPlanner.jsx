import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { API_BASE_URL } from "../config";



export default function LessonPlanner() {
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // ... (all your existing state variables and functions)
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [topic, setTopic] = useState("");
  const [planType, setPlanType] = useState("Daily Lesson Plan");
  const [classroomType, setClassroomType] = useState("Single Grade Classroom");
  const [loading, setLoading] = useState(false);
  const [lessonPlan, setLessonPlan] = useState(null);

  const generateLessonPlan = async () => {
    setLoading(true);
    setLessonPlan(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/generate-lesson`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, grade, topic, planType, classroomType }),
      });

      const data = await res.json();
      setLessonPlan(data.lessonPlan);
    } catch (err) {
      console.error("Error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Form (now responsive) */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-indigo-700 mb-2 md:text-3xl">
            Lesson Planner
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            AI-powered lesson planning for effective teaching
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject *</label>
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="Enter subject (e.g., Science)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Grades/Class *</label>
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="e.g., Class 3-5, Grade 2"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Topic/Chapter *</label>
              <input
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="e.g., Water Cycle, Fractions, Solar System"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* Plan Type (now responsive) */}
            <div>
              <label className="block text-sm font-medium mb-2">Plan Type *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Daily Lesson Plan", "Weekly Lesson Plan", "Unit Plan"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPlanType(type)}
                    className={`p-3 border rounded-lg text-sm md:text-base ${
                      planType === type
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    } transition duration-200`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Classroom Type (now responsive) */}
            <div>
              <label className="block text-sm font-medium mb-2">Classroom Type *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Single Grade Classroom", "Multi-Grade Classroom", "Mixed Ability Groups"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setClassroomType(type)}
                    className={`p-3 border rounded-lg text-sm md:text-base ${
                      classroomType === type
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    } transition duration-200`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateLessonPlan}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Lesson Plan"}
            </button>
          </div>

          {/* Results */}
          {lessonPlan && (
            <div className="mt-6 bg-indigo-50 p-4 rounded-lg shadow-inner max-h-96 overflow-y-auto">
              <h2 className="text-lg font-bold text-indigo-700 mb-3">📚 Generated Lesson Plan</h2>
              <div className="prose max-w-none">
                <ReactMarkdown>{lessonPlan}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Tips (now responsive) */}
        <div className="space-y-4 mt-6 md:mt-0">
          <div className="bg-blue-50 p-4 rounded-xl shadow">
            <h3 className="font-semibold text-blue-700 mb-2">📘 Effective Planning Tips</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>Start with clear learning objectives</li>
              <li>Include multiple learning styles</li>
              <li>Plan for different ability levels</li>
              <li>Use local examples and resources</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-xl shadow">
            <h3 className="font-semibold text-green-700 mb-2">👩‍🏫 Multi-Grade Strategies</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>Use peer tutoring effectively</li>
              <li>Create learning stations</li>
              <li>Group by ability, not just age</li>
              <li>Assign student helpers/leaders</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}