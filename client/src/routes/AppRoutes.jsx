import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/admin/Dashboard";
import ManageEvents from "../pages/admin/ManageEvents";
import CreateEvent from "../pages/admin/CreateEvent";
import EditEvent from "../pages/admin/EditEvent";
import EventParticipants from "../pages/admin/EventParticipants";
import MyEvents from "../pages/MyEvents";
import EventDetails from "../pages/attendee/EventDetails";
import Profile from "../pages/Profile";
import Events from "../pages/Events";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute adminOnly>
              <ManageEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/create"
          element={
            <ProtectedRoute adminOnly>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/edit/:id"
          element={
            <ProtectedRoute adminOnly>
              <EditEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events/:eventId/participants"
          element={
            <ProtectedRoute adminOnly>
              <EventParticipants />
            </ProtectedRoute>
          }
        />

        {/* Protected Attendee Routes */}
        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default AppRoutes;