import crypto from 'crypto'
import { OtpModel } from '../model/otpM'
import logger from '../util/logger'
import twilio from 'twilio'
import config from '../config/config'
export const generateOtp = (): string => {
    return crypto.randomInt(100000, 999999).toString()
}

export const storeOtp = async (phone: string, otp: string) => {
    try {
        const otpRecord = new OtpModel({ phone, otp })
        await otpRecord.save()
        // logger.info('success', {
        //     meta: {
        //         message: `OTP stored successfully`
        //     }
        // })
    } catch (error) {
        logger.info('Error', {
            meta: {
                message: 'Error sending OTP:',
                error
            }
        })
    }
}

export const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
    try {
        const otpRecord = await OtpModel.findOne({ phone, otp })
        if (otpRecord) {
            // logger.info('success', {
            //     meta: {
            //         message: `OTP verified successfully`
            //     }
            // })
            return true
        } else {
            // logger.info('Error', {
            //     meta: {
            //         message: 'nvalid or expired OTP'
            //     }
            // })
            return false
        }
    } catch (error) {
        logger.info('Error', {
            meta: {
                message: 'Error verifying OTP:',
                error
            }
        })
        return false
    }
}

const twilioClient = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)
export const verifyOtpWithTwilio = async (phone: string, code: string): Promise<boolean> => {
    try {
        logger.info('Verifying OTP', {
            meta: {
                phone,
                code
            }
        })
        const verificationCheck = await twilioClient.verify.v2
            .services('VA0ded7474d6a461cddd9294ff6254d5b0')
            .verificationChecks.create({ to: phone, code: code })

        if (verificationCheck.status === 'approved') {
            logger.info('success', {
                meta: {
                    message: `OTP verified successfully`
                }
            })
            return true
        } else {
            logger.info('Error', {
                meta: {
                    message: 'Invalid or expired OTP'
                }
            })
            return false
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            // If the error is an instance of Error, you can safely access message
            logger.info('Error', {
                meta: {
                    message: 'Error verifying OTP:',
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                    code: (error as any).code // Cast to 'any' to access 'code'
                }
            })
        } else {
            // Handle case where the error is not an instance of Error
            logger.info('Error', {
                meta: {
                    message: 'An unknown error occurred',
                    error // Log the unknown error for further inspection
                }
            })
        }
        return false
    }
}
