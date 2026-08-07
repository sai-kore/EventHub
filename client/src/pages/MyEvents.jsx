import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Loader from "../components/ui/Loader";
import TicketModal from "../components/common/TicketModal";
import { Ticket, Calendar, Trash2, Clock, Award } from "lucide-react";
import toast from "react-hot-toast";
import { getMyRegistrations, cancelRegistration } from "../services/registrationService";

export default function MyEvents() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchRegistrations = async () => {
    try {
      const data = await getMyRegistrations();
      setRegistrations(data.registrations || []);
    } catch (err) {
      toast.error("Failed to fetch registered events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancelRegistration = async (eventId) => {
    if (!window.confirm("Are you sure you want to cancel your registration?")) return;

    try {
      await cancelRegistration(eventId);
      toast.success("Registration cancelled successfully");
      fetchRegistrations();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel registration");
    }
  };

  const upcomingEvents = registrations.filter(
    (r) => r.event?.date && new Date(r.event.date) > new Date()
  );
  const nextEvent = upcomingEvents.sort(
    (a, b) => new Date(a.event.date) - new Date(b.event.date)
  )[0];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">My Registered Events</h1>
        <p className="text-gray-600 mb-8">Manage your entry passes and registration status.</p>

        {/* Stats Widget */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Registered</p>
                <p className="text-3xl font-bold mt-1">{registrations.length}</p>
              </div>
              <Ticket className="w-10 h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Participation Streak</p>
                <p className="text-3xl font-bold mt-1">{registrations.length * 3} Days 🔥</p>
              </div>
              <Award className="w-10 h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Next Upcoming Event</p>
                <p className="text-lg font-bold mt-1 truncate max-w-[180px]">
                  {nextEvent ? nextEvent.event?.title : "None Scheduled"}
                </p>
              </div>
              <Clock className="w-10 h-10 opacity-80" />
            </div>
          </div>
        </div>

        {/* Registrations List */}
        {loading ? (
          <Loader />
        ) : registrations.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed">
            <p className="text-gray-500">You have not registered for any events yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registrations.map((reg) => (
              <div
                key={reg._id}
                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold uppercase px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md">
                      {reg.event?.category || "General"}
                    </span>
                    <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      Confirmed
                    </span>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{reg.event?.title || "Event Title"}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                    <Calendar size={16} />
                    {reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : "Date N/A"}
                  </p>
                </div>

                <div className="flex gap-2 pt-4 border-t mt-4">
                  <button
                    onClick={() => setSelectedTicket(reg)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer"
                  >
                    <Ticket size={14} /> View Pass
                  </button>
                  {reg.event?._id && (
                    <button
                      onClick={() => handleCancelRegistration(reg.event._id)}
                      className="flex items-center justify-center p-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition cursor-pointer"
                      title="Cancel Registration"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ticket Pass Modal */}
        {selectedTicket && (
          <TicketModal
            registration={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </div>
    </Layout>
  );
}