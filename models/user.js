var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  feed: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll"
      },
      createdAt: Date
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
