const shortid = require("shortid");
const URL = require("../Model/url.js");



async function generateNewShortURL(req,res)
{
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "Please paste an URL"});
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.render("url.ejs",{id:shortID});
    //return res.json({id: shortID});
}

// async function redirectToURL(req,res)
// {
//     const shortId = req.params.id;
//     console.log(shortId)
//     const entry = await URL.findOneAndUpdate(
//         {shortId,},
//         {
//             $push:
//             {
//                 visitHistory:
//                 {
//                     timestamp: Date.now(),
//                 }
//             }
//         }
//         );
//     console.log(entry);
//     console.log("visited: ",entry.redirectURL);
//     res.redirect(entry.redirectURL);

// }
async function redirectToURL(req, res) {
    try {
        const shortId = req.params.shortId;
        console.log(shortId);
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push:
                {
                    visitHistory:
                    {
                        timestamp: Date.now(),
                    }
                }
            }
        );
        
        if (!entry) {
            console.error("Entry not found.");
            return res.status(404).send("Error: Entry not found.");
        }

        console.log(entry);
        console.log("Visited: ", entry.redirectURL);
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}


async function getAnalytics(req,res)
{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
        
    

module.exports = {
    generateNewShortURL,redirectToURL,getAnalytics,
};