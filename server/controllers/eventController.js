const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
  try {
    const search = req.query.query || req.query.search || "";
    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { venue: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const events = await Event.find(filter).sort({ date: 1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch events" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ event });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving event" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, date, location, venue, capacity, image, organizer } = req.body;
    const loc = venue || location || "TBA";

    const event = await Event.create({
      title,
      description,
      category: category || "General",
      date,
      location: loc,
      venue: loc,
      capacity: Number(capacity) || 100,
      image,
      organizer,
    });

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create event" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const loc = req.body.venue || req.body.location || event.location;
    Object.assign(event, req.body, { location: loc, venue: loc });

    await event.save();
    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update event" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete event" });
  }
};