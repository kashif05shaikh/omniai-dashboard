const UsageLog = require('../models/UsageLog');

exports.getUsageLogs = async (req, res, next) => {
  try {
    const { provider, startDate, endDate } = req.query;
    let query = { user: req.auth.userId };
    
    if (provider) query.provider = provider;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    
    const logs = await UsageLog.find(query).sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (error) { next(error); }
};

exports.createUsageLog = async (req, res, next) => {
  try {
    const { provider, model, inputTokens, outputTokens, cost } = req.body;
    if (!provider || !model) {
      res.status(400); throw new Error('Provider and model are required');
    }
    const log = await UsageLog.create({
      user: req.auth.userId,
      provider,
      model,
      inputTokens: inputTokens || 0,
      outputTokens: outputTokens || 0,
      totalTokens: (inputTokens || 0) + (outputTokens || 0),
      cost: cost || 0
    });
    res.status(201).json(log);
  } catch (error) { next(error); }
};
