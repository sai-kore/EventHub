const express = require("express");
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
} = require("../controllers/registrationController");
const { getEventParticipants } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/:eventId", protect, registerForEvent);
router.get("/my-registrations", protect, getMyRegistrations);
router.get("/my", protect, getMyRegistrations); // Alias for compatibility
router.delete("/:eventId", protect, cancelRegistration);
router.get("/event/:eventId", protect, admin, getEventParticipants);

module.exports = router;