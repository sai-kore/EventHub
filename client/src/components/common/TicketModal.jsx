import { X, Calendar, MapPin, CheckCircle, Printer, Ticket } from "lucide-react";

export default function TicketModal({ registration, onClose }) {
  if (!registration) return null;

  const { event, createdAt, _id } = registration;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 p-1.5 rounded-full transition"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <Ticket className="w-6 h-6 text-blue-200" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-200">
              Official Entry Pass
            </span>
          </div>
          <h2 className="text-2xl font-bold leading-tight">{event?.title}</h2>
        </div>

        {/* Ticket Body */}
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-lg text-sm font-semibold border border-emerald-200">
            <span className="flex items-center gap-2">
              <CheckCircle size={18} /> Registration Confirmed
            </span>
            <span className="text-xs uppercase bg-emerald-200/60 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Date & Time</p>
                <p className="font-medium">
                  {event?.date ? new Date(event.date).toLocaleString() : "TBA"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Location / Venue</p>
                <p className="font-medium">{event?.location || event?.venue || "Online / TBA"}</p>
              </div>
            </div>
          </div>

          <hr className="border-dashed border-gray-300" />

          {/* Ticket Metadata */}
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
            <div>
              <p className="uppercase font-semibold">Ticket ID</p>
              <p className="font-mono text-gray-800 text-sm truncate">{_id}</p>
            </div>
            <div>
              <p className="uppercase font-semibold">Booked On</p>
              <p className="font-mono text-gray-800 text-sm">
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-sm font-semibold transition"
            >
              <Printer size={16} /> Download / Print Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}