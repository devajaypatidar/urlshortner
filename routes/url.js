const express = require('express');

const router = express.Router();
const {shortURL,getAnalytics,getShortUrl} = require('../controllers/url');

router.post('/',shortURL);

router.get("/:shortId",getShortUrl)
router.get('/analytics/:shortId',getAnalytics)
module.exports = router;