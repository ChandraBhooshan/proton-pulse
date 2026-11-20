const Visitor = require("../Models/Visitor");
const VisitorSession = require("../Models/VisitorSession");
const PageView = require("../Models/PageView");

const trackVisit = async (req, res) => {
  try {
    const { visitorId, sessionId, path } = req.body;

    if (
      typeof visitorId !== "string" ||
      visitorId.length > 100 ||
      typeof sessionId !== "string" ||
      sessionId.length > 100 ||
      typeof path !== "string" ||
      path.length > 500 ||
      !path.startsWith("/")
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid tracking data.",
      });
    }

    const now = new Date();

    // Count this browser identity only once.
    await Visitor.updateOne(
      { visitorId },
      {
        $setOnInsert: {
          visitorId,
          firstSeen: now,
        },
        $set: {
          lastSeen: now,
        },
      },
      { upsert: true },
    );

    // Count each browser session only once.
    await VisitorSession.updateOne(
      { visitorId, sessionId },
      {
        $setOnInsert: {
          visitorId,
          sessionId,
          startedAt: now,
        },
      },
      { upsert: true },
    );

    // Record each page navigation.
    await PageView.create({
      visitorId,
      sessionId,
      path,
      viewedAt: now,
    });

    return res.status(200).json({
      success: true,
      message: "Visit tracked.",
    });
  } catch (error) {
    console.error("Analytics tracking error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to track visit.",
    });
  }
};

const getVisitorSummary = async (req, res) => {
  try {
    const [uniqueVisitors, totalSessions, totalPageViews] = await Promise.all([
      Visitor.countDocuments(),
      VisitorSession.countDocuments(),
      PageView.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        uniqueVisitors,
        totalSessions,
        totalPageViews,
      },
    });
  } catch (error) {
    console.error("Analytics summary error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch visitor statistics.",
    });
  }
};

module.exports = {
  trackVisit,
  getVisitorSummary,
};
