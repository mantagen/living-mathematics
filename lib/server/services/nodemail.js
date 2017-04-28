'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
if (process.env.NODE_ENV !== 'production') {
  var env2 = require('env2')('./config.env'); // eslint-disable-line
}

var nodemailer = require('nodemailer');

var _process$env = process.env,
    RECIPIENT_EMAIL = _process$env.RECIPIENT_EMAIL,
    SMTP_HOST = _process$env.SMTP_HOST,
    SMTP_PORT = _process$env.SMTP_PORT,
    SMTP_USER = _process$env.SMTP_USER,
    SMTP_PASS = _process$env.SMTP_PASS;


var allGood = function allGood(arr) {
  return arr.reduce(function (prev, curr) {
    return !!prev && !!curr;
  });
};
if (!allGood([RECIPIENT_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS])) {
  throw new Error('Can\'t start server, SMTP details not found.');
}
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true, // use TLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});

transporter.verify(function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server is ready to send messages on behalf of ' + SMTP_USER);
  }
});

var template = function template(formData) {
  return 'Hello\n  \n ' + formData.name + ' emailed.\n  \n Here is their message:\n  \n ' + formData.message + '\n  \n Here is their email:\n  \n ' + formData.email;
};
// setup email data with unicode symbols
var options = function options(data) {
  return {
    from: '"Fred Foo \uD83D\uDC7B" <' + SMTP_USER + '>', // sender address
    to: RECIPIENT_EMAIL, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: template(data), // plain text body
    html: template(data) // html body
  };
};

var send = exports.send = function send(data, cb) {
  var mailOptions = options(data);
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log('Message %s sent: %s', info.messageId, info.response);
    }
    return cb(err, info);
  });
};