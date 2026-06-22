const express = require('express');
const router = express.Router();
const { getCostBreakdown } = require('../controllers/costController');

router.route('/').get(getCostBreakdown);

module.exports = router;
