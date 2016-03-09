var express = require('express');
var xoauth2 = require("xoauth2");
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var app = express();

app.set('views','./');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',function(req, res){
  res.render('index');
});

app.post('/',function(req, res){
  var sendEmail = '';
  var password = '';
  var xoauth={
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: sendEmail,
            clientId: '',
            clientSecret: '',
	          refreshToken: '',
            accessToken: ''
        })
    }
}
var transporter = nodemailer.createTransport(xoauth);
var mailOptions = {
    from: sendEmail, // sender address
    to: req.body.email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};
transporter.sendMail(mailOptions, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("SUCCESS!!!!!!!!");
    }
});
  res.render('index');
});

app.listen(3000);
console.log('listen port 3000');
