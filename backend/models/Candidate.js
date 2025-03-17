const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  // Add other fields as needed
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;