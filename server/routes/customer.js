var express = require('express');
var router = express.Router();

router.get('/', function(req,res){
    console.log("This is customer route")
    //res.send(data);
});

module.exports = router;