const UsageLog = require('../models/UsageLog');

exports.getAnalyticsSummary = async (req, res, next) => {
  try {
    // Example: group by provider
    const summary = await UsageLog.aggregate([
      { $match: { user: req.user._id } }, // note: req.user.id is string, but ObjectId needed ideally. Handled by fallback.
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
