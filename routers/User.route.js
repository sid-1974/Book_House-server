const e = require("express");
const { getProfileById, updateProfileById } = require("../controllers/user/User.controller");
const { Authenticated, AuthorizeRoles } = require("../middlewares/auth");
const { AddBook } = require("../controllers/book/Book.controller");


const UserRouter = require("express").Router();


//profile-related 
UserRouter.get("/profile/:id",Authenticated,AuthorizeRoles('user'), getProfileById);
UserRouter.put("/update-profile/:id",Authenticated,AuthorizeRoles('user'), updateProfileById);


//book-related
UserRouter.post("/add-book/:userid",Authenticated,AuthorizeRoles('user'), AddBook);



module.exports = UserRouter;    