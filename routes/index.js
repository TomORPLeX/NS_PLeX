var express = require('express');
var router = express.Router();


/* GET home page. before db access */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});


/*
var obj = {};
router.get('/', function(req, res){

    console.log('requested index.ejs aka '/' ');

    con.query('SELECT  FROM test1 LIMIT 10', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {index: result};
            res.render('index', obj);
        }
        console.log('Data received from Db:\n');
        console.log(result);
    });
});
*/

module.exports = router;
