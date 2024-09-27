// src/types/session.d.ts
import 'express-session'

declare module 'express-session' {
    interface SessionData {
        user: any // Adjust the type according to your `user` object structure
    }
}
