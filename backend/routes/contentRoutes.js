const express = require('express');
const router = express.Router();
const { getUnits, getLessons } = require('../controllers/contentController');

// 1. رابط الوحدات (ده اللي كان ضايع)
router.get('/units', getUnits);

// 2. رابط الدروس
router.get('/lessons/:unitId', getLessons);

module.exports = router;