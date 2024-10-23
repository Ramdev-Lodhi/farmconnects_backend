import { Router } from 'express'
import authController from '../controller/authController'
import passport from 'passport'
const router = Router()

router.route('/register').post(authController.registerUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
// Google Authentication
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Google Callback
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.get('/google/callback', passport.authenticate('google', { session: false }), authController.googleLogin)

export default router
