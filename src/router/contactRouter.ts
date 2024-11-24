import { Router } from 'express'
import contactController from '../controller/contactController'
import auth from '../middleware/auth'
const router = Router()

router.route('/sellContact').post(auth, contactController.insertSellContact)
router.route('/getsellContact').get(auth, contactController.getSellenquiry)
router.route('/rentContact').post(auth, contactController.insertRentContact)
router.route('/getrentContact').get(auth, contactController.getRentenquiry)
router.route('/buyContact').post(auth, contactController.insertBuyContact)
router.route('/getbuyContact').get(auth, contactController.getBuyenquiry)

export default router
