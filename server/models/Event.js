const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, default: "General", trim: true },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    venue: { type: String, trim: true },
    capacity: { type: Number, required: true, default: 100 },
    image: { type: String, default: "" },
    organizer: { type: String, default: "Event Organizers" },
  },
  { timestamps: true },
);

// Virtual field compatibility for venue / location
eventSchema.pre("save", function () {
  if (!this.venue && this.location) this.venue = this.location;
  if (!this.location && this.venue) this.location = this.venue;
});

module.exports = mongoose.model("Event", eventSchema);
