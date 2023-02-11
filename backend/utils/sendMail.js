const SibApiV3Sdk = require("sib-api-v3-sdk");

let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

// use: fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

const sendWelcomeEmail = async (
  urlOfWebsite,
  verificationToken,
  email,
  name
) => {
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.subject = "Welcome to my website!";
  sendSmtpEmail.htmlContent = `<html><body><h1>Welcome to my website, ${name}!</h1><p>please click <a href="${urlOfWebsite}/${verificationToken}">here to verify</a> your account.</p><p>Yours,<br />Sam.</body></html>`;
  sendSmtpEmail.sender = { name: "Sam", email: `noreply@${urlOfWebsite}` };

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log(
      `API called successfully. Returned data: ${JSON.stringify(data)}`
    );
  } catch (err) {
    console.log(err);
  }
};

const sendResetEmail = async (urlOfWebsite, resetToken, email, name) => {
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: email, name: name }];
  sendSmtpEmail.subject = "You forgot!";
  sendSmtpEmail.htmlContent = `<html><body><h1>Hi, ${name} :)</h1><p>please click <a href="${urlOfWebsite}/${resetToken}">here to reset</a> your password.</p><p>Yours,<br />Sam.</body></html>`;
  sendSmtpEmail.sender = { name: "Sam", email: `noreply@${urlOfWebsite}` };

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log(
      `API called successfully. Returned data: ${JSON.stringify(data)}`
    );
  } catch (err) {
    console.log(err);
  }
};

// sendSmtpEmail.subject = "My {{params.subject}}";
// sendSmtpEmail.htmlContent =
//   "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
// sendSmtpEmail.sender = { name: "John Doe", email: "example@example.com" };
// sendSmtpEmail.to = [{ email: "samames9@icloud.com", name: "Jane Doe" }];
// sendSmtpEmail.cc = [{ email: "example2@example2.com", name: "Janice Doe" }];
// sendSmtpEmail.bcc = [{ email: "John Doe", name: "example@example.com" }];
// sendSmtpEmail.replyTo = { email: "replyto@domain.com", name: "John Doe" };
// sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
// sendSmtpEmail.params = { parameter: "My param value", subject: "New Subject" };

// apiInstance.sendTransacEmail(sendSmtpEmail).then(
//   function (data) {
//     console.log(
//       "API called successfully. Returned data: " + JSON.stringify(data)
//     );
//   },
//   function (error) {
//     console.error(error);
//   }
// );
module.exports = { sendWelcomeEmail, sendResetEmail };
