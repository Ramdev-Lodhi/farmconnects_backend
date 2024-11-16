import { Router } from 'express'
import sellController from '../controller/sellController'
import auth from '../middleware/auth'
import upload from '../middleware/multer'
const router = Router()

router.route('/').get(auth, sellController.getBrand)
router.route('/modelname').post(auth, sellController.getModel)
router.route('/selltractor').post(auth, upload('sell/tractors'), sellController.insertselltractor)
router.route('/getSelltractor').get(auth, sellController.getSelltractor)

export default router
