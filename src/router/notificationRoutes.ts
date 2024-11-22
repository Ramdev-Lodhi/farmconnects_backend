import express from 'express'
import NotificationController from '../controller/notificationController'

const router = express.Router()

router.post('/send-notification', NotificationController.sendNotification)

export default router
