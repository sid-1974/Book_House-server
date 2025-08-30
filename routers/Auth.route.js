const { signup, signin, forgotPassword } = require("../controllers/Auth.controller");


const Authrouter = require("express").Router();

Authrouter.post("/signup", signup);
Authrouter.post("/login", signin);
Authrouter.post("/forgot-password", forgotPassword);


module.exports = Authrouter;