var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:1Oknenaikul@localhost/weo";

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req);
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
      console.log(req.params);
    client.query('select 	code, ' +
                            'iso, ' +
                            'name ' +
                  'from 	country ' +
                  'where    upper(name) like upper(\'%'+req.query.term+'%\')',
                  function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
      //output: 1
    });
  });


  //res.render('index', { title: 'Express' });
  });
module.exports = router;
