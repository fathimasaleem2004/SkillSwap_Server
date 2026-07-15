const Skill = require("../models/Skill");

// =========================
// CREATE SKILL
// =========================
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET ALL SKILLS
// SEARCH + FILTER + PAGINATION
// =========================
exports.getSkills = async (req, res) => {
  try {
    const {
      search,
      category,
      page = 1,
      limit = 6,
    } = req.query;

    let query = {};

    // SEARCH BY TITLE OR TAGS
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // FILTER BY CATEGORY
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const totalSkills = await Skill.countDocuments(query);

    const skills = await Skill.find(query)
      .populate("user", "name email profilePic bio location")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      currentPage: Number(page),
      totalPages: Math.ceil(totalSkills / limit),
      totalSkills,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET SINGLE SKILL
// =========================
exports.getSingleSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id).populate(
      "user",
      "name email profilePic bio location"
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};