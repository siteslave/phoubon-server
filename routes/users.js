var express = require('express');
var router = express.Router();

let crypto = require('crypto');
let User = require('../models/users');
let jwt = require('../models/jwt');

// POST /users/login
router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let db = req.db;

  let hashPassword = crypto.createHash('md5')
    .update(password).digest('hex');
  
  User.doLogin(db, username, hashPassword)
    .then(rows => {
      // console.log(rows.length);
      if (rows.length) {
        let token = jwt.sign({ id: rows[0].id });
        res.send({ ok: true, token: token });
      } else {
        res.send({ ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่านไม่ถูกต้อง' });
      }
    }, error => { 
      res.send({ ok: false, error: error });
     });
  
});

module.exports = router;
