import * as services from "../services/user";

export const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  console.log(req.user);

  try {
    const response = await services.getOneUserService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at user controller" + error,
    });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;

  try {
    if (!payload) {
      return res.status(400).json({
        err: -1,
        message: "missing input update user",
      });
    }
    const response = await services.updateUser(payload, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at user controller" + error,
    });
  }
};
export const updatePasswordUser = async (req, res) => {
  const { id } = req.user;
  const { password, newPassword } = req.body;

  try {
    if (!password || !newPassword) {
      return res.status(400).json({
        err: -1,
        message: "missing input update user",
      });
    }
    const response = await services.updatePassWordUser(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at user controller" + error,
    });
  }
};
