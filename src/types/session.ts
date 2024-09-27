import { Session } from 'express-session'

export interface ISession extends Session {
    user: {
        UserName?: string
        Email?: string
    }
}
// src/types/session.d.ts
// import 'express-session'

// declare module 'express-session' {
//     interface SessionData {
//         user: {
//             name: string
//             email: string
//         }
//     }
// }
