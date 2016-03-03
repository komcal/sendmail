var express = require('express');
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
  console.log(req.body);
  var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
          auth: {
              user: sendEmail,
              pass: password
        }
  });
  var mailOptions = {
      from: "", // sender address
      to: req.body.email, // list of receivers
      subject: "", // Subject line
      html: "" // html body
  }

  smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
          console.log(error);
      }else{
          console.log("Message sent: " + response.message);
      }
      smtpTransport.close();
  });
  res.render('index');
});

app.listen(3000);
console.log('listen port 3000');
