import { NextFunction, Request, Response } from 'express'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'
import expressAsyncHandler from 'express-async-handler'
import { ISession } from '../types/session'

export default expressAsyncHandler((req: Request, _: Response, next: NextFunction) => {
    if (req.session && (req.session as ISession).user) {
        return next()
    } else {
        httpError(next, responseMessage.USER_NOT_ATHURIZED('Login'), req, 401)
    }
})
