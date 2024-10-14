import express from 'express';
import * as controllers from '../controllers/area'
const router = express.Router();

router.get('/all', controllers.getAreas)
// router.get('/limit', controllers.getPostsLimit)
export default router
