const express = require("express");
const router = express.Router();
const { generateUrl, redirectUrl, getAnalytics } = require("../controller/url");
router.post("/", generateUrl);
router.get("/:shortId", redirectUrl);
router.get("/analytics/:shortId", getAnalytics);
module.exports = router;
