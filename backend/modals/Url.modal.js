const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    DateTime: {
      type: Date,
      required: true,
      default: new Date(),
      index: {
        expireAfterSeconds: 86400,
      },
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    masterUrl: {
      type: String,
      required: true,
    },
    authPhrase: [],
    analytics: {
      visitCount: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
