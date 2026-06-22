const Provider = require('../models/Provider');

exports.getProviders = async (req, res, next) => {
  try {
    const providers = await Provider.find({ user: req.user.id });
    res.json(providers);
  } catch (error) { next(error); }
};

exports.createProvider = async (req, res, next) => {
  try {
    const { name, accountName, apiKeyRef, status, color } = req.body;
    if (!name || !accountName) {
      res.status(400);
      throw new Error('Name and accountName are required');
    }
    const provider = await Provider.create({
      user: req.user.id, name, accountName, apiKeyRef, status, color
    });
    res.status(201).json(provider);
  } catch (error) { next(error); }
};

exports.deleteProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) { res.status(404); throw new Error('Provider not found'); }
    if (provider.user.toString() !== req.user.id) { res.status(401); throw new Error('Not authorized'); }
    await provider.deleteOne();
    res.json({ message: 'Provider removed' });
  } catch (error) { next(error); }
};
