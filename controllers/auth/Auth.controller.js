const UserModel = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const ResponseMessages = require('../../utils/ResponseMessages');
const { generateSequentialUserId } = require('../../utils/Helpers');
const { getWelcomeMessage, getOtpSentMessage } = require('../../utils/email/EmailMessages');
const { sendMail } = require('../../utils/email/EmailService');
const { verifyOTP, generateOTP, storeOTP } = require('../../utils/email/OtpServices');

const signup = async (req, res) => {
  try {
    const {fullname, email, password,mobileno, ...otherDetails } = req.body;

    if ( !fullname|| !email || !mobileno || !password) {
      return res.status(ResponseMessages.VALIDATION_ERROR.statusCode)
                .json(ResponseMessages.VALIDATION_ERROR);
    }

    if (password.length < 6) {
      return res.status(ResponseMessages.PASSWORD_LENGTH.statusCode)
                .json(ResponseMessages.PASSWORD_LENGTH);
    }

   
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobileno)) {
     return res.status(ResponseMessages.NUMBER_LENGTH.statusCode)
                .json(ResponseMessages.NUMBER_LENGTH);
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
      fullname,
      email,
      password: hashedPassword,
      mobileno,
      ...otherDetails,
    });
    await newUser.save();
     try {
      const { welcomeMessage, welcomeSubject } = getWelcomeMessage(newUser);
      await sendMail(email, welcomeSubject, welcomeMessage);
    } catch (emailError) {
      console.error("Email error:", emailError);
    }
    return res.status(ResponseMessages.REGISTRATION_SUCCESS.statusCode)
                  .json(ResponseMessages.REGISTRATION_SUCCESS);
  } catch (error) {
      console.error("Signunp error:", error);
    return res.status(ResponseMessages.SERVER_ERROR.statusCode)
                  .json(ResponseMessages.SERVER_ERROR);
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
    console.error("Signin error:", error);
    return res.status(ResponseMessages.SERVER_ERROR.statusCode)
                  .json(ResponseMessages.SERVER_ERROR);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      return res.status(ResponseMessages.USER_NOT_FOUND.statusCode)
                .json(ResponseMessages.USER_NOT_FOUND);
    }

    if (otp && !password ) {
      if (!verifyOTP(email, otp)) {
        return res.status(ResponseMessages.INVALID_OTP.statusCode)
                  .json(ResponseMessages.INVALID_OTP);
      }
      return res.status(ResponseMessages.OTP_SUCCESS.statusCode)
                .json(ResponseMessages.OTP_SUCCESS);
    }

    if (password ) {
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return res.status(ResponseMessages.NEW_PASSWORD.statusCode)
                  .json(ResponseMessages.NEW_PASSWORD);
      }
      if (password.length < 6) {
        return res.status(ResponseMessages.PASSWORD_LENGTH.statusCode)
                  .json(ResponseMessages.PASSWORD_LENGTH);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      
      return res.status(ResponseMessages.PASSWORD_RESET.statusCode)
                .json(ResponseMessages.PASSWORD_RESET);
    }

    const newOtp = generateOTP();
    storeOTP(email, newOtp);
    
    try {
      const { otpMessage, otpSubject } = getOtpSentMessage(user, newOtp);
      await sendMail(email, otpSubject, otpMessage);
    } catch (emailError) {
      console.error("Email error:", emailError);
    }
    
    return res.status(ResponseMessages.OTP_SENT.statusCode)
              .json(ResponseMessages.OTP_SENT);

  } catch (error) {
    console.error("forgot Password error:", error);
    return res.status(ResponseMessages.SERVER_ERROR.statusCode)
                  .json(ResponseMessages.SERVER_ERROR);
  }
}

module.exports = { signup, signin,forgotPassword};






