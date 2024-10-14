import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { where } from "sequelize";
import { v4 } from "uuid";
require("dotenv").config();
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
export const registerService = (body) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: {
          phone: body.phone,
        },
        defaults: {
          name: body.name,
          phone: body.phone,
          password: hashPassword(body.password),
          id: v4(),
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      reslove({
        err: token ? 0 : 2,
        message: token
          ? "Register is successfully"
          : "phone number is already registered",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const logginService = ({ phone, password }) =>
  new Promise(async (reslove, reject) => {
    try {
      const response = await db.User.findOne({
        where: {
          phone,
        },
        raw: true,
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password);
      const token =
        isCorrectPassword &&
        jwt.sign(
          { id: response.id, phone: response.phone },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );

      reslove({
        err: token ? 0 : 2,
        msg: token
          ? "Đăng nhập thành công"
          : response
          ? "Mật khẩu không đúng !"
          : "Số diện thoại không đúng !",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
