const express = require("express");
const router = express.Router();

const {
  getSkills,
  createSkill,
  getSingleSkill,
} = require("../controllers/skillController");

const authMiddleware = require("../middleware/authMiddleware");

// GET ALL SKILLS
router.get("/", getSkills);

// GET SINGLE SKILL
router.get("/:id", getSingleSkill);

// CREATE SKILL
router.post("/", authMiddleware, createSkill);

module.exports = router;