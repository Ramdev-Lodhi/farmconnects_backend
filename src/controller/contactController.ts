import { NextFunction, Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import httpError from '../util/httpError'
import httpResponse from '../util/httpResponse'
import responseMessage from '../constant/responseMessage'
import { SellContact } from '../model/Sell_contact_enquiryM'
import { Register } from '../model/UserM'
import { rentContact } from '../model/rent_contact_enquiryM'
import { BuyContact } from '../model/Buy_contact_enquiry'
interface User {
    id: string
    loginid: string
}
export default {
    insertSellContact: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const sellTractorData = new SellContact(req.body)
        const data = req.user as User | undefined
        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userData = await Register.findById({ _id: data.id })
        sellTractorData.userId = userData ? userData._id : null
        const savedata = await sellTractorData.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    }),
    getSellenquiry: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userdata = req.user as User | undefined
        if (!userdata) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const sellEnquirydata = await SellContact.find({ 'sellerInfo.sellerID': userdata.id })
        const data = {
            sellenquiry: sellEnquirydata
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    }),

    insertRentContact: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const rentData = new rentContact(req.body)
        const data = req.user as User | undefined
        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userData = await Register.findById({ _id: data.id })
        rentData.userId = userData ? userData._id : null
        const savedata = await rentData.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    }),

    getRentenquiry: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userdata = req.user as User | undefined
        if (!userdata) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const rentEnquirydata = await rentContact.find({ 'renterInfo.renterID': userdata.id })
        const rentRequestEnquirydata = await rentContact.find({ userId: userdata.id })
        const data = {
            rentenquiry: rentEnquirydata,
            rentRequestEnquirydata: rentRequestEnquirydata
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    }),
    insertBuyContact: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const buyData = new BuyContact(req.body)
        const data = req.user as User | undefined
        if (!data) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const userData = await Register.findById({ _id: data.id })
        buyData.userId = userData ? userData._id : null
        const savedata = await buyData.save()
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, savedata)
    }),

    getBuyenquiry: expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const userdata = req.user as User | undefined
        if (!userdata) {
            return httpError(next, responseMessage.NOT_FOUND, req, 404)
        }
        const buyEnquirydata = await BuyContact.find({ userId: userdata.id })
        const data = {
            buyenquiry: buyEnquirydata
        }
        httpResponse(req, res, 200, responseMessage.USERS_FETCHED, data)
    })
}
