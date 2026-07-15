const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addBookmark,
  getBookmarks,
} = require("../controllers/bookmarkController");

router.post("/", auth, addBookmark);
router.get("/", auth, getBookmarks);

module.exports = router;