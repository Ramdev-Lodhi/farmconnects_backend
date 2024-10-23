import passport from 'passport'
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import config from '../config/config'

passport.use(
    new GoogleStrategy(
        {
            clientID: config.clientID!,
            clientSecret: config.clientSecret!,
            callbackURL: config.callbackURL!,
            passReqToCallback: true
        },
        (_req: unknown, _accessToken: unknown, _refreshToken: unknown, _params: unknown, profile: Profile, done: VerifyCallback) => {
            try {
                const email = profile.emails?.[0]?.value
                if (!email) {
                    return done(new Error('No email found for this profile.'))
                }

                const token = jwt.sign({ id: profile.id, email }, process.env.JWT_SECRET as string, { expiresIn: '24h' })
                done(null, { user: profile, token })
            } catch (err) {
                done(err)
            }
        }
    )
)

passport.serializeUser((user: unknown, done: (err: unknown, id?: unknown) => void) => {
    done(null, user)
})

passport.deserializeUser((user: unknown, done: (err: unknown, user?: unknown) => void) => {
    done(null, user)
})

export default passport
