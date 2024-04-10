const { getUser } = require("../Services/author");
const { userLogin } = require("../Controllers/user.js")

async function  restrictToLoggedUsersOnly(req,res,next)
{
    const userUid = req.cookies?.uid;

    if(!userUid) return res.redirect("/login");

    const user = getUser(userUid);

    if(!user) return res.redirect("/login");
    req.user = user;

    next();
}

module.exports = {
    restrictToLoggedUsersOnly,
}