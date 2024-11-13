import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import expressAsyncHandler from 'express-async-handler'
import { Rent } from '../model/RentM'
import httpError from '../util/httpError'
import { Register } from '../model/UserM'
interface User {
    id: string
    loginid: string
}
export default {
    InsertRentItem: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const RentData = new Rent(req.body)
        const data = req.user as User | undefined
        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userData = await Register.findById({ _id: data.id })
        RentData.userId = userData ? userData._id : null
        RentData.image = req.file ? req.file.path : ''
        const savedata = await RentData.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    })
}
