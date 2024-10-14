import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as userController from "../controllers/user";
const router = express.Router();

router.use(verifyToken);
router.get("/get-current-user", userController.getCurrentUser);
router.put("/", userController.updateUser);
router.put("/password", userController.updatePasswordUser);

export default router;
