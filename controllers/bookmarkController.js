const Bookmark = require("../models/Bookmark");

exports.addBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      user: req.user.id,
      skill: req.body.skill,
      bookmarkedUser: req.body.bookmarkedUser,
    });

  
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user.id,
    })
      .populate("skill")
      .populate("bookmarkedUser");

    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};