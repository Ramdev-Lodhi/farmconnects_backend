/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { Request, Response } from 'express'
import { THttpResponse } from '../types/types'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'

import logger from './logger'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        status: true,
        // statusCode: responseStatusCode || 200,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }

    logger.info('Controller Response', {
        meta: response
    })

    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }

    res.status(responseStatusCode).json(response)
}
