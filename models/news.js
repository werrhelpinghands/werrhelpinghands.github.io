const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
    ex: {
      type: Date,
      default: this.updateDate(new Date())
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

newsSchema.methods = {
  updateDate: function (date) {
    return date.getDate() + 7;
  },
};

var News = mongoose.model("News", newsSchema);
module.exports = News;
