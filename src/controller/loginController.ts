import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import User from '../model/user.Model'
import Login from '../model/login.Model'

export default {
    registerUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = new User(req.body)
            const loginData = new Login(req.body)
            const { email } = userData
            const userExist = await User.findOne({ email })
            if (userExist) {
                return httpResponse(req, res, 200, responseMessage.USER_EXIST, email)
            }
            await loginData.save()
            const saveUser = await userData.save()
            httpResponse(req, res, 200, responseMessage.USER_CREATED, saveUser)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    loginUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = new Login(req.body)
            const { email, password } = userData
            const userExist = await Login.findOne({ email })
            if (!userExist) {
                return httpError(next, responseMessage.NOT_FOUND, req, 404)
            }
            if (!userExist || password !== userExist.password) {
                return httpError(next, responseMessage.LOGIN_FAILED, req, 401)
            }
            const userInfo = await User.findOne({ email })
            req.session.user = userInfo
            httpResponse(req, res, 200, responseMessage.LOGIN_SUCCESS, userInfo)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    logoutUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.session.destroy((err) => {
                if (err) {
                    return httpError(next, err, req, 500)
                }
                res.clearCookie('connect.sid') // Clear the session cookie
                httpResponse(req, res, 200, responseMessage.LOGOUT)
            })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}
