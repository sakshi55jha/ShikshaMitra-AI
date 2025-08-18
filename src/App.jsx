import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";

// Pages
import GenerateContent from "./pages/GenerateContent";
import UploadTextbook from "./pages/UploadTextbook";
import AskQuestion from "./pages/AskQuestion";
import VisualAid from "./pages/VisualAid";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🔹 Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <Router>
      <div className="flex h-screen relative">
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
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="p-6" role="main">
            <Routes>
              {/* Home (Dashboard with cards) */}
              <Route
                path="/"
                element={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card title="Generate Content" description="AI-powered lesson content generation." />
                    <Card title="Upload Textbook" description="Upload and digitize educational material." />
                    <Card title="Ask Question" description="Get instant AI answers to your queries." />
                    <Card title="Visual Aid" description="Generate diagrams & visual learning aids." />
                  </div>
                }
              />

              {/* Other Pages */}
              <Route path="/generate-content" element={<GenerateContent />} />
              <Route path="/upload-textbook" element={<UploadTextbook />} />
              <Route path="/ask-question" element={<AskQuestion />} />
              <Route path="/visual-aid" element={<VisualAid />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
