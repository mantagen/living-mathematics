if(process.env.NODE_ENV !== 'production') {
  const env2 = require('env2')('./config.env') // eslint-disable-line
}

const nodemailer = require('nodemailer')

const {
  RECIPIENT_EMAIL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS
} = process.env

const allGood = arr => arr.reduce((prev, curr) => !!prev && !!curr)
if (!allGood([RECIPIENT_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS])) {
  throw new Error('Can\'t start server, SMTP details not found.')
}
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
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
})

transporter.verify((err, success) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server is ready to send messages on behalf of ${SMTP_USER}`)
  }
})

const template = formData => (
  `Hello
  \n ${formData.name} emailed.
  \n Here is their message:
  \n ${formData.message}
  \n Here is their email:
  \n ${formData.email}`
)
// setup email data with unicode symbols
const options = data => ({
  from: `"Fred Foo 👻" <${SMTP_USER}>`, // sender address
  to: RECIPIENT_EMAIL, // list of receivers
  subject: 'Hello ✔', // Subject line
  text: template(data), // plain text body
  html: template(data) // html body
})

export const send = (data, cb) => {
  const mailOptions = options(data)
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Message %s sent: %s', info.messageId, info.response)
    }
    return cb(err, info)
  })
}
