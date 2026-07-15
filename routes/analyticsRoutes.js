const express = require("express");
const router = express.Router();

const {
  trendingSkills,
} = require("../controllers/analyticsController");

router.get("/trending", trendingSkills);

module.exports = router;