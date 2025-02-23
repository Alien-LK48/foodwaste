import express from 'express'

import userAuth from '../middlewares/userAuth.js'
import { allaccounts, allngos, banAccount, collectFood, foodData, totalcount, UnbanAccount } from '../controllers/adminController.js'
import isAdmin from '../middlewares/iaAdmin.js'
export const adminRouter = express.Router()

adminRouter.post('/collectfood', isAdmin, collectFood)
adminRouter.get('/foodData', userAuth, foodData)
adminRouter.get('/countData', userAuth, totalcount)
adminRouter.get('/allaccounts', userAuth, allaccounts)
adminRouter.get('/allngos', userAuth, allngos)
adminRouter.post('/banAccount', userAuth, isAdmin, banAccount)
adminRouter.post('/UnbanAccount', userAuth, isAdmin, UnbanAccount)
