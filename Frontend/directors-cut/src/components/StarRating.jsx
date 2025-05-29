import { FaStar } from "react-icons/fa";

export default function StarRating({ rating, setRating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <FaStar
          key={value}
          onClick={() => setRating(value)}
          className={`cursor-pointer text-2xl ${
            value <= rating ? "text-yellow-400" : "text-gray-500"
          }`}
        />
      ))}
    </div>
  );
}