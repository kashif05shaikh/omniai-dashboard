const express = require('express');
const router = express.Router();
const { getUsageLogs, createUsageLog } = require('../controllers/usageController');

router.route('/').get(getUsageLogs).post(createUsageLog);

module.exports = router;
