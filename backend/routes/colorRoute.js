import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getColors, updateColors } from '../controllers/colorController.js';

const router = express.Router();

router.route('/').put(isAuthenticated, updateColors);
router.route('/').get(isAuthenticated, getColors);

export default router;