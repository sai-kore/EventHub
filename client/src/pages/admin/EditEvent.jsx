import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { getEventById, updateEvent } from "../../services/eventService";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadEvent() {
      try {
        const data = await getEventById(id);
        if (isMounted && data?.event) {
          const eventData = data.event;
          if (eventData.date) {
            eventData.date = new Date(eventData.date).toISOString().split("T")[0];
          }
          setForm(eventData);
        }
      } catch (err) {
        console.error("Failed to load event:", err);
      }
    }

    loadEvent();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit: updateEvent instead of createEvent
      await updateEvent(id, form);

      // Redirect back to events list
      navigate("/admin/events");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update event.");
    }
  };

  // Render only after loading (when form is not null)
  if (!form) {
    return (
      <AdminLayout>
        Loading...
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-2xl p-8">
        <h1 className="mb-6 text-3xl font-bold">Edit Event</h1>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow">
          <div>
            <label className="mb-1 block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Venue</label>
            <input
              type="text"
              name="venue"
              value={form.venue || ""}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={form.date || ""}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={form.capacity || ""}
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-2"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Update Event
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="rounded-lg bg-gray-200 px-5 py-2 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditEvent;