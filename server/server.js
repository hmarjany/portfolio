var express = require("express");
var jwt = require("express-jwt");
var jwksRsa = require("jwks-rsa");
var mongoose = require('mongoose');
var postRoute = require('./Route/PostRoute');
var userRoute = require('./Route/UserRoute');
var morgan = require('morgan')
var app = express();
app.use(morgan('combined'));
//var cors = require('cors');
var fileUpload = require('express-fileupload');

//app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
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
 
mongoose.connect("mongodb://" + config.mongo.user + ":" + encodeURIComponent(mongoPassword) + "@" + 
config.mongo.hostString, { useUnifiedTopology: true, useNewUrlParser: true });

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
app.listen(process.env.PORT, () => console.log('API listening on 3001'));