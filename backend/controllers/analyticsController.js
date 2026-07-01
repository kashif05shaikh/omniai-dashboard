const UsageLog = require('../models/UsageLog');

exports.getAnalyticsSummary = async (req, res, next) => {
  try {
    // Example: group by provider
    const summary = await UsageLog.aggregate([
      { $match: { user: req.auth.userId } },
      { 
        $group: {
          _id: "$provider",
          totalRequests: { $sum: "$requestCount" },
          totalTokens: { $sum: "$totalTokens" },
          totalCost: { $sum: "$cost" }
        }
      }
    ]);
    res.json(summary);
  } catch (error) { next(error); }
};
