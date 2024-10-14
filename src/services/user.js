import { where } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
export const getOneUserService = (id) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.User.findOne({
        where: {
          id,
        },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
      });
      reslove({
        err: response ? 0 : 1,
        msg: response ? "ok" : "failed to get user",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updateUser = (payload, id) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.User.update(payload, {
        where: {
          id,
        },
      });
      reslove({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "Updated" : "failed to update user",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
export const updatePassWordUser = ({ password, newPassword }, id) =>
  new Promise(async (reslove, reject) => {
    try {
      const responsee = await db.User.findOne({
        where: {
          id,
        },
        raw: true,
      });
      const isCorrectPassword =
        responsee && bcrypt.compareSync(password, responsee.password);
      const response =
        isCorrectPassword &&
        (await db.User.update(
          {
            password: hashPassword(newPassword),
          },
          {
            where: {
              id,
            },
          }
        ));
      const token =
        isCorrectPassword &&
        jwt.sign({ id: id, password: newPassword }, process.env.SECRET_KEY, {
          expiresIn: "2d",
        });
      reslove({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "Updated" : "failed to update user",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
