var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');
//var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/dg-restaurant-menu';
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/d7ok4h9na8io6d';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ expanded: true }));

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

app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});