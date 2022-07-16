const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  username: { type: String, required: true },
  created: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
