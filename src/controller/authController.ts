import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import { ISession } from '../types/session'
import asyncHandler from 'express-async-handler'
import jwtToken from '../service/jwtService'
import userService from '../service/userService'
import { Login, Register } from '../model/UserM'
import { OAuth2Client } from 'google-auth-library'
import { GOOGLE_CLIENT_ID } from '../config/googleConfig'
interface GoogleLoginRequest extends Request {
    body: {
        token: string // Specify that token is a string
    }
}
const client = new OAuth2Client(GOOGLE_CLIENT_ID)
export default {
    registerUser: asyncHandler(async (req: Request, res: Response) => {
        const { email, mobile, name, city, pincode } = new Register(req.body)
        const { password } = new Login(req.body)

        const userExist = await Register.findOne({ email })
        if (userExist) {
            return httpResponse(req, res, 200, responseMessage.USER_EXIST, email)
        }
        const hashedpassword = await userService.registerService(password)
        const loginData = {
            email: email,
            password: hashedpassword
        }
        const imagePath = req.file ? req.file.path : `https://res.cloudinary.com/farmconnects/image/upload/v1728409875/user_kzxegi.jpg`
        const userData = new Register({
            name,
            mobile,
            email,
            city,
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
        const isPasswordValid = await userService.comparePassword(password, userExist.password)
        if (!isPasswordValid) {
            return httpError(next, responseMessage.LOGIN_FAILED, req, 401)
        }
        const userInfo = await Register.findOne({ email })
        if (!userInfo) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }

        // Now we know userInfo is not null
        const token = jwtToken.generateToken({
            id: userInfo._id.toString(),
            email: userInfo.email,
            name: userInfo.name,
            mobile: userInfo.mobile
        })

        if (req.session) {
            ;(req.session as ISession).user = {
                UserName: userInfo.name,
                Email: email
            }
        } else {
            return httpError(next, 'Session not initialized', req, 500)
        }
        const data = {
            id: userInfo._id.toString(),
            name: userInfo.name,
            email: userInfo.email,
            phone: userInfo.mobile,
            image: userInfo.image,
            points: 0,
            credit: 0,
            token: token
        }
        httpResponse(req, res, 200, responseMessage.LOGIN_SUCCESS, data)
    }),
    googleLogin: asyncHandler(async (req: GoogleLoginRequest, res: Response) => {
        const { token } = req.body
        // const { token }: { token: string } = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()
        if (!payload || !payload.email || !payload.name) {
            return httpResponse(req, res, 400, 'Email or name is missing from the token payload.')
        }
        const email = payload?.email ?? ''
        const name = payload?.name ?? ''
        const picture = payload?.picture
        const userExists = await Register.findOne({ email: email })
        let userId
        let mobile = ''
        if (!userExists) {
            const newUser = new Register({
                name: name,
                email: email,
                image: picture,
                mobile: 8815225624,
                pincode: 470335,
                city: 'null'
            })

            await newUser.save()
            userId = newUser._id.toString()
        } else {
            userId = userExists._id.toString()
            mobile = userExists.mobile
        }

        // Generate a JWT token
        const jwttoken = jwtToken.generateToken({
            id: userId,
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
            points: 0,
            credit: 0,
            token: jwttoken
        }
        httpResponse(req, res, 200, responseMessage.LOGIN_SUCCESS, data)
    }),

    logoutUser: asyncHandler((req: Request, res: Response, next: NextFunction) => {
        const authorizationHeader = req.headers.authorization

        // Check if the authorization header exists and contains the token
        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null

        if (!token) {
            return httpError(next, 'No token provided', req, 401) // Return error if token is not provided
        }

        req.session.destroy((err) => {
            if (err) {
                return httpError(next, err, req, 500)
            }

            // res.clearCookie('connect.sid') // Clear the session cookie
            // res.clearCookie(token) // Clear the token cookie
            httpResponse(req, res, 200, responseMessage.LOGOUT)
        })
    })
}
