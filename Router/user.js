const express = require("express");
const {newUserSignUp,userLogin} = require("../Controllers/user")
const URL = require("../Model/user");
const router = express.Router();

// router.post("/",newUserSignUp);
// router.post("/login",userLogin);


module.exports = router;