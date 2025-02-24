import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { addReport, getReport } from '../controllers/reportController.js';

const router = express.Router();

router.route('/').post(isAuthenticated, addReport);
router.route('/').get(isAuthenticated, getReport);

export default router;