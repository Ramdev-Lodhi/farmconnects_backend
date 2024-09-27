import Session from 'express-session'

export default Session({
    secret: 'Ram_',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 6000000 }
})
