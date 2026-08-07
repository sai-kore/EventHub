import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

import { getEvent } from "../../services/eventService";
import { registerForEvent, getMyRegistrations } from "../../services/registrationService";
import useAuth from "../../hooks/useAuth";

import toast from "react-hot-toast";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEventData() {
      try {
        const data = await getEvent(id);
        setEvent(data.event);

        if (user) {
          const myRegs = await getMyRegistrations();
          const registered = myRegs.registrations?.some((r) => r.event?._id === id);
          setIsRegistered(registered);
        }
      } catch (err) {
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    }
    loadEventData();
  }, [id, user]);

  async function handleRegister() {
    if (!user) {
      toast.error("Please login to register for events");
      navigate("/login");
      return;
    }

    try {
      await registerForEvent(id);
      setIsRegistered(true);
      toast.success("Registered Successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  }

  if (loading || !event) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-5xl py-12 px-6">
        <img
          src={event.image || "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200"}
          alt={event.title}
          className="h-96 w-full rounded-2xl object-cover shadow-md"
        />

        <div className="flex justify-between items-start mt-8">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold uppercase mb-3">
              {event.category || "General"}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900">{event.title}</h1>
          </div>
        </div>

        <p className="mt-5 text-lg text-slate-600 leading-relaxed">{event.description}</p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 border shadow-sm">
            <h3 className="font-semibold text-gray-500 text-xs uppercase">Date</h3>
            <p className="mt-1 font-bold text-gray-900">
              {event.date ? new Date(event.date).toLocaleDateString() : "TBA"}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 border shadow-sm">
            <h3 className="font-semibold text-gray-500 text-xs uppercase">Venue / Location</h3>
            <p className="mt-1 font-bold text-gray-900">{event.venue || event.location || "Online"}</p>
          </div>

          <div className="rounded-xl bg-white p-5 border shadow-sm">
            <h3 className="font-semibold text-gray-500 text-xs uppercase">Capacity</h3>
            <p className="mt-1 font-bold text-gray-900">{event.capacity || "Unlimited"} Seats</p>
          </div>
        </div>

        {isRegistered ? (
          <div className="mt-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-semibold text-center">
            ✓ You are registered for this event! Check "My Events" for your ticket pass.
          </div>
        ) : (
          <Button onClick={handleRegister} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl">
            Register Now
          </Button>
        )}
      </div>
    </Layout>
  );
}

export default EventDetails;