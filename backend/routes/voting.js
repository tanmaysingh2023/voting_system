const express = require("express");
const Candidate = require("../models/Candidate");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all candidates
router.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new candidate
router.post("/candidates", authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const newCandidate = new Candidate({ name });
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit a candidate
router.put("/candidates/:id", authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    candidate.name = name;
    await candidate.save();
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a candidate
router.delete("/candidates/:id", authMiddleware, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    await candidate.remove();
    res.json({ message: "Candidate removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vote for a candidate
router.post("/vote", authMiddleware, async (req, res) => {
  const { candidateId } = req.body;
  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    candidate.votes += 1;
    await candidate.save();
    res.json({ message: "Vote cast successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;