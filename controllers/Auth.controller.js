const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const ResponseMessages = require('../utils/ResponseMessages');
const { generateSequentialUserId } = require('../utils/Helpers');

const signup = async (req, res) => {
  try {
    const {fullname, email, password,mobileno, ...otherDetails } = req.body;

    if ( !fullname|| !email || !mobileno || !password) {
      return res.status(ResponseMessages.VALIDATION_ERROR.statusCode)
                .json(ResponseMessages.VALIDATION_ERROR);
    }

    const existingUser = await UserModel.findOne({  $or: [{ email }, { mobileno }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(ResponseMessages.EMAIL_ALREADY_EXISTS.statusCode)
                  .json(ResponseMessages.EMAIL_ALREADY_EXISTS);
      } else {
         return res.status(ResponseMessages.NUMBER_ALREADY_EXISTS.statusCode)
                  .json(ResponseMessages.NUMBER_ALREADY_EXISTS);
      }
    }
    
    let userid = await generateSequentialUserId();
    let userIdExists = await UserModel.findOne({ userid });
    while (userIdExists) {
      userid = generateUserId();
      userIdExists = await UserModel.findOne({ userid });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new UserModel({
      userid,
      email,
      password: hashedPassword,
      mobileno,
      ...otherDetails,
    });
    await newUser.save();
    return res.status(ResponseMessages.REGISTRATION_SUCCESS.statusCode)
                  .json(ResponseMessages.REGISTRATION_SUCCESS);
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await UserModel.findOne({
      $or: [
        { email: identifier },
        { mobileno: identifier },
      ],
    });

    if (!user) {
      return res.status(ResponseMessages.USER_NOT_FOUND.statusCode)
                  .json(ResponseMessages.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(ResponseMessages.INVALID_CREDENTIALS.statusCode)
                  .json(ResponseMessages.INVALID_CREDENTIALS);
    }

    const token = jwt.sign(
      {
        id: user._id,
        userid: user?.userid,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(ResponseMessages.LOGIN_SUCCESS.statusCode).json({
  ...ResponseMessages.LOGIN_SUCCESS,
  token,
});

  } catch (error) {
    return res.status(500).json({ success: false, message:error.message });
  }
};

module.exports = { signup, signin };






