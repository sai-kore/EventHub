import { Calendar, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EventCard({ event }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const eventId = event._id || event.id;

  useEffect(() => {
    if (!eventId) return;
    const favorites = JSON.parse(localStorage.getItem("favoriteEvents") || "[]");
    setIsFavorite(favorites.includes(eventId));
  }, [eventId]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!eventId) return;

    let favorites = JSON.parse(localStorage.getItem("favoriteEvents") || "[]");
    if (favorites.includes(eventId)) {
      favorites = favorites.filter((id) => id !== eventId);
      setIsFavorite(false);
    } else {
      favorites.push(eventId);
      setIsFavorite(true);
    }
    localStorage.setItem("favoriteEvents", JSON.stringify(favorites));
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between relative group">
      <div>
        <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white font-bold text-xl opacity-90">
              {event.category || "Event"}
            </div>
          )}

          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-rose-500 transition shadow cursor-pointer z-10"
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            <Heart size={18} className={isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-600"} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold uppercase px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
              {event.category || "General"}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Capacity: {event.capacity || "Unlimited"}
            </span>
          </div>

          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>

          <div className="space-y-1.5 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-blue-600 shrink-0" />
              {event.date ? new Date(event.date).toLocaleDateString() : "Date TBA"}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-blue-600 shrink-0" />
              {event.venue || event.location || "Online"}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link
          to={`/events/${eventId}`}
          className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}