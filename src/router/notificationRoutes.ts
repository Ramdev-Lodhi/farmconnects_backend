import express from 'express'
import NotificationController from '../controller/notificationController'

const router = express.Router()

router.route('/send-notification').post(NotificationController.sendNotification)
router.route('/send-contact-notification').post(NotificationController.sendContactNotification)
export default router
