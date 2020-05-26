const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
    ex: {
      type: Date,
      default: function () {
        let date = Date.now()
        return date.setDate(this.date.getDate() + 7);
      },
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

var News = mongoose.model("News", newsSchema);
module.exports = News;
