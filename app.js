var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql'); //Create MySQL var

var index = require('./routes/index');
var loginpage = require('./routes/loginpage');
var demand = require('./routes/demand');
var dayminus1 = require('./routes/dayminus1');
var otd = require('./routes/otd');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* Testing database connection and data pull

Official Documentation: https://github.com/mysqljs/mysql/blob/master/Readme.md
Tutorial: https://www.sitepoint.com/using-node-mysql-javascript-client/
*/

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

//query the database
con.query('SELECT * FROM test1',function(err,rows){
    if(err) throw err;

    console.log('Data received from Db:\n');
    console.log(rows);
});

// Close the MySQL connection to the db
con.end(function(err) {
    // The connection is terminated gracefully
    // Ensures all previously enqueued queries are still
    // before sending a COM_QUIT packet to the MySQL server.
});

/* End testing database connection and data pull*/


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/loginpage', loginpage);
app.use('/demand', demand);
app.use('/dayminus1', dayminus1);
app.use('/otd', otd);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
