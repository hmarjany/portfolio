var express = require('express');
var router = express.Router();

var User = require('../Model/User');

router.get('/user/getAndUpdateUser', function (req, res, next) {
    console.log('start user api');
    if (req.query.userId === undefined) {
        res.send(null);
        return next();
    }
    console.log(req.query.userId);
    User.findOne({
        email: req.query.userId
    }).then(function (findUser) {
        if (findUser != null) {
            console.log('user find!');
            return next();
        } else {
            var newUser = new User();
            newUser.email = req.query.userId;
            newUser.save();
            console.log('user create!');
            next();
        }
    })
});

module.exports = router;