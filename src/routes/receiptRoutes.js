const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const receiptController = require('../controllers/receiptController');

router.get('/', receiptController.home);
router.post('/process', receiptController.processReceipt);
router.get('/:id/points', receiptController.getPoints);

module.exports = router;
