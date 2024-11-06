import { NextFunction, Request, Response } from 'express'
import { THttpError } from '../types/types'

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export default (err: THttpError, _: Request, res: Response, __: NextFunction) => {
//     res.status(err.statusCode).json(err)
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err: THttpError, _: Request, res: Response, __: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    const response = {
        status: false,
        message: err.message || 'An unexpected error occurred',
        trace: err.trace || 'No trace available',
        error: {
            ...err
        }
    }
    res.status(statusCode).json(response)
}

export default globalErrorHandler
