const UsageLog = require('../models/UsageLog');

exports.getCostBreakdown = async (req, res, next) => {
  try {
    const breakdown = await UsageLog.aggregate([
      { $match: { user: req.auth.userId } },
      { 
        $group: {
          _id: {
            month: { $month: "$timestamp" },
            year: { $year: "$timestamp" }
          },
          totalCost: { $sum: "$cost" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 }
    ]);
    res.json(breakdown);
  } catch (error) { next(error); }
};
