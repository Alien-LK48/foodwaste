import { collectFood } from "../controllers/ngoController.js"
import express from 'express'
import userAuth from '../middlewares/userAuth.js'
export const ngoRouter = express.Router()

ngoRouter.post('/collectfood', userAuth, collectFood)