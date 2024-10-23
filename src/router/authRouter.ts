import { Router } from 'express'
import authController from '../controller/authController'
import { googleLogin } from '../controller/googleController'
import passport from '../service/googleAuthService'
const router = Router()

router.route('/register').post(authController.registerUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
// Google Authentication
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.route('/google1').get(passport.authenticate('google', { scope: ['profile', 'email'] }))

// Google Callback
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.route('/google/callback').get(passport.authenticate('google', { session: false }), authController.googleLogin)

// Google login route
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.route('/google').post(googleLogin)
export default router
