import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import User from '../model/user.Model'
import Login from '../model/login.Model'
import { ISession } from '../types/session'
import logger from '../util/logger'
import asyncHandler from 'express-async-handler'
import jwtUtils from '../service/jwt'

export default {
    registerUser: asyncHandler(async (req: Request, res: Response) => {
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
    }),

    loginUser: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
        if (!userInfo) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }

        // Now we know userInfo is not null
        const token = jwtUtils.generateToken({
            id: userInfo._id.toString(),
            email: userInfo.email,
            name: userInfo.name || ''
        })

        const name = 'Ramdev'
        if (req.session) {
            ;(req.session as ISession).user = {
                UserName: name,
                Email: email
            }
        } else {
            logger.info(email)
            return httpError(next, 'Session not initialized', req, 500)
        }
        logger.info('USER DATA', {
            meta: {
                USERDATA: (req.session as ISession).user
            }
        })

        httpResponse(req, res, 200, responseMessage.LOGIN_SUCCESS, { userInfo, token })
    }),

    logoutUser: asyncHandler((req: Request, res: Response, next: NextFunction) => {
        req.session.destroy((err) => {
            if (err) {
                return httpError(next, err, req, 500)
            }
            res.clearCookie('connect.sid') // Clear the session cookie
            httpResponse(req, res, 200, responseMessage.LOGOUT)
        })
    })
}
