const {nanoid} = require('nanoid');
const URL = require('../model/url');

async function shortURL(req,res){
    const body = req.body;
    if(!body){
        return res.status(400).json({message:"url is required"})
    }
    const shortID = nanoid(8);
    console.log(shortID);
    console.log(body.url);
    const url = new URL({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
        createdBy: req.user._id
    })
   
    await url.save();
    return res.render("home",{
        id: shortID,
    })
    
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitedHistory.length,
    analytics : result.visitedHistory})
}

async function getShortUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
  
    if (!entry) {
      return res.status(404).send({ message: "url not found" });
    }
  
    res.redirect(`${entry.redirectURL}`);
    console.log("redirected");
  }

module.exports = {shortURL,getAnalytics,getShortUrl};