var mongoose = require("mongoose");

var PollSchema = new mongoose.Schema({
  question: String,

  pollOption1: {
    text: String,
    votes: { type: Number, default: 19 }
  },
  pollOption2: {
    text: String,
    votes: { type: Number, default: 10 }
  },

  approved: { type: Boolean, default: false },
  answersFrom: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
    }
  ],

  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Poll", PollSchema);
