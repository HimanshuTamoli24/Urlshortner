import { handleUrl } from '../controllers/url.js';
import express from 'express';

const router = express.Router();  // Create a new router instance

router.post('/', handleUrl);  // Define the route

export default router;
