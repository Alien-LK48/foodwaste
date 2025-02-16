import express from 'express'
import userAuth from '../middlewares/userAuth.js'
import { getuserdata } from '../controllers/userController.js'


export const userRouter = express.Router()

userRouter.get('/data', userAuth, getuserdata)