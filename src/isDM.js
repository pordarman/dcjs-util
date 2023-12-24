const {
    Message
} = require("discord.js");

/**
 * Checks if message a dm message (not guild)
 * @param {Message} message - Message to check
 * @returns {Boolean}
 */
module.exports = function isGuild(message) {
    return !Boolean(message.guildId);
}