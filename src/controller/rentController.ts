import { NextFunction, Request, Response } from 'express'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import expressAsyncHandler from 'express-async-handler'
import { Rent } from '../model/RentM'
import httpError from '../util/httpError'
import { Register } from '../model/UserM'
import logger from '../util/logger'
interface User {
    id: string
    loginid: string
}
export default {
    InsertRentItem: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const RentData = new Rent(req.body)
        const data = req.user as User | undefined
        logger.info('TokenData', {
            meta: {
                id: data ? data.id : '',
                Rentdata: RentData
            }
        })

        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userData = await Register.findById({ _id: data.id })
        RentData.userId = userData ? userData._id : null
        RentData.image = req.file ? req.file.path : ''
        const savedata = await RentData.save()

        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    }),
    getRentItem: expressAsyncHandler(async (req: Request, res: Response) => {
        const { address } = new Rent(req.body)
        if (!address || !address.pincode) {
            return httpResponse(req, res, 400, 'Pincode is required.')
        }

        const { pincode } = address
        const rentData = await Rent.find({ 'address.pincode': pincode })
        const data = {
            RentData: rentData
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    }),
    getRentItemByUserID: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const Tokendata = req.user as User | undefined
        if (!Tokendata) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const rentData = await Rent.find({ userId: Tokendata.id })
        const data = {
            RentData: rentData
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    })
}
