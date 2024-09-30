import { Router } from 'express'
import authController from '../controller/authController'
import upload from '../middleware/multer'
const router = Router()

router.route('/register').post(upload, authController.registerUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
export default router
