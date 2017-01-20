var express = require('express');
var gcm = require('node-gcm');
      
var router = express.Router();
var Customer = require('../models/customer');
var Encrypt = require('../models/encrypt');
var User = require('../models/users');

router.post('/', (req, res, next) => {
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let sex = req.body.sex;
  let customer_type_id = req.body.customer_type_id;
  let telephone = req.body.telephone;
  let email = req.body.email;
  let image = req.body.image;

  if (first_name && last_name && customer_type_id) {
    let customer = {
      first_name: first_name,
      last_name: last_name,
      sex: sex,
      customer_type_id: customer_type_id,
      telephone: telephone,
      email: email,
      image: image
    }

    let db = req.db;
    Customer.save(db, customer)
      .then(() => {
        res.send({ ok: true });
      }, (error) => {
        res.send({ ok: false, error: error });
      });

  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
  }

});

router.post('/save-device-token', (req, res, next) => {
  let id = req.decoded.id;
  let deviceToken = req.body.deviceToken;

  let db = req.db;

  User.saveDeviceToken(db, id, deviceToken)
    .then(() => {
      res.send({ ok: true });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

router.post('/send-message', (req, res, next) => {
  let id = req.body.id;
  let msg = req.body.msg;

  let db = req.db;

  User.getDeviceToken(db, id)
    .then((rows) => {

      var message = new gcm.Message();
      message.addData('title', 'ข้อความจาก สสจ.');
      message.addData('message', msg);
      message.addData('content-available', true);
      // message.addData('data', { "username": "Satit", "message": "Hello world" });
      message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

      // Set up the sender with you API key, prepare your recipients' registration tokens. 
      var sender = new gcm.Sender("AAAA7_Hcufg:APA91bHNGtiNs5YDZoagvsjGG7AAMekXG3QB8IgZpPp78COk-PQ78AOEbIWtyBB08tSQs4iw84ob10Ps39PNbamP-OaDk3IlhcSUhw2wBf_6rzXzeWF8b-DYXDdYtOLpDV28412uPj-o");
      var regTokens = [];

      rows.forEach(v => {
        regTokens.push(v.device_token);
      });

      sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if (err) {
          console.error(err);
          res.send({ ok: false, error: err });
        } else {
          console.log(response);
          res.send({ ok: true });
        }
      });

    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

router.get('/users-list', (req, res, next) => {
  let db = req.db;

  User.getUsers(db)
    .then((rows) => {
      res.send({ ok: true, rows: rows });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

router.put('/', (req, res, next) => {
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let sex = req.body.sex;
  let customer_type_id = req.body.customer_type_id;
  let telephone = req.body.telephone;
  let email = req.body.email;
  let image = req.body.image;
  let id = req.body.id;

  if (first_name && last_name && customer_type_id) {
    let customer = {
      first_name: first_name,
      last_name: last_name,
      sex: sex,
      customer_type_id: customer_type_id,
      telephone: telephone,
      email: email,
      image: image,
      id: id
    }

    let db = req.db;
    Customer.update(db, customer)
      .then(() => {
        res.send({ ok: true });
      }, (error) => {
        res.send({ ok: false, error: error });
      });

  } else {
    res.send({ ok: false, error: 'ข้อมูลไม่ครบถ้วน' });
  }

});

router.get('/:limit/:offset', function (req, res, next) {
  let db = req.db;
  let limit = parseInt(req.params.limit);
  let offset = parseInt(req.params.offset);

  Customer.all(db, limit, offset)
    .then((rows) => {
      let customers = [];
      rows.forEach(v => {
        let obj = {
          id: v.id,
          sex: v.sex,
          customer_type_id: v.customer_type_id,
          lat: v.lat,
          lng: v.lng,
          first_name: v.first_name,
          last_name: v.last_name,
          telephone: v.telephone,
          email: v.email,
          image: v.image ? v.image.toString() : null
        };
        customers.push(obj);
      });

      let _customers = JSON.stringify(customers);
      let encryptedText = Encrypt.encrypt(_customers);

      res.send({ ok: true, data: encryptedText });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

router.post('/search', function (req, res, next) {
  let db = req.db;
  let query = req.body.query;

  Customer.search(db, query)
    .then((rows) => {
      let customers = [];
      rows.forEach(v => {
        let obj = {
          id: v.id,
          sex: v.sex,
          customer_type_id: v.customer_type_id,
          lat: v.lat,
          lng: v.lng,
          first_name: v.first_name,
          last_name: v.last_name,
          telephone: v.telephone,
          email: v.email,
          image: v.image ? v.image.toString() : null
        };
        customers.push(obj);
      });

      let _customers = JSON.stringify(customers);
      let encryptedText = Encrypt.encrypt(_customers);

      res.send({ ok: true, data: encryptedText });

    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

router.get('/customer-types', function (req, res, next) {
  let db = req.db;
  Customer.getCustomerTypes(db)
    .then((rows) => {
      res.send({ ok: true, rows: rows });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

router.get('/total', function (req, res, next) {
  let db = req.db;
  Customer.total(db)
    .then((total) => {
      res.send({ ok: true, total: total });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

router.delete('/:id', function (req, res, next) {
  let db = req.db;
  let id = req.params.id;

  Customer.remove(db, id)
    .then(() => {
      res.send({ ok: true });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

router.put('/map/:id', function (req, res, next) {
  let db = req.db;
  let id = req.params.id;
  let lng = req.body.lng;
  let lat = req.body.lat;

  Customer.saveMap(db, id, lat, lng)
    .then(() => {
      res.send({ ok: true });
    }, (error) => {
      res.send({ ok: false, error: error });
    });
});

module.exports = router;
