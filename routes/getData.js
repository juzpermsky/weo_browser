var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://postgres:1Oknenaikul@localhost/weo";

/* GET home page. */
router.get('/:iso/:subject_code', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('select 	s.descr as subject_name, ' +
                            'c.name as country_name, ' +
                            's.units||\'/\'||s.scale as unitscale, ' +
                            'sd.year, ' +
                            'sd.value ' +
                  'from 	country c, ' +
                            'subject s, ' +
                            'series_data sd ' +
                  'where	sd.country_code=c.code ' +
                  'and	sd.subject_code=s.code ' +
                  'and  c.iso=\''+req.params.iso+'\' ' +
                  'and  s.code=\''+req.params.subject_code+'\'',
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
