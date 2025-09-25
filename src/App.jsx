import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";  

// Pages
import AskQuestion from "./pages/AskQuestion";
import AssessmentPage from "./pages/Assessment";
import ImgGenerate from "./pages/ImgGenerate";
import LessonPlanner from "./pages/LessonPlanner";
import VisualAid from "./pages/VisualAid";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <Router>
  {/* The custom CSS below is for styling the scrollbars.
        It targets Webkit browsers (Chrome, Safari) and Firefox.
  */}
      <style>
        {`
        /* For Webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9; /* slate-100 */
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #cbd5e1; /* slate-300 */
          border-radius: 10px;
          border: 2px solid #f1f5f9;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8; /* slate-400 */
        }
        
        /* For Firefox */
        html {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        `}
      </style>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Overlay (only mobile when sidebar is open) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            role="button"
            aria-label="Close Sidebar Overlay"
            tabIndex={0}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* 🔹 Navbar for mobile screens */}
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="px-6 pt-0 flex-grow md:pl-64 transition-all duration-300 h-screen overflow-y-auto pt-16 md:pt-0" role="main">
            <Routes>
                <Route path="/login" element={<Login />} />

              {/* Home (Dashboard with cards) */}
              <Route
              path="/"
              element={
      <div className="p-6 space-y-8 flex-grow">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-50 to-orange-50 p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-green-600">Shiksha</span>
          <span className="text-orange-600">Mitra</span>
        </h1>
        <p className="text-gray-600">
          Your AI-powered teaching companion for multi-grade classrooms
        </p>

        <div className="mt-4 bg-green-100 border border-green-300 rounded-lg p-4">
          <h2 className="font-semibold text-lg text-green-700">
            Empowering Teachers, Enhancing Learning
          </h2>
          <p className="text-gray-700">
            ShikshaMitra is designed to support teachers in under-resourced,
            multi-grade classrooms. Use AI to create localized content,
            generate visual aids, and design personalized learning experiences
            that engage every student.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-green-600 font-bold text-lg">Unlimited</p>
            <p className="text-gray-600 text-sm">Students Supported</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-blue-600 font-bold text-lg">2+ hrs</p>
            <p className="text-gray-600 text-sm">Time Saved Daily</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-purple-600 font-bold text-lg">Higher</p>
            <p className="text-gray-600 text-sm">Learning Impact</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Access Teaching Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Assistant */}
          <Card
            title="AI Assistant"
            description="Ask questions and get simple explanations for any topic"
            path="/ask-question"
            color="bg-blue-600 hover:bg-blue-700"
          />

          {/* Visual Aid Generator */}
          <Card
            title="Visual Aid Generator"
            description="Create diagrams, charts and illustrations instantly"
            path="/visual-aid"
            color="bg-purple-600 hover:bg-purple-700"
          />

              {/* Worksheet Generator */}
          <Card
            title="Worksheet Generator"
            description="Create differentiated worksheets for multiple grades"
            path="/Generate-Assesment"
            color="bg-orange-600 hover:bg-orange-700"
          />
          {/* Content Creator */}
          <Card
            title="AI Img Generator"
            description="Generate Concepts High-Quality images with AI"
            path="/ai-img"
            color="bg-green-600 hover:bg-green-700"
          />

      
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="bg-green-50 p-6 rounded-lg border">
        <h2 className="font-bold text-lg mb-2">🌟 Getting Started with ShikshaMitra</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-1">For New Users:</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Start with the AI Assistant to ask quick questions</li>
              <li>Generate visual aids to support your lessons</li>
              <li>Create content in your local language</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Advanced Features:</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Generate differentiated worksheets for multiple grades</li>
              <li>Plan weekly lessons with AI assistance</li>
              <li>All tools work on mobile devices</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
  }
/>

              {/* Other Pages */}
             
              <Route path="/visual-aid" element={ <PrivateRoute><VisualAid /> </PrivateRoute>} />
              <Route path="/lesson-planner" element={<PrivateRoute><LessonPlanner /> </PrivateRoute> } />
              <Route path="/ask-question" element={<PrivateRoute><AskQuestion /> </PrivateRoute>} />
              <Route path="/ai-img" element={<PrivateRoute><ImgGenerate /> </PrivateRoute>} />
              <Route path="/Generate-Assesment" element={<PrivateRoute><AssessmentPage /> </PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
