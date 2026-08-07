import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import dummyEvents from "../../utils/dummyEvents";
import { getEvents } from "../../services/eventService";

export default function FeaturedEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        if (data?.events && data.events.length > 0) {
          setEvents(data.events.slice(0, 6));
        } else {
          setEvents(dummyEvents);
        }
      } catch (error) {
        setEvents(dummyEvents);
      }
    }
    loadEvents();
  }, []);

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3 text-gray-900">Featured Events</h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Discover and join high-impact workshops, hackathons, and cultural fests.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event._id || event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}