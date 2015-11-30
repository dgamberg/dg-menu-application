var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('./strategies/user');
var session = require('express-session');

var register = require('./routes/register');
var user = require('./routes/user');
var index = require('./routes/index');

// App Set //
app.set("port", (process.env.PORT || 5000));

// Routes
app.use('/register', register);
app.use('/user', user);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

// Passport Session Configuration //
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());


// SQL PG Functions
var pg = require('pg');
//var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/dg-restaurant-menu';
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/d7ok4h9na8io6d';
//var Firebase = require("firebase");


// Get all the messages information
app.get('/data', function(req,res){
    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        //var query = client.query("SELECT * FROM menu ORDER BY id ASC;");
        var query = client.query("SELECT * FROM restaurant_menu ORDER BY id ASC;");
        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

//Get an Item by ID
app.get('/data/:id', function(req,res){
    console.log(req.params.id);
    var menuItem = req.params.id;
    var result = [];
    pg.connect(connectionString, function (err, client) {
        var query = client.query("SELECT * FROM restaurant_menu WHERE id = $1", [menuItem]);

        query.on('row', function (row) {
            result.push(row);
        });

        query.on('end', function () {
            query.end();
            return res.json(result);
        });
    });
});


app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

// Mongo Connection //
var mongoURI = "mongodb://localhost:27017/user_passport_session";
//var mongoURI = "";
var mongoDB = mongoose.connect(mongoURI).connection;



mongoDB.on('error', function(err){
    if(err) console.log("MONGO ERROR: ", err);
});

mongoDB.once('open', function(){
    console.log("Connected to Mongo, meow!");
});


app.use('/', index);


// Listen //
app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});