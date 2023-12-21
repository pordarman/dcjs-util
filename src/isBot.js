const {
    User,
    GuildMember
} = require("discord.js");

/**
 * Checks if user a bot
 * @param {User|GuildMember} user - User to check
 * @returns {Boolean}
 */
module.exports = function isBot(user) {
    if (user instanceof User) return user.bot;
    else if (user instanceof GuildMember) return user.user.bot;

    throw new TypeError("The entered \"user\" value must be a User or GuildMember value!")
}