let fs = require('fs');
let buffer = fs.readFileSync('D:\\Training\\16_20_jan_2017\\ApiServer\\images\\image.jpeg');
// let buffer2 = rows[0].image;
let imageBase64 = buffer.toString('base64');
// let imageBase642 = buffer2.toString('base64');
console.log(imageBase64);