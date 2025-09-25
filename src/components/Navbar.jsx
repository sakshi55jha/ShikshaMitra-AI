import { Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-20 p-4 md:hidden">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-200"
          aria-label="Open sidebar menu"
        >
          <Menu size={24} />
        </button>

        {/* Brand logo and name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-200 flex items-center justify-center">
            <span className="text-sm">🎓</span>
          </div>
          <div>
            <h2 className="text-lg font-bold">शि‍क्षा मि‍त्रा</h2>
            <p className="text-xs text-gray-500">AI Teaching Assistant</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
