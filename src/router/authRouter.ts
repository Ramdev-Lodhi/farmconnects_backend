import { Router } from 'express'
import authController from '../controller/authController'

const router = Router()

router.route('/register').post(authController.registerUser)
router.route('/login').post(authController.loginUser)
router.route('/loginpassword').post(authController.loginUserwithpassword)
router.route('/logout').get(authController.logoutUser)

// Google login route
router.route('/google').post(authController.googleLogin)
// OTP Login
router.route('/send-otp').post(authController.requestOtp)
router.route('/verify-otp').post(authController.verifyOtpCode)

export default router
