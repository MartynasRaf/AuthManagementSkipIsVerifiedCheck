const { authenticate } = require("@feathersjs/authentication").hooks;
const verifyHooks = require("feathers-authentication-management").hooks;
const accountService = require("../authmanagement/notifier");

const { hashPassword, protect } =
  require("@feathersjs/authentication-local").hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword("password"), verifyHooks.addVerification()],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [],
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password"),
    ],
    find: [],
    get: [],
    create: [
      (context) => {
        accountService(context.app).notifier(
          "resendVerifySignup",
          context.result
        );
      },
      verifyHooks.removeVerification(),
    ],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
