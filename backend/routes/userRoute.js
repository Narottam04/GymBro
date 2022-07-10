const express = require('express')
const asyncHandler = require('express-async-handler')
const { registerUser, loginUser, getMe, confirmUserToken, forgotPassword,  viewPasswordResetPage, resetPassword } = require('../controllers/userControllers')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/',registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe)
router.get('/confirmation/:token', confirmUserToken)
router.post('/forgotPassword', forgotPassword)
router.route('/passwordReset/:id/:token').get(viewPasswordResetPage).post(resetPassword)

module.exports = router