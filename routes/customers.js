var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

router.get('/', function(req, res, next) {
  let db = req.db;
  Customer.all(db)
    .then((rows) => {
      let customers = [];
      rows.forEach(v => {
        let obj = {
          first_name: v.first_name,
          last_name: v.last_name,
          telephone: v.telephone,
          email: v.email,
          image: v.image ? v.image.toString() : null
        };
        customers.push(obj);
      });
      res.send({ ok: true, rows: customers });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

module.exports = router;
