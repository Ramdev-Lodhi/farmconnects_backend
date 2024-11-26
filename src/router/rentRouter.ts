import { Router } from 'express'
import rentController from '../controller/rentController'
import auth from '../middleware/auth'
import upload from '../middleware/multer'
const router = Router()

router.route('/rentItem').post(auth, upload('rent'), rentController.InsertRentItem)
router.route('/rentServiceRequest/:id').put(auth, rentController.UpdateserviceRequests)
router.route('/getrentItem').post(auth, rentController.getRentItem)
router.route('/getRentAllservices').get(auth, rentController.getRentAllservices)
router.route('/getrentItemByUserId').get(auth, rentController.getRentItemByUserID)

export default router
