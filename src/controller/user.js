const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { findEmail, create } = require("../models/user");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");

const UserController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const id = uuidv4();
      console.log("tes email = ", email);
      await findEmail(email, function (err, user) {
        if (err) return err;
        console.log("email sudah ada =  ", user);
        const { rowCount } = user;
        const passwordHash = bcrypt.hashSync(password);
        console.log("email sudah ada 1 =  ", rowCount);
        if (user.length > 0) {
          return res.send("Email sudah ada");
        } else {
          create(id, name, email, passwordHash, function (err, user) {
            if (err) res.send(err);
            return res.send("register created");
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      await findEmail(email, function (err, user) {
        if (err) return err;
        console.log("email bener = ", user);
        if (user.length > 0) {
          const isValidPassword = bcrypt.compareSync(password, password);
          console.log(isValidPassword);

          if (isValidPassword) {
            return commonHelper.response(res, null, 403, "Password is invalid");
          }

          delete user.password;
          const payload = {
            email: user[0].email,
          };
          console.log("cek nama bener= ", payload);
          const user1 = {
            name: "",
            token: "",
            refershToken: "",
            id: "",
          };

          user1.name = user[0].name;
          user1.id = user[0].id;
          user1.token = authHelper.generateToken(payload);
          user1.refershToken = authHelper.generateRefershToken(payload);

          commonHelper.response(res, user1, 201, "login is successful");
        } else {
          return commonHelper.response(res, null, 403, "Email is invalid");
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  refreshToken: (req, res) => {
    const refershToken = req.body.refershToken;
    const decoded = jwt.verify(refershToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.generateRefershToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = UserController;
