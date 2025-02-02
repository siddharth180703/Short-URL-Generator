const User = require("../models/user");
const { getUser, setUser } = require("../services/auth");
async function createUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/login");
}
async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("All fields are required");
  }
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "INVALID USERNAME OR PASSWORD",
    });
  }
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}
module.exports = { createUser, loginUser };
