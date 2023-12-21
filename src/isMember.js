const {
    GuildMember
} = require("discord.js");

/**
 * Checks if user a guild member (not discord user)
 * @param {GuildMember} member - User to check
 * @returns {Boolean}
 */
module.exports = function isMember(member) {
    return member instanceof GuildMember;
}