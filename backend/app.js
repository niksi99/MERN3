require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ConnectToMongo = require('./server/config/MongoDB');
const app = express()

const AuthRoute = require('./server/routes/AuthRoute')
const PostRoute = require('./server/routes/PostRoute')
const CommentRoute = require('./server/routes/CommentRoute')

const PORT = process.env.PORT || 9999;
ConnectToMongo();

app.use(morgan("dev"))
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser());

app.use("/auth", AuthRoute)
app.use("/post", PostRoute)
app.use("/comment", CommentRoute)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/", function(req, res) {
    res.send("FKehofu");
});

app.listen(PORT, () => {
    console.log(`${PORT}`)
})