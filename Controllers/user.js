const User = require("../Model/user");
const {v4: uuidv4} = require("uuid");

const {setUser} = require("../Services//author");

async function newUserSignUp(req,res)
{
    const {name,email,password} = req.body;
    //console.log(req.body);
    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
}

async function userLogin(req,res)
{
    const {email,password} = req.body;

    const user = await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            Error: "Invalid Username or Password",
        });
    }

    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);

    return res.redirect("/");
}

module.exports = {
    newUserSignUp,userLogin,
}