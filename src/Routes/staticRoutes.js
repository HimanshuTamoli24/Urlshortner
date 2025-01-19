import express from 'express';
import { handleStaticRoutes } from '../controllers/url.js';
const staticRouter = express.Router();
// Use the controller function for the route
staticRouter.get('/', handleStaticRoutes);

export default staticRouter;
