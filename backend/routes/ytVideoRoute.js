const express = require('express')
const { getYtVideo } = require('../controllers/ytVideoControllers')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/',protect, getYtVideo)


module.exports = router