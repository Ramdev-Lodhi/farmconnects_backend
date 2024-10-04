import { Router } from 'express'
import apiController from '../controller/apiController'
import verify from '../middleware/verify'
import auth from '../middleware/auth'
const router = Router()

router.route('/').post(auth, apiController.insertUser)
router.route('/').get(auth, apiController.getUsers)
router.route('/:id').get(verify, apiController.getUserbyID)
router.route('/:id').put(verify, apiController.updateUser)
router.route('/:id').delete(auth, apiController.deleteUser)

export default router
