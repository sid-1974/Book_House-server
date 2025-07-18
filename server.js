const express = require("express")
const cors = require("cors");




require("dotenv").config();
require('./models/db')
const app = express();


//middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

//routers

app.get("/",(req,res)=>{
  res.send("Welcome to BookHouse Server")
})

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});