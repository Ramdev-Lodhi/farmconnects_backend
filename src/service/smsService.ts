import twilio from 'twilio'
import dotenv from 'dotenv'
import logger from '../util/logger'
import config from '../config/config'

dotenv.config()

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)

export const sendOtpSms = async (phoneNumber: string, otp: string) => {
    const appName = 'Farm Connects'
    try {
        const message = await client.messages.create({
            body: `${appName}: Your OTP code is ${otp}. Please enter it to verify your account.`,
            from: config.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        })

        logger.info('OTP Sent', {
            meta: {
                message: `OTP sent to ${phoneNumber}: ${message.sid}`
            }
        })
        return { success: true, sid: message.sid }
    } catch (error) {
        logger.info('Error sending', {
            meta: {
                message: 'Error sending OTP SMS:',
                error
            }
        })
        return { success: false, error }
    }
}
