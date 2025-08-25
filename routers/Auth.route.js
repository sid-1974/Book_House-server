const { signup, signin } = require("../controllers/Auth.controller");


const Authrouter = require("express").Router();

Authrouter.post("/signup", signup);
Authrouter.post("/login", signin);


module.exports = Authrouter;