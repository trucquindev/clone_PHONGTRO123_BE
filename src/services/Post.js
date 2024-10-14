import { where } from "sequelize";
import db from "../models";
const { Op } = require("sequelize");
import { v4 as generateId } from "uuid";
import generateCode from "../ultis/generateCode";
import moment from "moment";
import generateDate from "../ultis/generateData";
export const getAllPostServices = () =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "ok" : "failed to get Post",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllPostLimitServices = (
  page,
  query,
  { priceNumber, areaNumber }
) =>
  new Promise(async (reslove, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      let queries = { ...query };
      if (priceNumber) queries.priceNumber = { [Op.between]: priceNumber };
      if (areaNumber) queries.areaNumber = { [Op.between]: areaNumber };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "ok" : "failed to get Post",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNewPostLimitServices = () =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "createdAt",
        ],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "ok" : "failed to get Post",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const createPostServices = (body, userId) =>
  new Promise(async (reslove, reject) => {
    try {
      let attributesId = generateId();
      let overviewId = generateId();
      let imagesId = generateId();
      let labelCode = generateCode(body.label);
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const currentDate = generateDate();
      await db.Post.create({
        id: generateId(),
        title: body.title || null,
        labelCode,
        address: body.address || null,
        attributesId,
        categoryCode: body.categoryCode,
        description: JSON.stringify(body.description) || null,
        userId,
        overviewId,
        imagesId,
        areaCode: body.areaCode || null,
        priceCode: body.priceCode || null,
        provinceCode: body?.province?.includes("Thành phố")
          ? generateCode(body?.province?.replace("Thành phố ", ""))
          : generateCode(body?.province?.replace("Tỉnh ", "")) || null,
        priceNumber: body.priceNumber,
        areaNumber: body.areaNumber,
      });
      await db.Attribute.create({
        id: attributesId,
        price:
          +body.priceNumber < 1
            ? `${body.priceNumber * 1000000} đồng/tháng`
            : `${body.priceNumber} triệu/tháng`,
        acreage: `${body.areaNumber} m2`,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag,
      });
      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body.images),
      });
      await db.Overview.create({
        id: overviewId,
        code: hashtag,
        area: body.label,
        type: body.category || null,
        target: body.target || null,
        bonus: "tin thường",
        created: currentDate.today,
        expire: currentDate.expireDay,
      });
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });
      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: body?.label,
        },
      });
      reslove({
        err: 0,
        msg: "ok",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllPostByIdServices = (page, query, id) =>
  new Promise(async (reslove, reject) => {
    try {
      let offset = !page || +page <= 1 ? 0 : +page - 1;
      let queries = { userId: id, ...query };
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        nest: true,
        offset: offset * +process.env.LIMIT,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
          { model: db.Overview, as: "overviews" },
        ],
        // attributes: ["id", "title", "star", "address", "description"],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "ok" : "failed to get Post",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const UpdatePost = (postId, imagesId, overviewId, attributesId, body) =>
  new Promise(async (resolve, reject) => {
    try {
      let labelCode = generateCode(body?.label);
      await db.Post.update(
        {
          title: body.title || null,
          labelCode,
          address: body.address || null,
          categoryCode: body.categoryCode,
          description: JSON.stringify(body.description) || null,
          areaCode: body.areaCode || null,
          priceCode: body.priceCode || null,
          provinceCode: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")) || null,
          priceNumber: body.priceNumber,
          areaNumber: body.areaNumber,
        },
        {
          where: { id: postId },
        }
      );
      await db.Attribute.update(
        {
          price:
            +body.priceNumber < 1
              ? `${body.priceNumber * 1000000} đồng/tháng`
              : `${body.priceNumber} triệu/tháng`,
          acreage: `${body.areaNumber} m2`,
        },
        {
          where: {
            id: attributesId,
          },
        }
      );
      await db.Image.update(
        {
          image: JSON.stringify(body.images),
        },
        {
          where: {
            id: imagesId,
          },
        }
      );
      await db.Overview.update(
        {
          area: body.label,
          type: body.category || null,
          target: body.target || null,
        },
        {
          where: {
            id: overviewId,
          },
        }
      );
      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "") },
            { value: body?.province?.replace("Tỉnh ", "") },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });
      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: body?.label,
        },
      });
      resolve({
        err: 0,
        msg: "Updated",
      });
    } catch (error) {
      reject(error);
    }
  });

export const deletePost = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.destroy({
        where: { id: postId },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        msg: response > 0 ? "Deleted" : "Delete Fail",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostDetailServices = (postId) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.Post.findAll({
        where: { id: postId },
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          { model: db.User, as: "user", attributes: ["name", "zalo", "phone"] },
          { model: db.Overview, as: "overviews" },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "ok" : "failed to get Post detail",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
