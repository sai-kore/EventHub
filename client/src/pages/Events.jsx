import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import EventCard from "../components/common/EventCard";
import SearchBar from "../components/common/SearchBar";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import { searchEvents } from "../services/eventService";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchEvents(query);
        setEvents(data.events || []);
      } catch (err) {
        console.error("Error searching events:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">All Upcoming Events</h1>
          <p className="text-gray-600">Find and register for workshops, hackathons, and fests.</p>
        </div>

        <div className="max-w-xl mx-auto">
          <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        {loading ? (
          <Loader />
        ) : events.length === 0 ? (
          <EmptyState message="No events match your search." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}