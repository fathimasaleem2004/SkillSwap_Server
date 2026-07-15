exports.getLearningPath = async (
  req,
  res
) => {
  const paths = {
    MERN: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "NodeJS",
      "Express",
      "MongoDB",
    ],

    Python: [
      "Python Basics",
      "Functions",
      "OOP",
      "NumPy",
      "Pandas",
      "Machine Learning",
    ],

    UIUX: [
      "Design Basics",
      "Color Theory",
      "Wireframing",
      "Figma",
      "Prototyping",
    ],
  };

  res.json(
    paths[req.params.skill] || []
  );
};