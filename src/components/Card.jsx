import { Link } from "react-router-dom";


export default function Card({ title, description, path, color   }) {
  return (
    <div 
      className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer"
      role="article"
      tabIndex={0}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Explore Feature Button */}
      <Link 
        to={path}
        className={`inline-block ${color} text-white px-4 py-2 rounded-lg transition duration-300`}
      >
        Explore Feature
      </Link>
    </div>
  );
}
