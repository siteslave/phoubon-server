var express = require('express');
var router = express.Router();

let crypto = require('crypto');
let User = require('../models/users');
let jwt = require('../models/jwt');
let Encrypt = require('../models/encrypt');

// POST /users/login
router.post('/login', function(req, res, next) {
  let data = req.body.data;
  let db = req.db;

  let decryptedData = Encrypt.decrypt(data);
  let user = JSON.parse(decryptedData);

  // console.log(data);
  // console.log(user);

  let hashPassword = crypto.createHash('md5')
    .update(user.password).digest('hex');
  
  User.doLogin(db, user.username, hashPassword)
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
