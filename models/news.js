const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
    expireAt: {
        type: Number,
        default: 10
    }
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ expireAfterSeconds: this.expireAt });

var News = mongoose.model("News", newsSchema);
module.exports = News;
