export default function Navbar({ toggleSidebar }) {
  return (
    <nav 
      className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center shadow-md"
      role="navigation" // ⭐ Accessibility
      aria-label="Main Navigation"
    >
      {/* Logo + Hamburger */}
      <div className="flex items-center gap-4">
        {/* Hamburger for small screens */}
        <button
          className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded" // ⭐ Focus ring for accessibility
          onClick={toggleSidebar}
          aria-label="Open Sidebar" // ⭐ Screen readers
        >
          ☰
        </button>
        <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
          📘 ShikshaMitra
        </h1>
      </div>

      {/* Logout */}
      <div>
        <button 
          className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          aria-label="Logout" // ⭐ Accessibility
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
