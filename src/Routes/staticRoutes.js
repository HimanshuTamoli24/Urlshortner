import express from 'express';
import { handleStaticRoutes, handleSignupRoutes, handleLoginRoutes } from '../controllers/staticroute.js';
const staticRouter = express.Router();
// Use the controller function for the route
staticRouter.get('/', handleStaticRoutes);

staticRouter.get('/signup', handleSignupRoutes);
staticRouter.get('/login', handleLoginRoutes);
export default staticRouter;
