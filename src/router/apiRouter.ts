import { Router } from 'express'
import apiController from '../controller/apiController'
import upload from '../middleware/multer'
import auth from '../middleware/auth'
const router = Router()

router.route('/image/:id').put(auth, upload('users'), apiController.updateImage)
router.route('/').post(auth, apiController.insertUser)
router.route('/home').get(auth, apiController.getHome)
router.route('/:id').get(auth, apiController.getUserbyID)
router.route('/:id').put(auth, apiController.updateUser)
router.route('/:id').delete(auth, apiController.deleteUser)
router.route('/:id').put(auth, apiController.updateUser)

export default router
