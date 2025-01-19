import express from 'express';
import { handleUserLogin, handleUserSignup } from "../controllers/user.js"
const userRouter = express.Router();

// User signup route
userRouter.post('/', handleUserSignup);
userRouter.post('/login', handleUserLogin);
export default userRouter;
