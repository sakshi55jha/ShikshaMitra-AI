export default function Card({ title, description }) {
  return (
    <div 
      className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer"
      role="article" // ⭐ Semantic role
      tabIndex={0}   // ⭐ Keyboard accessibility
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
