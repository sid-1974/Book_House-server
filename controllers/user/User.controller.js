const UserModel = require("../../models/user");
const ResponseMessages = require("../../utils/ResponseMessages");


const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findOne({userid:id}).select('-password -__v -_id');
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("getprofileById error:", error);
    return res.status(ResponseMessages.SERVER_ERROR.statusCode)
                  .json(ResponseMessages.SERVER_ERROR);
    }
}


module.exports = { getProfileById };