

const EventResolver = require("./event.resolver")
const UserResolver = require("./user.resolver")
const Bookingresolver = require("./booking.resolver")

module.exports = {
    ...EventResolver,
    ...UserResolver,
    ...Bookingresolver
}
