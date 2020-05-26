const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
    date: {
        type: Number,
        default: 30
    }
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ expireAfterSeconds: this.date });

var News = mongoose.model("News", newsSchema);
module.exports = News;
