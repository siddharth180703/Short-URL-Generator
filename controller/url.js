const ShortUniqueId = require("short-unique-id");
const URL = require("../models/url");
async function generateUrl(req, res) {
  const body = req.body;
  if (!body) return res.status(400).json({ error: "url is required" });
  const uid = new ShortUniqueId({ length: 10 });
  const Id = uid.rnd();
  await URL.create({
    shortId: Id,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: Id });
}
async function redirectUrl(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).send("shortId parameter is required");
  }
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}
async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({
    shortId: shortId,
  });
  res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = { generateUrl, redirectUrl, getAnalytics };
