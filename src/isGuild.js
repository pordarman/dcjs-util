const {
    Message
} = require("discord.js");

/**
 * Checks if message a guild message (not dm)
 * @param {Message} message - Message to check
 * @returns {Boolean}
 */
module.exports = function isGuild(message) {
    return Boolean(message.guildId);
}