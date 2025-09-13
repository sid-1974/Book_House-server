const UserModel = require("../../models/user");
const ResponseMessages = require("../../utils/ResponseMessages");
const bcrypt = require("bcrypt");

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({ userid: id }).select(
      "-password -__v -_id"
    );
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("getprofileById error:", error);
    return res
      .status(ResponseMessages.SERVER_ERROR.statusCode)
      .json(ResponseMessages.SERVER_ERROR);
  }
};

const updateProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const { userid, _id, __v, password, ...safeUpdateData } = updateData;

    const user = await UserModel.findOne({ userid: id });
    if (!user) {
      return res.status(ResponseMessages.USER_NOT_FOUND.statusCode)
                .json(ResponseMessages.USER_NOT_FOUND);
    }

    if (password) {
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return res.status(ResponseMessages.NEW_PASSWORD.statusCode)
                  .json(ResponseMessages.NEW_PASSWORD);
      }
    
      if (password.length < 6) {
        return res.status(ResponseMessages.PASSWORD_LENGTH.statusCode)
                  .json(ResponseMessages.PASSWORD_LENGTH);
      }
  
      const saltRounds = 10;
      safeUpdateData.password = await bcrypt.hash(password, saltRounds);
    } 

    const updatedUser = await UserModel.findOneAndUpdate(
      { userid: id },
      { $set: safeUpdateData },
      {
        new: true,
        runValidators: true,
      }
    ).select("-__v -_id");

    return res
      .status(ResponseMessages.UPDATE_PROFILE_BY_ID.statusCode)
      .json({
        ...ResponseMessages.UPDATE_PROFILE_BY_ID,
        user: updatedUser
      });
  } catch (error) {
    console.error("updateUser error:", error);
    return res
      .status(ResponseMessages.SERVER_ERROR.statusCode)
      .json(ResponseMessages.SERVER_ERROR);
  }
};

module.exports = { getProfileById, updateProfileById };