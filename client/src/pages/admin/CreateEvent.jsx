import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import { createEvent } from "../../services/eventService";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    capacity: 100,
    image: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createEvent(form);
      alert("Event Created Successfully");
      navigate("/admin/events");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Failed to create event. Please try again.";
      alert(errorMessage);
    }
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-2xl py-10">
        <h1 className="mb-8 text-4xl font-bold">Create Event</h1>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Event Title"
              name="title"
              placeholder="React Workshop"
              value={form.title}
              onChange={handleChange}
              required
            />

            <div>
              <label className="mb-1 block font-medium">Description</label>
              <textarea
                name="description"
                placeholder="Event description..."
                value={form.description}
                onChange={handleChange}
                className="w-full rounded border p-3"
                rows="4"
                required
              />
            </div>

            <Input
              label="Date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <Input
              label="Venue"
              name="venue"
              placeholder="Conference Hall A"
              value={form.venue}
              onChange={handleChange}
              required
            />

            <Input
              label="Capacity"
              type="number"
              name="capacity"
              placeholder="100"
              value={form.capacity}
              onChange={handleChange}
              required
            />

            <Input
              label="Image URL"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={handleChange}
            />

            <Button type="submit">
              Create Event
            </Button>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default CreateEvent;