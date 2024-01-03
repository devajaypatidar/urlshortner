const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./connection.js");
const URL = require("./model/url.js");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRouter = require("./routes/staticRouter.js")
const cookieParser = require("cookie-parser")
const {restrictToLoggedinUserOnly} = require("./middleware/auth.js");



connectDB(
  "mongodb://ajaypatidar2112:9GShYG5RYIxbGynT@ac-cvjeb2s-shard-00-00.wxqfmjw.mongodb.net:27017,ac-cvjeb2s-shard-00-01.wxqfmjw.mongodb.net:27017,ac-cvjeb2s-shard-00-02.wxqfmjw.mongodb.net:27017/?ssl=true&replicaSet=atlas-12w6f5-shard-0&authSource=admin&retryWrites=true&w=majority"
).then(() => {
  console.log("Database connected");
});

app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use("/url", restrictToLoggedinUserOnly,urlRoute);
app.use("/user", userRoute);
app.use("/",staticRouter);



app.listen(port, () => {
  console.log("listening on port: " + port);
});
