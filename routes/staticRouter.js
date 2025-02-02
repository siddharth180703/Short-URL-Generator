const express = require("express");
const URL = require("../models/url");
const User = require("../models/user");
const { restrictTo } = require("../middleware/auth");
const router = express.Router();
router.get("/admin/urls", restrictTo(["admin"]), async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
  });
});
router.get("/", restrictTo(["NORMAL", "admin"]), async (req, res) => {
  //if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login", {
    error: "Invalid Username or Password",
  });
});
module.exports = router;
