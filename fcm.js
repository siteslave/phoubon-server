var gcm = require('node-gcm');
 
var message = new gcm.Message();
message.addData('title', 'ประกาศ');
message.addData('message', 'ทดสอบการส่ง Push notification');
message.addData('content-available', true);
message.addData('data', { "username": "Satit", "message": "Hello world" });
message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

// Set up the sender with you API key, prepare your recipients' registration tokens. 
var sender = new gcm.Sender("AAAA7_Hcufg:APA91bHNGtiNs5YDZoagvsjGG7AAMekXG3QB8IgZpPp78COk-PQ78AOEbIWtyBB08tSQs4iw84ob10Ps39PNbamP-OaDk3IlhcSUhw2wBf_6rzXzeWF8b-DYXDdYtOLpDV28412uPj-o");
var regTokens = ["dI8KrY9qpZ0:APA91bH8nhSn6NDLcPGC1O487mDXb0PP3G1EsmSbKzYyKtypACPgHOmBibXZ-vhSp6YzrzD3BievFjwXOl8nGG2qzsbxE9vKuB0jxjM_oIH8U24XYr_j_Y-PDs4yMMqU6cK-yPoobr2Z"];

sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err) console.error(err);
    else 	console.log(response);
});