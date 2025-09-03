const e = require("express");
const { getProfileById, updateProfileById } = require("../controllers/user/User.controller");
const { Authenticated, AuthorizeRoles } = require("../middlewares/auth");


const UserRouter = require("express").Router();

UserRouter.get("/profile/:id",Authenticated,AuthorizeRoles('user'), getProfileById);
UserRouter.put("/update-profile/:id",Authenticated,AuthorizeRoles('user'), updateProfileById);



module.exports = UserRouter;    