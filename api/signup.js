const mongoose = require("mongoose");
//const bcrypt = require("bcryptjs");

const MONGO_URL = process.env.MONGO_URL;

let conn = null;
async function connectDB() {
  if (conn) return conn;

  conn = await mongoose.connect(MONGO_URL);
  return conn;
}

module.exports = async function handler(req, res) {
  await connectDB();

  const { username, password } = req.body;

  const User = mongoose.models.User || mongoose.model(
    "User",
    new mongoose.Schema({ username: String, password: String })
  );

  const existing = await User.findOne({ username });
  if (existing) return res.json({ success: false, message: "User exists" });

  //const hash = await bcrypt.hash(password, 10);
  const hash = password; // for simple
  await User.create({ username, password: hash });

  return res.json({ success: true, message: "Reset OK" });
};
