const express = require('express');
const router = express.Router();
const { getAnalyticsSummary } = require('../controllers/analyticsController');

router.route('/').get(getAnalyticsSummary);

module.exports = router;
