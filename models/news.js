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

newsSchema.index({ expireAfterSeconds: 2592000 });

var News = mongoose.model("News", newsSchema);
module.exports = News;
