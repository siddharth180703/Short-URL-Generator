const express = require("express");
const path = require("path");
const app = express();
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const { connectMongoDb } = require("./connections");
const cookieParser = require("cookie-parser");
const { checkforAuthentication, restrictTo } = require("./middleware/auth");
connectMongoDb("mongodb://127.0.0.1:27017/url-generator");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthentication);
app.use("/user", userRoute);
app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/", staticRouter);
app.listen("8000", () => {
  console.log("server started");
});
