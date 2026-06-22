const express = require('express');
const router = express.Router();
const { getProviders, createProvider, deleteProvider } = require('../controllers/providerController');

router.route('/').get(getProviders).post(createProvider);
router.route('/:id').delete(deleteProvider);

module.exports = router;
