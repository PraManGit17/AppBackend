require("dotenv").config();   // ⭐ MUST be on top

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MongoDB Atlas Connection
mongoose.connect(
  process.env.MONGO_URI,

)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

// 🔹 Schema
const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// 🔹 API Route
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true, message: "User saved" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
