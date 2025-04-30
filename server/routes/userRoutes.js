import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { getuserdata, donateFood, alldonetedfoods, deleteFood, receivefood, sellfood, getsellfoodsbyid, editmysell, deletepost, foodsellpost, postComment, getcomments, getcommentsbyid, getchats, getChatUsers } from '../controllers/userController.js';
import isbanned from '../middlewares/isbanned.js';
import { uploadFood } from '../middlewares/uploadfile.js';

// /api/user/.....
export const userRouter = express.Router();

userRouter.get('/data', userAuth, getuserdata);
userRouter.post('/donateFood', userAuth, donateFood);
userRouter.post('/sellFood', userAuth, uploadFood.single("demoimg"), sellfood);
userRouter.get('/alldonateFoods', userAuth, alldonetedfoods);
userRouter.delete('/deleteFood/:foodId', userAuth, deleteFood);
userRouter.put('/receivefood', userAuth, receivefood);
userRouter.get('/sellFood/:id', getsellfoodsbyid);
userRouter.put('/sellFood/:id', editmysell);
userRouter.delete('/deletepost', deletepost);
userRouter.get('/foodsellpost', foodsellpost);
userRouter.post('/postacomment', postComment);
userRouter.get('/getcomments', getcomments);
userRouter.get('/getcommentsbyid/:id', getcommentsbyid);
userRouter.get('/getMessages/:userId', getchats);
userRouter.get('/getChatUsers/:userId', getChatUsers);