const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const CVEmailOTPModel = require("../Models/CVEmailOTPModel");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const hashOTP = (otp) => crypto.createHash("sha256").update(otp).digest("hex");

// SEND OTP
const sendCVOTP = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address.",
      });
    }

    // Basic resend cooldown
    const existing = await CVEmailOTPModel.findOne({ email });

    if (existing && Date.now() - existing.updatedAt.getTime() < 60 * 1000) {
      return res.status(429).json({
        success: false,
        message: "Please wait one minute before requesting another OTP.",
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    await CVEmailOTPModel.findOneAndUpdate(
      { email },
      {
        otpHash: hashOTP(otp),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        attempts: 0,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    try {
      await transporter.sendMail({
        from: `"ProtonPulse" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Verify your email for CV download",
        text: `Your ProtonPulse verification code is ${otp}. It expires in 5 minutes.`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px">
            <h2>Email verification</h2>
            <p>Use this code to verify your email before downloading the CV:</p>
            <h1 style="letter-spacing:8px">${otp}</h1>
            <p>This code expires in 5 minutes. Do not share it with anyone.</p>
          </div>
        `,
      });
    } catch (mailError) {
      await CVEmailOTPModel.deleteOne({ email });
      throw mailError;
    }

    return res.status(200).json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (error) {
    console.error("Send CV OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send verification email.",
    });
  }
};

// VERIFY OTP
const verifyCVOTP = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const otp = String(req.body.otp || "").trim();

    if (!email || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Enter your email and the 6-digit OTP.",
      });
    }

    const record = await CVEmailOTPModel.findOne({ email });

    if (!record || record.expiresAt <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
    }

    if (record.attempts >= 5) {
      await CVEmailOTPModel.deleteOne({ email });
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Request a new OTP.",
      });
    }

    if (hashOTP(otp) !== record.otpHash) {
      record.attempts += 1;
      await record.save();

      return res.status(400).json({
        success: false,
        message: "Incorrect verification code.",
      });
    }

    await CVEmailOTPModel.deleteOne({ email });

    const verificationToken = jwt.sign(
      { email, purpose: "cv-download" },
      process.env.JWT_SECRET,
      { expiresIn: "10m" },
    );

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      verificationToken,
    });
  } catch (error) {
    console.error("Verify CV OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to verify email.",
    });
  }
};

module.exports = { sendCVOTP, verifyCVOTP };
