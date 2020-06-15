const UserResolver = require("./user.resolver")
const ResetPasswordResolver = require("./resetPassword.resolver")

module.exports = {
    ...UserResolver,
    ...ResetPasswordResolver
}
