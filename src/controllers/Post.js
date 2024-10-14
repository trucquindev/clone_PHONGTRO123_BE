import * as services from "../services/Post";

export const getPosts = async (req, res) => {
  try {
    const response = await services.getAllPostServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at post controller" + error,
    });
  }
};
export const getPostsLimit = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;
  try {
    const response = await services.getAllPostLimitServices(page, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at post limit controller" + error,
    });
  }
};
export const getNewPosts = async (req, res) => {
  try {
    const response = await services.getNewPostLimitServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at post limit controller" + error,
    });
  }
};
export const createNewPost = async (req, res) => {
  try {
    const { priceNumber, areaNumber, categoryCode, title, label } = req.body;
    const { id } = req.user;
    if (
      !priceNumber ||
      !categoryCode ||
      !title ||
      !label ||
      !areaNumber ||
      !id
    ) {
      return res.status(400).json({
        err: -1,
        message: "missing input create post",
      });
    }
    const response = await services.createPostServices(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at post limit controller" + error,
    });
  }
};

export const getPostsById = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req?.user;
  try {
    if (!id)
      return res.status(400).json({
        err: -1,
        msg: "missing input",
      });
    const response = await services.getAllPostByIdServices(page, query, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at post limit controller" + error,
    });
  }
};

export const updatePost = async (req, res) => {
  const { postId, imagesId, overviewId, attributesId } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !id || !imagesId || !attributesId || !overviewId)
      return res.status(400).json({
        err: -1,
        msg: "missing input",
      });
    const response = await services.UpdatePost(
      postId,
      imagesId,
      overviewId,
      attributesId,
      req.body
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail to update post controller" + error,
    });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.query;
  const { id } = req.user;
  try {
    if (!postId || !id) {
      return res.status(400).json({
        err: -1,
        msg: "missing input",
      });
    }
    const response = await services.deletePost(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail to delete post controller" + error,
    });
  }
};

export const getPostDetail = async (req, res) => {
  const { postId } = req.query;
  try {
    const response = await services.getPostDetailServices(postId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at post controller" + error,
    });
  }
};
