import session from 'express-session'

export default session({
    secret: 'Ram_',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 }
})
