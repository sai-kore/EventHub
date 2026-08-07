const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalEvents = await Event.countDocuments();

    const totalRegistrations =
      await Registration.countDocuments();

    const latestEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,

      stats: {
        totalUsers,
        totalEvents,
        totalRegistrations,
      },

      latestEvents,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
};