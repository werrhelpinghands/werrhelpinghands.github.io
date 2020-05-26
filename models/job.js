const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    company: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    about: {
      type: String,
      required: true,
    },
    roles: {
      type: Array,
      default: [],
    },
    skills: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    pay: {
      type: String,
      required: true,
    },
    available: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    notification: {
      type: String,
      required: true,
    },
    portal: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({
  expireAfterSeconds: Math.abs(this.expireAt - this.createdAt) / 1000,
});

var Job = mongoose.model("Job", jobSchema);
module.exports = Job;
