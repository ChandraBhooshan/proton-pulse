const NewsletterModel = require("../Models/NewsletterModel");

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Check existing subscriber
    const existingSubscriber = await NewsletterModel.findOne({
      email: normalizedEmail,
    });

    if (existingSubscriber) {
      if (existingSubscriber.status === "subscribed") {
        return res.status(409).json({
          success: false,
          message: "This email is already subscribed.",
        });
      }

      // Reactivate an unsubscribed email
      existingSubscriber.status = "subscribed";
      existingSubscriber.subscribedAt = new Date();

      await existingSubscriber.save();

      return res.status(200).json({
        success: true,
        message: "Your subscription has been reactivated!",
      });
    }

    // Create subscriber
    await NewsletterModel.create({
      email: normalizedEmail,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed to our newsletter!",
    });
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to process subscription.",
    });
  }
};

module.exports = {
  subscribeNewsletter,
};
