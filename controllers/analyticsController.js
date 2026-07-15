const Skill = require("../models/Skill");
const Interest = require("../models/Interest");
const Bookmark = require("../models/Bookmark");

exports.trendingSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    const result = [];

    for (const skill of skills) {
      const views =
        await Interest.countDocuments({
          skill: skill._id,
          action: "view",
        });

      const clicks =
        await Interest.countDocuments({
          skill: skill._id,
          action: "click",
        });

      const bookmarks =
        await Bookmark.countDocuments({
          skill: skill._id,
        });

      const popularity =
        views +
        clicks * 3 +
        bookmarks * 5;

      result.push({
        skill,
        views,
        clicks,
        bookmarks,
        popularity,
      });
    }

    result.sort(
      (a, b) =>
        b.popularity -
        a.popularity
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};