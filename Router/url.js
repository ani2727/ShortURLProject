const express = require("express");
 const {generateNewShortURL,redirectToURL,getAnalytics} = require("../Controllers/url")
const router = express.Router();
const URL = require("../Model/url");
const { restrictToLoggedUsersOnly } = require("../MiddleWares/author.js");


// router.get("/",async(req,res)=>{
//     const allURLs = await URL.find({});
//     return res.render("url.ejs",{
//         urls: allURLs,
//     });
// });

router.get("/:id",redirectToURL);
router.get("/analytics/:shortId",getAnalytics);
router.post("/",restrictToLoggedUsersOnly,generateNewShortURL);


module.exports = router;         
