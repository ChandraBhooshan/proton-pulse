const mongoose = require("mongoose");

const CVDownloadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },
    purpose: {
      type: String,
      required: true,
      enum: [
        "Job opportunity",
        "Recruitment",
        "Professional networking",
        "Other",
      ],
    },
    consent: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("CVDownload", CVDownloadSchema);
