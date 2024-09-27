import { NextFunction, Request, Response } from 'express'
import responseMessage from '../constant/responseMessage'
import httpError from '../util/httpError'

module.exports = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session) {
        return next()
    } else {
        httpError(next, responseMessage.USER_NOT_ATHURIZED, req, 401)
    }
}
