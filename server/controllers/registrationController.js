const Registration = require("../models/Registration");
const Event = require("../models/Event");

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check capacity
    const currentCount = await Registration.countDocuments({ event: eventId });
    if (currentCount >= event.capacity) {
      return res.status(400).json({ message: "Event is already at full capacity!" });
    }

    // Check existing registration
    const existing = await Registration.findOne({ user: req.user._id, event: eventId });
    if (existing) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    const registration = await Registration.create({
      user: req.user._id,
      event: eventId,
    });

    res.status(201).json({ message: "Registered successfully", registration });
  } catch (error) {
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json({ registrations });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch registrations" });
  }
};

exports.cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const deleted = await Registration.findOneAndDelete({
      user: req.user._id,
      event: eventId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Registration record not found" });
    }

    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to cancel registration" });
  }
};