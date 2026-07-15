const Interest = require("../models/Interest");

exports.trackView = async (req, res) => {
  try {
    const data = await Interest.create({
      user: req.user.id,
      skill: req.body.skill,
      action: "view",
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.trackClick = async (req, res) => {
  try {
    const data = await Interest.create({
      user: req.user.id,
      skill: req.body.skill,
      action: "click",
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};