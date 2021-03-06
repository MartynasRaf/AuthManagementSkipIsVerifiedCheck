// Initializes the `/mailer` service on path `/mailer`
const hooks = require("./mailer.hooks");
const Mailer = require("feathers-mailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = function () {
  const app = this;
  app.use(
    "/mailer",
    Mailer(
      smtpTransport({
        host: "email-smtp.eu-north-1.amazonaws.com",
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    )
  );

  const service = app.service("mailer");
  service.hooks(hooks);
};
