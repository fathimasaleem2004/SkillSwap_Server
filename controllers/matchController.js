const User = require("../models/User");

exports.getMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const users = await User.find({
      _id: { $ne: req.user.id },
    });

    const matches = users.map((user) => {
      const overlap =
        user.teaches?.filter((skill) =>
          currentUser.learns?.includes(skill)
        ) || [];

      const score = Math.round(
        (overlap.length /
          Math.max(currentUser.learns.length, 1)) *
          100
      );

      return {
        user,
        matchingSkills: overlap,
        compatibilityScore: score,
      };
    });

    matches.sort(
      (a, b) =>
        b.compatibilityScore -
        a.compatibilityScore
    );

    res.json(matches);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};