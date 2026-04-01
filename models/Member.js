const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: String,
  age: Number,
  plan: String,
  joinDate: Date,
  expiryDate: Date,
  status: String
});

module.exports = mongoose.model("Member", MemberSchema);