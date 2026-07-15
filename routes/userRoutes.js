const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateProfile
} = require("../controllers/userController");

router.get("/", getUsers);
router.put("/:id", updateProfile);

module.exports = router;