import { Router } from 'express'
import apiController from '../controller/apiController'

import auth from '../middleware/auth'
const router = Router()

router.route('/').post(auth, apiController.insertUser)
router.route('/').get(auth, apiController.getUsers)
router.route('/:id').get(auth, apiController.getUserbyID)
router.route('/:id').put(auth, apiController.updateUser)
router.route('/:id').delete(auth, apiController.deleteUser)

export default router
