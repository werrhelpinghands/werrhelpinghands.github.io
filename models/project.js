const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: String,
    ppt: String,
    description: String,
    contactName: String,
    contactEmail: String,
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
  }
);

var Project = mongoose.model("Project", projectSchema);
module.exports = Project;
