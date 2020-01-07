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

var mongoPassword = 'SD@123456';  
app.use(express.static(__dirname + '/public/files/temp/'));
var config = JSON.parse(process.env.APP_CONFIG);
 
mongoose.connect("mongodb://" + "9a1798554423b52f03bf4889cd5b579e" + ":" + encodeURIComponent(mongoPassword) + "@" + 
"mongodb:27017/9a1798554423b52f03bf4889cd5b579e", { useUnifiedTopology: true, useNewUrlParser: true });

const authConfig = {
    domain: "dev-v9n23u7w.auth0.com",
    audience: "https://marjani158.osc-fr1.scalingo.io"
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