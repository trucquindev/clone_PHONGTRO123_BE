import * as services from "../services/area";

export const getAreas = async (req, res) => {
  try {
    const response = await services.getAllAreaServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "fail at area controller" + error,
    });
  }
};
