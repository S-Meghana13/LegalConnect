const express =require("express");
const jwt =require("jsonwebtoken");

const router = express.Router();

const Lawyer = require("../models/LawyerProfile");
const Client = require("../models/Client");
const User = require("../models/User");


const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";
const SECRET_KEY = "your_secret_key";

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Admin login request received:", req.body);

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "2h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});


// 1. Total Users Count
router.get("/users-count", async (req, res) => {
  const count = await User.countDocuments();
  res.json({ count });
});

// 2. Total Lawyers Count
router.get("/lawyers-count", async (req, res) => {
  const count = await Lawyer.countDocuments();
  res.json({ count });
});

// 3. Total Requests Count (Optional)
router.get("/requests-count", async (req, res) => {
  res.json({ count: 0 }); // add real model if you want
});
// ---------------- BASIC COUNTS ----------------
router.get("/users-count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/lawyers-count", async (req, res) => {
  try {
    const count = await Lawyer.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// APPROVED LAWYERS COUNT
router.get("/approved-lawyers-count", async (req, res) => {
  try {
    const count = await Lawyer.countDocuments({ status: "approved" });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/pending-consultations", async (req, res) => {
  try {
    const count = await Client.countDocuments({
      status: { $regex: /^pending$/i }  // case-insensitive
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ---------------- SPECIALIZATION STATS ----------------
router.get("/specialization-stats", async (req, res) => {
  try {
    const stats = await Lawyer.aggregate([
      { $match: { specialization: { $exists: true, $ne: "" } } },
      { $group: { _id: "$specialization", value: { $sum: 1 } } }
    ]);

    const formatted = stats.map(item => ({
      name: item._id,
      value: item.value
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- MONTHLY USERS ----------------
router.get("/monthly-users", async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    const formatted = data.map(item => ({
      month: item._id.month,
      count: item.count
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Get All Lawyers (Admin Panel)
router.get("/lawyers", async (req, res) => {
    try {
        const lawyers = await Lawyer.find();
        res.json(lawyers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Approve Lawyer
router.put("/approve/:id", async (req, res) => {
    try {
        await Lawyer.findByIdAndUpdate(req.params.id, { status: "approved" });
        res.json({ message: "Lawyer approved successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reject Lawyer
router.put("/reject/:id", async (req, res) => {
    try {
        await Lawyer.findByIdAndUpdate(req.params.id, { status: "rejected" });
        res.json({ message: "Lawyer rejected!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports= router;





