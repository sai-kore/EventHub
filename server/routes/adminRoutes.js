const express = require("express");
const router = express.Router();
const {
  getEventParticipants,
  exportParticipantsCSV,
  getAdminStats,
  getUsers,
  updateUserRole,
} = require("../controllers/adminController");
const {
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect, admin } = require("../middleware/authMiddleware");

router.use(protect, admin);

router.get("/stats", getAdminStats);
router.get("/events/:eventId/participants", getEventParticipants);
router.get("/events/:eventId/export-csv", exportParticipantsCSV);
router.get("/users", getUsers);
router.put("/users/:id/role", updateUserRole);

router.post("/events", createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

module.exports = router;