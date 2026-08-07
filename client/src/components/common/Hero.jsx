import { Link } from "react-router-dom";
import { Sparkles, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white min-h-[85vh] flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Column */}
        <div>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-xs font-semibold tracking-wide mb-6">
            <Sparkles size={14} className="text-yellow-300" /> Campus Event Management Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Discover, <span className="text-yellow-300">Join</span> and <span className="text-cyan-300">Manage</span> Amazing Events
          </h1>

          <p className="mt-6 text-lg text-slate-200 leading-relaxed max-w-xl">
            EventHub makes organizing and participating in college fests, technical hackathons, and workshops completely effortless.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/events"
              className="bg-white text-blue-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-100 hover:scale-105 transition shadow-lg flex items-center gap-2"
            >
              Explore Events <ArrowRight size={18} />
            </Link>

            <Link
              to="/register"
              className="border border-white/30 hover:border-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Get Started
            </Link>
          </div>

          <div className="flex gap-10 mt-12 border-t border-white/10 pt-8">
            <div>
              <h2 className="text-3xl font-extrabold text-yellow-300">120+</h2>
              <p className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">Events Hosted</p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-cyan-300">5000+</h2>
              <p className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">Students Registered</p>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-emerald-300">50+</h2>
              <p className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">Clubs & Organizers</p>
            </div>
          </div>
        </div>

        {/* Right Column - Visual Showcase Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/30 flex items-center justify-center text-blue-200">
                <Calendar size={28} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">Event Pass Verification</h3>
                <p className="text-xs text-blue-200">Instant digital access with custom ID pass</p>
              </div>
            </div>

            <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/10 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Pass ID</span>
                <span className="font-mono text-cyan-300">EH-2026-9921</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck size={14} /> Verified Entry
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}