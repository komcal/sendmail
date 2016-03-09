var express = require('express');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
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
  console.log(req.body);
  // var smtpTransport = nodemailer.createTransport("SMTP",{
  //   host: 'smtp.gmail.com',
  //   port: 587,
  //   secure: true,
  //       service: "Gmail",
  //         auth: {
  //             user: sendEmail,
  //             pass: password
  //       }
  // });
  var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
      auth: {
          user: sendEmail,
          pass: password
    }
}));
  var mailOptions = {
      from: "Junior Webmaster Camp <"+sendEmail+">",// sender address
      to: req.body.email, // list of receivers
      subject: "ทดสอบบบบบบบบ", // Subject line
      html: "<h1>test</h1>" // html body
  }

  transporter.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }
  });
  res.render('index');
});

app.listen(3000);
console.log('listen port 3000');
