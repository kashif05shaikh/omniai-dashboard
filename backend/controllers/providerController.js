const Provider = require('../models/Provider');

exports.getProviders = async (req, res, next) => {
  try {
    const providers = await Provider.find({ user: req.auth.userId });
    res.json(providers);
  } catch (error) { next(error); }
};

exports.createProvider = async (req, res, next) => {
  try {
    console.log('═══════════════════════════════════════════');
    console.log('🔵 [createProvider] Request received');
    console.log('   Headers:', {
      authorization: req.headers.authorization ? `Bearer ${req.headers.authorization.substring(0, 30)}...` : 'missing',
      contentType: req.headers['content-type'],
    });
    console.log('   req.auth type:', typeof req.auth);
    console.log('   req.auth keys:', req.auth ? Object.keys(req.auth) : 'N/A');
    console.log('   req.auth:', req.auth);
    console.log('   req.auth.userId:', req.auth?.userId);
    console.log('   req.body:', req.body);
    
    const { name, accountName, apiKeyRef, status, color } = req.body;
    if (!name || !accountName) {
      console.error('   ❌ Missing name or accountName in body');
      res.status(400);
      throw new Error('Name and accountName are required');
    }
    
    const userId = req.auth?.userId;
    if (!userId) {
      console.error('   ❌ userId is missing or undefined');
      console.error('   req.auth object keys:', req.auth ? Object.keys(req.auth) : 'req.auth is null/undefined');
      res.status(401);
      throw new Error('Authentication failed: userId not found in token');
    }
    
    console.log('   ✅ Creating provider with userId:', userId);
    
    const provider = await Provider.create({
      user: userId, name, accountName, apiKeyRef, status, color
    });
    
    console.log('   ✅ Provider created:', provider._id);
    console.log('═══════════════════════════════════════════');
    res.status(201).json(provider);
  } catch (error) { 
    console.error('   ❌ Error:', error.message);
    console.log('═══════════════════════════════════════════');
    next(error); 
  }
};

exports.deleteProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) { res.status(404); throw new Error('Provider not found'); }
    if (provider.user !== req.auth.userId) { res.status(401); throw new Error('Not authorized'); }
    await provider.deleteOne();
    res.json({ message: 'Provider removed' });
  } catch (error) { next(error); }
};
