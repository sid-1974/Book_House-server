const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userid: { type: String,  unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true , unique : true },
    mobileno: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, },
    profileImage: { type: String},
    role : {type : String , default : "user"},
  },
  { timestamps: true,}
);

const UserModel = mongoose.model("user_tbl", UserSchema);
module.exports = UserModel;