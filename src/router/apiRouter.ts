import { Router } from 'express'
import apiController from '../controller/apiController'

const router = Router()

router.route('/').post(apiController.insertUser)
router.route('/').get(apiController.getUsers)
router.route('/:id').get(apiController.getUserbyID)
router.route('/:id').put(apiController.updateUser)
router.route('/:id').delete(apiController.deleteUser)

export default router
