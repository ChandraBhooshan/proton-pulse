const path = require("path");
const CVDownloadModel = require("../Models/CVDownloadModel");

const requestCV = async (req, res) => {
  try {
    const { name, email, organization, purpose, consent } = req.body;

    if (!name?.trim() || !email?.trim() || !purpose || consent !== true) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields and provide consent.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const allowedPurposes = [
      "Job opportunity",
      "Recruitment",
      "Professional networking",
      "Academic reference",
      "Other",
    ];

    if (!allowedPurposes.includes(purpose)) {
      return res.status(400).json({
        success: false,
        message: "Invalid download purpose.",
      });
    }

    // Before saving
    // console.log("1. CV request received");
    // Save visitor details
    const savedRecord = await CVDownloadModel.create({
      name: name.trim(),
      email: normalizedEmail,
      organization: organization?.trim() || "",
      purpose,
      consent: true,
    });
    // console.log("2. MongoDB record saved:", savedRecord._id);

    // Serve the private CV
    const cvPath = path.join(__dirname, "../private/CV.pdf");

    // console.log("3. CV file path:", cvPath);
    // console.log("4. CV file exists:", require("fs").existsSync(cvPath));

    return res.download(cvPath, "CV-Chandra-Bhooshan.pdf", (error) => {
      if (error) {
        console.error("CV Download Error:", error);
      }
    });
  } catch (error) {
    console.error("CV Request Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process your CV request.",
    });
  }
};

module.exports = { requestCV };
