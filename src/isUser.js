const {
    User,
    GuildMember
} = require("discord.js");

/**
 * Checks if user a real user 
 * @param {User|GuildMember} user - User to check
 * @returns {Boolean}
 */
module.exports = function isUser(user) {
    return user instanceof User || user instanceof GuildMember;
}