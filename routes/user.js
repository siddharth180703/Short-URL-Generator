const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controller/user");
const User = require("../models/user");
router.post("/", createUser);
router.post("/login", loginUser);
module.exports = router;
