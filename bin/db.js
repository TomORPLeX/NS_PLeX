/**
 * Created by 609117246 on 02/12/2016.
 */
/* Database connection and data pull


 Official Documentation: https://github.com/mysqljs/mysql/blob/master/Readme.md
 Tutorial: https://www.sitepoint.com/using-node-mysql-javascript-client/
 */
var express = require('express');
var mysql = require('mysql')
var router = express.Router();



/*
 //query the database -- moved query to index.ejs
 con.query('SELECT * FROM test1 LIMIT 10',function(err,rows){

     if(err){
         console.log('Could not execute query' +err)
     }
         console.log('Data received from Db:\n');
         console.log(rows);
 });
*/

var obj = {};
router.get('/',function(req,res,next) {



    // Create MySQL connection to the db
    var con = mysql.createConnection({
        host: "10.52.204.247",
        user: "nsusr",
        password: "N5p1A2",
        database:"test"
    });

    // Open the MySQL connection to the db
    con.connect(function(err){
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');
    });

    //query the connection
    var quer1 = "SELECT * FROM test1 LIMIT 10";
    console.log('in '/' request');
    con.query(quer1, function(err,rows) {
        if (err) {
            console.log(err);
        } else {
            obj = {db: rows};
            res.render('db', obj);
        }
        console.log(rows[1]);
    })

    //res.render('db', { title: 'db' });

    // close db connection
    con.end(function(err) {
        // The connection is terminated gracefully
        // Ensures all previously enqueued queries are still
        // before sending a COM_QUIT packet to the MySQL server.
        console.log('Connection Closed')
    });

});

//module.exports = con;
module.exports = router;