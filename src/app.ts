import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/index'
import globalErrorHandler from './middleware/globalErrorHandler'

import responseMessage from './constant/responseMessage'
import httpError from './util/httpError'
import helmet from 'helmet'
import cors from 'cors'
import session from './middleware/session'

const app: Application = express()

//middleware
app.use(helmet())
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION', 'HEAD'],
        origin: ['https://client.com'],
        credentials: true
    })
)

app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(session)
// app.use(
//     session({
//         secret: 'ram_', // Replace with your actual secret key
//         resave: false, // Avoid resaving unmodified sessions
//         saveUninitialized: true, // Save uninitialized sessions to ensure a session is created
//         cookie: {
//             secure: false, // Set to true if using HTTPS in production
//             maxAge: 60000 // Set the cookie's lifetime (e.g., 1 minute)
//         }
//     })
// )
// app.use((req: Request, _: Response, next: NextFunction) => {
//     const name = 'Ramdev'
//     if (req.session) {
//         ;(req.session as ISession).UserName = name
//         logger.info((req.session as ISession).UserName)
//     } else {
//         return httpError(next, 'Session not initialized', req, 500)
//     }
//     next()
// })

//Routers

app.use('/api', router)

app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

app.use(globalErrorHandler)

export default app
