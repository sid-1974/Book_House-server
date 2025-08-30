const e = require("express");
const { getProfileById } = require("../controllers/user/User.controller");


const UserRouter = require("express").Router();

UserRouter.get("/profile/:id", getProfileById);



module.exports = UserRouter;    