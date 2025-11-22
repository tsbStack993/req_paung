import mongoose from "mongoose";
import User from "../models/User.js";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  await connectDB();

  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    return res.status(201).json({ message: "User created" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
