import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import FeaturedEvents from "../components/common/FeaturedEvents"; // Adjust import path if needed
import { ShieldCheck, Zap, Ticket, Mail, Info, ArrowRight, Sparkles } from "lucide-react";
import useAuth from "../hooks/useAuth";

export default function Landing() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white py-24 text-center px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-6">
            <Sparkles size={14} /> The All-in-One Event Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Discover & Manage Campus Events with <span className="text-blue-600">EventHub</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From tech hackathons to career expos, EventHub empowers attendees to discover events and organizers to run seamless operations.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/events"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition"
            >
              Explore Events <ArrowRight size={18} />
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow transition"
              >
                Go to Admin Panel
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured / Live Events Section */}
      <section id="events-preview" className="max-w-7xl mx-auto px-6 py-16">
        <FeaturedEvents />
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-50 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Platform Features</h2>
            <p className="text-gray-600 mt-2">Everything required for a complete event management lifecycle.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-5">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Pass Generation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Attendees receive instant digital ticket passes with unique verification IDs and one-click print options.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Analytics</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Organizers track registrations against capacity limits and export participant lists to CSV at any time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Role-Based Portals</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dedicated attendee and admin dashboards tailored for registration tracking and event creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Info className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About EventHub</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            EventHub was built to centralize event management across organizations and educational campuses.
            We eliminate fragmented tracking spreadsheets by unifying discovery, ticket issuance, capacity enforcement,
            and attendee reporting into one seamless experience.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-12 bg-slate-800 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Have Questions? Get in Touch</h2>
          <p className="text-slate-400 mb-8">
            Need help setting up your events or integrating EventHub for your campus?
          </p>
          <a
            href="mailto:support@eventhub.com"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-lg shadow-blue-600/30"
          >
            Contact Support
          </a>
        </div>
      </section>
    </Layout>
  );
}