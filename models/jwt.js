let jwt = require('jsonwebtoken');
let secretKey = 'youAremAnoRGril';

module.exports = {
  sign(playload) { 
    // {id: 1 }
    let token = jwt.sign(playload, secretKey, {
      expiresIn: '2d'
    });

    return token;
  },

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(err)
        } else {
          resolve(decoded)
        }
      });
    });
  }
}