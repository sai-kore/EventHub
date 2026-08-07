import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Card from "../../components/ui/Card";
import { getEvents, deleteEvent } from "../../services/eventService";

function ManageEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadEvents() {
      try {
        const data = await getEvents();
        if (isMounted) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadEvents();

    return () => {
      isMounted = false; // Cleanup flag
    };
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this event?");

    if (!confirmDelete) return;

    try {
      await deleteEvent(id);

      // Use functional update to avoid stale closure state
      setEvents((prevEvents) => prevEvents.filter((e) => e._id !== id));
    } catch (err) {
      // Safely extract error message with fallback
      const errorMessage =
        err?.response?.data?.message ||
        "Failed to delete event. Please try again.";
      alert(errorMessage);
    }
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="mb-8 text-4xl font-bold">Manage Events</h1>

        {events.length === 0 ? (
          <p className="text-gray-500">No events found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
              <Card key={event._id} className="overflow-hidden">
                {/* Banner Image */}
                <img
                  src={
                    event.image ||
                    "https://placehold.co/600x400?text=Event+Banner"
                  }
                  alt={event.title}
                  className="h-44 w-full object-cover rounded-t-lg"
                />

                <div className="p-5">
                  <h2 className="text-xl font-bold mb-3">{event.title}</h2>

                  {/* Event Details */}
                  <div className="space-y-1.5 text-gray-600 text-sm mb-5">
                    <p className="flex items-center gap-2">
                      📍 <span>{event.venue}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      📅 <span>{new Date(event.date).toLocaleDateString()}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      👥 <span>{event.capacity} Seats</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3 border-t">
                    <Link
                      to={`/admin/events/${event._id}/participants`}
                      className="rounded bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100"
                    >
                      Participants
                    </Link>

                    <Link
                      to={`/admin/events/edit/${event._id}`}
                      className="rounded bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(event._id)}
                      className="ml-auto rounded bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default ManageEvents;