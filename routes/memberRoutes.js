const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// ➕ Add member
router.post("/add", async (req, res) => {
  const m = new Member(req.body);
  await m.save();
  res.send(m);
});

// 📥 Get all members
router.get("/all", async (req, res) => {
  const data = await Member.find();
  res.send(data);
});

// ❌ Delete member
router.delete("/delete/:id", async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// 🔍 👉 ADD THIS HERE
router.get("/member/:name", async (req, res) => {
  const user = await Member.findOne({
    $or: [
      { name: req.params.name },
      { phone: req.params.name }
    ]
  });
  res.json(user);
});

// 👇 KEEP THIS LAST
module.exports = router;