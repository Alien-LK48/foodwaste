import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { getuserdata, donateFood, alldonetedfoods, deleteFood, receivefood, sellfood, getsellfoodsbyid, editmysell, deletepost } from '../controllers/userController.js';
import isbanned from '../middlewares/isbanned.js';

// /api/user/.....
export const userRouter = express.Router();

userRouter.get('/data', userAuth, getuserdata);
userRouter.post('/donateFood', userAuth, donateFood);
userRouter.post('/sellFood', userAuth, sellfood);
userRouter.get('/alldonateFoods', userAuth, alldonetedfoods);
userRouter.delete('/deleteFood/:foodId', userAuth, deleteFood);
userRouter.put('/receivefood', userAuth, receivefood);
userRouter.get('/sellFood/:id', getsellfoodsbyid);
userRouter.put('/sellFood/:id', editmysell);
userRouter.delete('/deletepost', deletepost);

