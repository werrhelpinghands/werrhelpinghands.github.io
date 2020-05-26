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

newsSchema.index({ expireAt: 1 });

var News = mongoose.model("News", newsSchema);
module.exports = News;
