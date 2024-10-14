import express from 'express';
import * as controllers from '../controllers/Category'
const router = express.Router();

router.get('/all', controllers.getCategories)
export default router