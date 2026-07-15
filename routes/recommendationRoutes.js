const express = require("express");
const router = express.Router();

const {
  getLearningPath,
} = require("../controllers/recommendationController");

router.get("/:skill", getLearningPath);

module.exports = router;