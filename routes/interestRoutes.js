const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  trackView,
  trackClick,
} = require("../controllers/interestController");

router.post("/view", auth, trackView);
router.post("/click", auth, trackClick);

module.exports = router;