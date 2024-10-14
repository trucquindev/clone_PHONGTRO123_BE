import express from "express";
import * as controllers from "../controllers/Post";
import veryfyToken from "../middlewares/verifyToken";
const router = express.Router();

router.get("/all", controllers.getPosts);
router.get("/limit", controllers.getPostsLimit);
router.get("/newpost", controllers.getNewPosts);
router.get("/post-detail", controllers.getPostDetail);

router.use(veryfyToken);
router.post("/create-newpost", controllers.createNewPost);
router.get("/getPostById", controllers.getPostsById);
router.put("/updatePost", controllers.updatePost);
router.delete("/deletePost", controllers.deletePost);
export default router;
