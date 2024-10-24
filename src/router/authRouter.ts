import { Router } from 'express'
import authController from '../controller/authController'

const router = Router()

router.route('/register').post(authController.registerUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)

// Google login route
router.route('/google').post(authController.googleLogin)
export default router
