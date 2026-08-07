import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/ui/Loader";
import { Download, Users, Mail, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { getParticipants } from "../../services/registrationService";

export default function EventParticipants() {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParticipantsList() {
      try {
        const data = await getParticipants(eventId);
        setParticipants(data.participants || []);
      } catch (err) {
        toast.error("Failed to load attendees");
      } finally {
        setLoading(false);
      }
    }
    fetchParticipantsList();
  }, [eventId]);

  const handleExportCSV = () => {
    const token = localStorage.getItem("token");
    window.open(`http://localhost:5000/api/admin/events/${eventId}/export-csv?token=${token}`, "_blank");
    toast.success("Downloading CSV report...");
  };

  const filteredParticipants = participants.filter((p) =>
    p.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Registered Attendees</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and export participant lists</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl transition shadow-sm w-full md:w-auto justify-center cursor-pointer"
        >
          <Download size={18} /> Export CSV Report
        </button>
      </div>

      <div className="max-w-md mb-6">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search attendee by name or email..."
        />
      </div>

      {loading ? (
        <Loader />
      ) : filteredParticipants.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-gray-500">No attendees match your filter criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase border-b">
              <tr>
                <th className="p-4">Attendee Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {filteredParticipants.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-semibold text-gray-900 flex items-center gap-2">
                    <Users size={16} className="text-blue-600" />
                    {p.user?.name || "N/A"}
                  </td>
                  <td className="p-4 text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Mail size={14} className="text-gray-400" />
                      {p.user?.email || "N/A"}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}