var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

////admin login passport route
//router.post('/user',
//        passport.authenticate('local', {
//
//            successRedirect: '#/user',
//            failureRedirect: '#/failure'
//        })
//);

//Administrator passport route
router.post('/',
    passport.authenticate('local', {

        //successRedirect: '/views/admin/admin.html',
        //failureRedirect: '/views/customer/failure.html'

        successRedirect: '#/admin',
        failureRedirect: '#/failure'
    })
);

//Wildcard
router.get("/*", function(req, res, next){
    var file = req.params[0] || 'views/index.html';
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;