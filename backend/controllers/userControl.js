const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id, email) => {
  return jwt.sign({ userId: id, email: email }, "somesecretkey");
};

const postUserSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(403).json({
        success: false,
        message: "This email is already taken. Please choose another one.",
      });
    } else {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).json({
            success: false,
            message: "Error hashing password",
          });
        }

        try {
          const newUser = await User.create({
            name,
            email,
            password: hash,
          });

          return res.status(200).json({
            success: true,
            message: "User Created Successfully!",
            user: newUser,
          });
        } catch (createError) {
          console.error("Error creating user:", createError);
          return res.status(500).json({
            success: false,
            message: "Error creating user",
          });
        }
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const postUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({
            success: false,
            message: "Something went wrong",
          });
        }

        if (result) {
          return res.status(200).json({
            success: true,
            message: "Login Successful!",
            id : user.id,
            token: generateAccessToken(user.id, user.email),
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Password Incorrect!",
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist!",
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { postUserLogin, postUserSignUp };
