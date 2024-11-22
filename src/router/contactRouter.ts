import { Router } from 'express'
import contactController from '../controller/contactController'
import auth from '../middleware/auth'
const router = Router()

router.route('/sellContact').post(auth, contactController.insertSellContact)

export default router
