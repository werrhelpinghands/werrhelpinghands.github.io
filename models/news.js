const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ createdAt: 1 }, { expireAt: Date.now() });

var News = mongoose.model("News", newsSchema);
module.exports = News;
