const express = require("express");
const router = express.Router();
const { getAdminStats } = require("../controllers/adminController");

router.get("/", getAdminStats);

module.exports = router;