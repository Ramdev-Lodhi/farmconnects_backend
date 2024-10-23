import { Router } from 'express'
import homeController from '../controller/homeController'
import auth from '../middleware/auth'
const router = Router()

router.route('/').get(auth, homeController.getHome)

export default router
