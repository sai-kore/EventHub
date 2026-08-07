const Registration = require("../models/Registration");
const Event = require("../models/Event");
const User = require("../models/User");

exports.getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;
    const participants = await Registration.find({ event: eventId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ participants });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendees" });
  }
};

exports.exportParticipantsCSV = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    const participants = await Registration.find({ event: eventId }).populate("user", "name email");

    let csv = "Name,Email,Registration Date\n";
    participants.forEach((p) => {
      const name = p.user?.name ? `"${p.user.name.replace(/"/g, '""')}"` : "N/A";
      const email = p.user?.email ? `"${p.user.email.replace(/"/g, '""')}"` : "N/A";
      const date = new Date(p.createdAt).toISOString().split("T")[0];
      csv += `${name},${email},${date}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="attendees-${event?.title?.replace(/[^a-z0-9]/gi, "_") || "event"}.csv"`
    );
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate CSV export" });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRegistrations = await Registration.countDocuments();
    const latestEvents = await Event.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: {
        totalEvents,
        totalUsers,
        totalRegistrations,
        activeEvents: totalEvents,
      },
      latestEvents,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard statistics" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role createdAt").sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!["attendee", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "User role updated", user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user role" });
  }
};