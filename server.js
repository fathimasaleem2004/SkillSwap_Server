const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();


const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");

// NEW ROUTES
const matchRoutes = require("./routes/matchRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const interestRoutes = require("./routes/interestRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);

// NEW API ROUTES
app.use("/api/matches", matchRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
  res.send("Skill Swap Backend Running");
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
