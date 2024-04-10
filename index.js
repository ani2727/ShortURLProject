const express = require("express");
const {connectMongoDB} = require("./connection")
const urlRouter = require("./Router/url.js");
const StaticRouter = require("./Router/StaticRouter.js");
const URL = require("./Model/url.js");
const path = require("path");
const userRouter = require("./Router/user.js");
const cookieparser = require("cookie-parser");

const app = express();
const PORT = 8000;
connectMongoDB("mongodb://localhost:27017/ShortURL")
.then(()=>console.log("MongoDB Connected")); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieparser());

app.set("view engine","ejs");
app.set("views",path.resolve("./Views"));

// app.use("/signup",userRouter);
app.use("/url",urlRouter);
app.use("/",StaticRouter)



app.listen(PORT,()=>{console.log(`Server started at PORT: ${PORT}`)});
