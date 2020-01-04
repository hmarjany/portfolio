var express = require("express");
var jwt = require("express-jwt");
var jwksRsa = require("jwks-rsa");
var mongoose = require('mongoose');
var postRoute = require('./Route/PostRoute');
var userRoute = require('./Route/UserRoute');
var morgan = require('morgan')
var app = express();
app.use(morgan('combined'));
var cors = require('cors');
var fileUpload = require('express-fileupload');

app.use(cors());
app.use(
    fileUpload({
        useTempFiles: true,
        safeFileNames: true,
        preserveExtension: true,
        tempFileDir: `${__dirname}/public/files/temp/`
    })
);

app.use(express.static(__dirname + '/public/files/temp/'));
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', { useUnifiedTopology: true, useNewUrlParser: true });

const authConfig = {
    domain: "dev-v9n23u7w.auth0.com",
    audience: "http://api.localhost:3000/"
};

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

app.get("/api/external", checkJwt, (req, res) => {
    res.send({
        msg: "Your Access Token was successfully validated!"
    });
});

app.use(postRoute);
app.use(userRoute);
app.listen(3001, () => console.log('API listening on 3001'));