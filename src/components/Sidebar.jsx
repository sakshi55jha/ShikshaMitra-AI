import { NavLink } from "react-router-dom";
import { auth } from "../firebase"; // adjust the path if needed
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Palette,
  LayoutDashboard,
  FileText,
  Book,
} from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const user = useAuthState(auth)[0];
  const sidebarItems = [
    {
      section: "TEACHING TOOLS",
      items: [
        {
          name: "Dashboard",
          path: "/",
          icon: <LayoutDashboard size={20} />,
          subtext: "Overview & Quick Tools",
        },
        {
          name: "AI Assistant",
          path: "/ask-question",
          icon: <Sparkles size={20} />,
          subtext: "Ask Questions & Get",
        },
        {
          name: "Visual Aid Generator",
          path: "/visual-aid",
          icon: <Palette size={20} />,
          subtext: "Create Diagrams & Charts",
        },
        {
          name: "Worksheet Generator",
          path: "/Generate-Assesment",
          icon: <FileText size={20} />,
          subtext: "Multi-Grade Worksheets",
        },
        {
          name: "Ai Img Generator",
          path: "/ai-img",
          icon: <FileText size={20} />,
          subtext: "Generate Concepts High-Quality AI images",
        },
        {
          name: "Lesson Planner",
          path: "/lesson-planner",
          icon: <Book size={20} />,
          subtext: "AI-Powered Lesson Plans",
        },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 h-screen w-64 bg-white p-4 shadow-xl border-r transform transition-transform duration-300 flex flex-col
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40`}
    >
      {/* Brand logo and name section */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-lg bg-green-200 flex items-center justify-center">
          <span className="text-xl">🎓</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">शि‍क्षा मि‍त्रा</h2>
          <p className="text-xs text-gray-500">AI Teaching Assistant</p>
        </div>
      </div>
      

      <div className="overflow-y-auto pr-2">
        <ul className="space-y-4">
          {sidebarItems.map((section, sectionIndex) => (
            <li key={sectionIndex}>
              <h3 className="text-gray-400 font-bold text-sm mb-2 tracking-widest">
                {section.section}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-start p-3 rounded-xl transition duration-300 cursor-pointer 
                        ${
                          isActive
                            ? "bg-green-100 text-green-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-800"
                        }`
                      }
                      onClick={toggleSidebar}
                    >
                      <span className="mr-3 mt-1 flex-shrink-0">{item.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500 mt-0.5">
                          {item.subtext}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      
      {/* User Profile section */}
   
<div className="mt-8 flex-shrink-0">
  <div className="flex flex-col items-center p-4">
    {user ? (
      <>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 text-xl">
          {user.displayName ? user.displayName.charAt(0) : user.email.charAt(0)}
        </div>
        <h5 className="mt-2 font-semibold text-gray-800">
          Welcome, {user.displayName || user.email}!
        </h5>
        <button
          onClick={() => signOut(auth)}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </>
    ) : (
      <>
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-xl">
          ?
        </div>
        <h5 className="mt-2 font-semibold text-gray-800">Not signed in</h5>
        <Link
          to="/login"
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Login / Signup
        </Link>
      </>
    )}
  </div>
</div>

    </aside>
  );
}
