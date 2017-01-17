var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.send({ ok: true, message: 'Hello world' });
});

router.get('/test', function(req, res, next) {
  let sql = `SELECT first_name, last_name FROM customers`;
  let db = req.db;
  db.getConnection((err, conn) => {
    if (err) {
      res.send({ ok: false, error: err });
    } else {
      conn.query(sql, [], (err, rows) => {
        if (err) res.send({ ok: false, error: err });
        else res.send({ ok: true, rows: rows });
      });
      conn.release();
    }
  });
});
/// test?name=xxxxx
router.get('/test2', function (req, res, next) {
  let files = ['hn', 'fname'];
  let query = ['0041223', 'สถิตย์'];

  let sql = `SELECT hn, fname, lname FROM patient WHERE 
  ${files[0]}='${query[0]}' and ${files[1]}='${query[1]}'`;
  console.log(sql);
  let db = req.db2;
  db.getConnection((err, conn) => {
    if (err) {
      res.send({ ok: false, error: err });
    } else {
      conn.query(sql, [], (err, rows) => {
        if (err) res.send({ ok: false, error: err });
        else res.send({ ok: true, rows: rows });
      });
      conn.release();
    }
  });
});

module.exports = router;
