import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
// import { ISession } from '../types/session'
import asyncHandler from 'express-async-handler'
import jwtToken from '../service/jwtService'
import userService from '../service/userService'
import { Login, Register } from '../model/UserM'
import { OAuth2Client } from 'google-auth-library'
import { GOOGLE_CLIENT_ID } from '../config/googleConfig'
import { generateOtp, storeOtp, verifyOtp } from '../service/otpService'
import { sendOtpSms } from '../service/smsService'
import { OtpModel } from '../model/otpM'
import { isNull } from 'util'
// import logger from '../util/logger'

interface GoogleLoginRequest extends Request {
    body: {
        token: string
    }
}
interface LoginRequestpassword extends Request {
    body: {
        phone_or_email: string
        password: string
    }
}
const client = new OAuth2Client(GOOGLE_CLIENT_ID)
export default {
    registerUser: asyncHandler(async (req: Request, res: Response) => {
        const { email, mobile, name, state, pincode } = new Register(req.body)
        const { password } = new Login(req.body)

        const userExist = await Register.findOne({ email })
        if (userExist) {
            return httpResponse(req, res, 200, responseMessage.USER_EXIST, email)
        }
        const hashedpassword = await userService.registerService(password ?? '')
        const loginData = {
            email: email,
            password: hashedpassword
        }
        const imagePath = req.file ? req.file.path : `https://res.cloudinary.com/farmconnects/image/upload/v1728409875/user_kzxegi.jpg`
        const userData = new Register({
            name,
            mobile,
            email,
            state,
            pincode,
            image: imagePath
        })
        await new Login(loginData).save()
        const saveUser = await new Register(userData).save()
        httpResponse(req, res, 200, responseMessage.USER_CREATED, saveUser)
    }),

    loginUser: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userData = new Login(req.body)
        const { email, password } = userData
        const userExist = await Login.findOne({ email })
        if (!userExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const isPasswordValid = await userService.comparePassword(password ?? '', userExist.password ?? '')
        if (!isPasswordValid) {
            return httpError(next, responseMessage.LOGIN_FAILED, req, 401)
        }
        const userInfo = await Register.findOne({ email })
        if (!userInfo) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }

        const token = jwtToken.generateToken({
            id: userInfo._id.toString(),
            loginid: userExist._id.toString(),
            email: userInfo.email ?? 'someone@example,com',
            name: userInfo.name ?? '',
            mobile: userInfo.mobile ?? ''
        })

        // if (req.session) {
        //     ;(req.session as ISession).user = {
        //         UserName: userInfo.name,
        //         Email: email
        //     }
        // } else {
        //     return httpError(next, 'Session not initialized', req, 500)
        // }
        const data = {
            _id: userInfo._id.toString(),
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.mobile,
            image: userInfo.image,
            token: token
        }
        httpResponse(req, res, 200, responseMessage.LOGIN_SUCCESS, data)
    }),
    loginUserwithpassword: asyncHandler(async (req: LoginRequestpassword, res: Response, next: NextFunction) => {
        const { phone_or_email, password } = req.body

        // logger.info('user', { meta: { email: phone_or_email, mobile: phone_or_email, password: password } })
        const userExist = await Login.findOne({
            $or: [{ email: phone_or_email }, { mobile: phone_or_email }]
        })
        // const { password } = userData
        // const userExist = await Login.findOne({ email })
        if (!userExist) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const isPasswordValid = await userService.comparePassword(password, userExist.password ?? '')

        if (!isPasswordValid) {
            return httpError(next, responseMessage.LOGIN_FAILED, req, 401)
        }
        const userInfo = await Register.findOne({
            $or: [{ email: phone_or_email }, { mobile: phone_or_email }]
        })
        // logger.info('user', { meta: { isPasswordValid } })
        if (!userInfo) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }

        const token = jwtToken.generateToken({
            id: userInfo._id.toString(),
            loginid: userExist._id.toString(),
            email: userInfo.email ?? 'someone@example,com',
            name: userInfo.name ?? '',
            mobile: userInfo.mobile ?? ''
        })

        // if (req.session) {
        //     ;(req.session as ISession).user = {
        //         UserName: userInfo.name,
        //         Email: email
        //     }
        // } else {
        //     return httpError(next, 'Session not initialized', req, 500)
        // }
        const data = {
            id: userInfo._id.toString(),
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.mobile,
            image: userInfo.image,
            token: token
        }
        httpResponse(req, res, 200, responseMessage.LOGIN_SUCCESS, data)
    }),
    googleLogin: asyncHandler(async (req: GoogleLoginRequest, res: Response) => {
        const { token } = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        })
        // logger.info('ticket', { meta: { ticket } })
        const payload = ticket.getPayload()
        // logger.info('payload', { meta: { payload } })

        if (!payload || !payload.email || !payload.name) {
            return httpResponse(req, res, 400, 'Email or name is missing from the token payload.')
        }
        const email = payload?.email ?? ''
        const name = payload?.name ?? ''
        const picture = payload?.picture
        const userExists = await Register.findOne({ email: email })
        const userExistsLogin = await Login.findOne({ email: email })
        // logger.info('userExists', { meta: { userExists } })
        let userId
        let loginid
        let mobile = ''
        if (!userExists) {
            const newUser = new Register({
                name: name,
                email: email,
                image: picture,
                mobile: null,
                pincode: null,
                state: null,
                district: null,
                sub_district: null,
                village: null
            })
            const login = new Login({
                email: email,
                mobile: null,
                password: null
            })
            await login.save()
            await newUser.save()
            loginid = login._id.toString()
            userId = newUser._id.toString()
        } else {
            loginid = userExistsLogin?._id?.toString() ?? ''
            userId = userExists._id.toString()
            mobile = userExists.mobile ?? ''
        }

        const jwttoken = jwtToken.generateToken({
            id: userId,
            loginid: loginid,
            email: email,
            name: name,
            mobile
        })
        const data = {
            id: userId,
            email: email,
            name: name,
            phone: mobile,
            image: picture,
            token: jwttoken
        }
        httpResponse(req, res, 200, responseMessage.LOGIN_SUCCESS, data)
    }),

    logoutUser: asyncHandler((req: Request, res: Response, next: NextFunction) => {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null

        if (!token) {
            return httpError(next, 'No token provided', req, 401)
        }

        req.session.destroy((err) => {
            if (err) {
                return httpError(next, err, req, 500)
            }

            // res.clearCookie('connect.sid') // Clear the session cookie
            // res.clearCookie(token) // Clear the token cookie
            httpResponse(req, res, 200, responseMessage.LOGOUT)
        })
    }),

    requestOtp: asyncHandler(async (req: Request, res: Response) => {
        const { phone } = new OtpModel(req.body)

        const otp = generateOtp()
        await storeOtp(phone, otp)
        await sendOtpSms(phone, otp)

        httpResponse(req, res, 200, 'OTP sent to your mobile number.')
    }),

    verifyOtpCode: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { phone, otp } = new OtpModel(req.body)
        // logger.info('phone', { meta: { phone, otp } })

        const isValid = await verifyOtp(phone, otp)
        if (!isValid) {
            return httpError(next, 'Invalid OTP', req, 500)
        }

        let user = await Register.findOne({ mobile: phone })
        let loginuser = await Login.findOne({ mobile: phone })
        if (!user) {
            const newUser = new Register({
                name: 'Your Name',
                email: 'someone@gmail.com',
                image: `https://res.cloudinary.com/farmconnects/image/upload/v1728409875/user_kzxegi.jpg`,
                mobile: phone,
                pincode: null,
                state: null,
                district: null,
                sub_district: null,
                village: null
            })

            const login = new Login({
                email: isNull,
                mobile: phone,
                password: null
            })

            await Promise.all([login.save(), newUser.save()])
            user = newUser
            loginuser = login
        }

        const jwttoken = jwtToken.generateToken({
            id: user._id.toString(),
            loginid: loginuser?._id.toString() ?? '',
            email: user.email || '',
            name: user.name || '',
            mobile: phone
        })

        const data = {
            id: user._id.toString(),
            email: user.email || '',
            name: user.name || '',
            phone,
            image: user.image || `https://res.cloudinary.com/farmconnects/image/upload/v1728409875/user_kzxegi.jpg`,
            token: jwttoken
        }

        httpResponse(req, res, 200, 'OTP verified successfully.', data)
    })
}
