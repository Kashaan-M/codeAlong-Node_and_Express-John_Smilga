const nodemailer = require('nodemailer');
//const sgMail = require('@sendgrid/mail');
const Sib = require('sib-api-v3-sdk');

// send email with nodemailer and ethereal.email
const sendEmailEthereal = async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'skyla9@ethereal.email',
      pass: '1WmkGuHZmcKtnuN63u',
    },
  });

  let info = await transporter.sendMail({
    from: '"Kashaan Mahmood" <kashaanmahmood@talib.com>',
    to: 'kashaanmahmood@gmail.com',
    subject: 'Welcome to the Talib Academy!',
    text: 'Register krny ka shukria. Aap ka email ab verify ho chuka hai \n lehaza ap neechy diye gye link pr click krein taky ap login krskein',
    html: '<h1>Register krny ka boht shukria</h1><p>Neechy diye gye link pr click kr ky login hon</p>',
  });

  res.json(info);
};

const sendEmail = (req, res) => {
  // send email with SendInBlue

  const defaultClient = Sib.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

  const transEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: 'kashaanmahmood@gmail.com',
    name: 'kashaan mahmood',
  };

  const receivers = [{ email: 'dimashstudio@gmail.com' }, { email: 'kashaanmehmood769@yahoo.com' }];

  transEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Testing sendinblue API',
      textContent: 'Hi user',
      htmlContent: `<h1>Hi user</h1>
          <p>I am just testing how to send email inside a NodeJS App using sendinblue API</p>
          <p>As you can see that this is working fine</p>
          `,
    })
    .then((data) => {
      console.log('success');
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = sendEmail;
