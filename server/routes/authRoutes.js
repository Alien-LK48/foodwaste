import express from 'express'
import { isAuthed, login, logout, register, resetpassword, sendResetOTP, sendVerifyOTP, verifyEmail } from '../controllers/authContoller.js'
import userAuth from '../middlewares/userAuth.js'
import isBanned from '../middlewares/isbanned.js'

export const authRouter = express.Router()
// http://localhost:3000/api/auth
authRouter.post('/register', register)
authRouter.post('/login', isBanned, login)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', userAuth, sendVerifyOTP)
authRouter.post('/verify-account', userAuth, verifyEmail)
authRouter.get('/is-authed', userAuth, isAuthed)
authRouter.post('/send-rest-otp', sendResetOTP)
authRouter.post('/rest-password', resetpassword)