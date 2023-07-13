const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/user.model");

userRouter.get("/", async (req, res) => {
  const data = await UserModel.find();
  res.status(200).send(data);
});

userRouter.post("/register", async (req, res) => {
  const { email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const userdata = new UserModel({ email, pass: hash });
      await userdata.save();
      res.status(200).send({ msg: "New user added" });
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, function (err, result) {
        // result == true
        if (result) {
          const token = jwt.sign({ authorID: user._id }, "masai");
          res.status(200).send({ msg: "Login sucees", token: token });
        } else {
          res.status(400).send({ msg: "wrong credintials sucees" });
        }
      });
    } else {
      res.status(400).send({ msg: "wrong credintials sucees" });
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = {
  userRouter,
};
