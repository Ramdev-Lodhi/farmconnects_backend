import { Router } from 'express'
import loginController from '../controller/loginController'

const router = Router()

router.route('/register').post(loginController.registerUser)

router.route('/login').post(loginController.loginUser)
router.route('/logout').get(loginController.logoutUser)
export default router
