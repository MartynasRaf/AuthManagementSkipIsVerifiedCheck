module.exports = function (app) {
  function getLink(type, hash) {
    const url = "http://localhost:3030/" + type + "?token=" + hash;
    return url;
  }

  function sendEmail(email) {
    return app
      .service("mailer")
      .create(email)
      .then(function (result) {
        console.log("Sent email", result);
      })
      .catch((err) => {
        console.log("Error sending email", err);
      });
  }

  return {
    notifier: function (type, user, notifierOptions) {
      console.log("Notifier called");

      let tokenLink;
      let email;
      switch (type) {
        case "resendVerifySignup": //sending the user the verification email
          tokenLink = getLink("verify", user.verifyToken);
          email = {
            from: "", //!!!!!!!!!!!!!!!!!
            to: user.email,
            subject: "Verify Signup",
            html: tokenLink,
          };
          return sendEmail(email);

        case "verifySignup": // confirming verification
          tokenLink = getLink("verify", user.verifyToken);
          email = {
            from: "", //!!!!!!!!!!!!!!!!!!
            to: user.email,
            subject: "Confirm Signup",
            html: "Thanks for verifying your email",
          };
          return sendEmail(email);

        case "sendResetPwd":
          console.log("send Reset Password");
          tokenLink = getLink("reset", user.resetToken);
          email = {
            from: "", //!!!!!!!!!!!!!!!!!!!!!!!!!!!
            to: user.email,
            subject: "Reset Password",
            html:
              "<p>You are receiving this email because someone made a request to reset your password. \
                If you did not make that request, you can safely ignore this message.</p> \
                <p>Alternatively, if you do want to reset you password, follow this link:</p>" +
              tokenLink +
              "&email=" +
              user.email,
          };
          return sendEmail(email);

        case "resetPwd":
          tokenLink = getLink("reset", user.resetToken);
          email = {
            from: "m.rafanavicius@gmail.com",
            to: user.email,
            subject: "Confirm Reset",
            html: "Thanks for resetting",
          };
          return sendEmail(email);

        case "passwordChange":
          email = {};
          return sendEmail(email);

        case "identityChange":
          tokenLink = getLink("verifyChanges", user.verifyToken);
          email = {};
          return sendEmail(email);

        default:
          break;
      }
    },
  };
};
