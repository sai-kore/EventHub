import { useEffect, useState } from "react";
import { getMyRegistrations } from "../../services/registrationService";
import Layout from "../../components/layout/Layout";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";

function MyEvents() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadRegistrations() {
      try {
        const data = await getMyRegistrations();
        if (isMounted) {
          setRegistrations(data?.registrations || []);
        }
      } catch (err) {
        console.error("Failed to load registrations:", err);
      }
    }

    loadRegistrations();

    return () => {
      isMounted = false; // Cleanup flag
    };
  }, []);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl py-10 px-6">
        <h1 className="mb-8 text-4xl font-bold">My Registered Events</h1>

        {registrations.length === 0 ? (
          <EmptyState message="No registrations found." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {registrations.map((item) => (
              <Card key={item._id} className="overflow-hidden">
                {/* Banner */}
                <img
                  src={
                    item.event?.image ||
                    "https://placehold.co/600x400?text=Event+Banner"
                  }
                  alt={item.event?.title || "Event Image"}
                  className="h-48 w-full object-cover rounded-t-xl mb-4"
                />

                {/* Title */}
                <h2 className="text-2xl font-bold mb-3">
                  {item.event?.title || "Event No Longer Available"}
                </h2>

                {/* Details */}
                <div className="space-y-2 text-gray-600 mb-6 text-sm">
                  <p className="flex items-center gap-2">
                    📅{" "}
                    <span>
                      {item.event?.date
                        ? new Date(item.event.date).toLocaleDateString()
                        : "Date N/A"}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    📍 <span>{item.event?.venue || "Venue N/A"}</span>
                  </p>
                </div>

                {/* Status Badge */}
                <div className="pt-3 border-t">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Registered ✓
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyEvents;