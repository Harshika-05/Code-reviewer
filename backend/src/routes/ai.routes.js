import express from 'express';
import getReview from '../contollers/ai.controller.js';
const router = express.Router();

router.post('/get-review', getReview);

export default router;