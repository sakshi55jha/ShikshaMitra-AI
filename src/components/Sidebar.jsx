import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`fixed md:static top-0 left-0 h-screen w-64 bg-white p-5 shadow-lg border-r transform transition-transform duration-300 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-40`}
    >
      {/* Close button only for small screens */}
      <div className="flex justify-between items-center md:hidden">
        <h2 className="text-xl font-bold text-blue-700"> 📘 ShikshaMitra</h2>
        <button
          className="text-2xl text-gray-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          ✕
        </button>
      </div>

      {/* Navigation items */}
      <ul className="space-y-4 mt-12 md:mt-0">
        <li className="font-bold text-lg text-blue-700">Dashboard</li>
        {[
          { name: "Generate Content", path: "/generate-content" },
          { name: "Upload Textbook", path: "/upload-textbook" },
          { name: "Ask Question", path: "/ask-question" },
          { name: "Visual Aid", path: "/visual-aid" },
        ].map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block p-2 rounded-md transition duration-300 cursor-pointer 
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`
              }
              onClick={toggleSidebar} // 🔹 auto close on mobile
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
