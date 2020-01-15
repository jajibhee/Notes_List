const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
// @router      POST api/users
// @desc        Register a user
// @access       Public

const addUsers = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ name, email, password });
    //To store the password in the db, we need to hash the password with bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    console.log({ payload });

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
};

router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", " PLease enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 })
  ],
  addUsers
);

module.exports = router;
