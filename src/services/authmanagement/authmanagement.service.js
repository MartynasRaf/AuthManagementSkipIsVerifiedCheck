// Initializes the `authmanagement` service on path `/authmanagement`
const authManagement = require("feathers-authentication-management");
const hooks = require("./authmanagement.hooks");
const notifier = require("./notifier");

module.exports = function (app) {
  // Initialize our service with any options it requires
  //app.configure(authManagement({ skipIsVerifiedCheck: true }));
  app.configure(
    authManagement({
      skipIsVerifiedCheck: true,
      notifier: (type, user, notifierOptions) =>
        notifier(type, user, notifierOptions),
    })
  );

  // app.configure(
  //   authManagement({
  //     notifier: (type, user, notifierOptions) =>
  //       notifier(type, user, notifierOptions),
  //   })
  // );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service("authManagement");

  service.hooks(hooks);
};
