var CryptoJS = require("crypto-js");
var secretKey = '1234567890';

module.exports = {
  encrypt(plaintext) {
    var ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey);
    return ciphertext.toString();
  },

  decrypt(encryptText) {
    var bytes  = CryptoJS.AES.decrypt(encryptText, secretKey);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }
}