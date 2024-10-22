import { Router } from 'express'
import apiController from '../controller/apiController'
import upload from '../middleware/multer'
import auth from '../middleware/auth'
const router = Router()

router.route('/banner').post(upload('banners'), apiController.insertBanners)
router.route('/brand').post(upload('tractor/brand'), apiController.insertBrand)
router.route('/').post(auth, apiController.insertUser)
router.route('/').get(auth, apiController.getUsers)
router.route('/:id').get(auth, apiController.getUserbyID)
router.route('/:id').put(auth, apiController.updateUser)
router.route('/:id').delete(auth, apiController.deleteUser)

export default router
