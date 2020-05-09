const authRouter = require('express').Router();
const {signup, signin, OAuth, signout, isOldUser} = require('../controllers/auth')

authRouter.post('/signup', signup)

authRouter.post('/signin', signin)

authRouter.post('/OAuth', OAuth)

authRouter.get('/signout', signout)

authRouter.get('/isOldUser/:email', isOldUser)

module.exports = authRouter