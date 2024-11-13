import { Router } from 'express'
import apiController from '../controller/apiController'
import upload from '../middleware/multer'
import auth from '../middleware/auth'
import adminController from '../controller/adminController'
const router = Router()

router.route('/banner').post(upload('banners'), adminController.insertBanners)
router.route('/brand').post(upload('tractor/brand'), adminController.insertBrand)
router.route('/tractors').post(upload('tractor/tractor'), adminController.insertTractors)
router.route('/service').post(adminController.insertService)
router.route('/').post(auth, apiController.insertUser)
router.route('/').get(auth, apiController.getUsers)
router.route('/:id').get(auth, apiController.getUserbyID)
router.route('/:id').put(auth, apiController.updateUser)
router.route('/:id').delete(auth, apiController.deleteUser)

export default router
