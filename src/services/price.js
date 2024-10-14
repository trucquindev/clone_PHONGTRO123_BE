import db from "../models";

export const getAllPriceServices = () =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Price.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "ok" : "failed to get price",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
