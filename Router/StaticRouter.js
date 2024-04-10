const express = require("express");
const URL = require("../Model/url");
const { newUserSignUp,userLogin } = require("../Controllers/user");
const { restrictToLoggedUsersOnly } = require("../MiddleWares/author.js");


const router = express.Router();

router.get("/",async(req,res)=>{
    //const allURLs = await URL.find({});
    return res.render("url.ejs");
});

router.post("/",restrictToLoggedUsersOnly,async(req,res)=>{
    const allURLs = await URL.find({});
    return res.render("/",{
        urls: allURLs,
    })
})

router.get("/signup",(req,res)=>{
    return res.render("signup.ejs");
})
router.post("/",newUserSignUp);

router.get("/login",(req,res)=>{
    return res.render("login");
})
router.post("/login", restrictToLoggedUsersOnly, userLogin);

module.exports = router;         
