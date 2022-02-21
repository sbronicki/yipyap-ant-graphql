const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  creator: {
    type: String,
    required: true,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    // required: true,
  },
  username: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
