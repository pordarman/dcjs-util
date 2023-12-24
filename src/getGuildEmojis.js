const {
    GuildEmoji,
    Collection,
    Guild
} = require("discord.js");

/**
 * Pulls all emojis on the server
 * @param {Guild} guild - The guild to pull emojis
 * @returns {Collection<String, GuildEmoji>}
 */
module.exports = function getGuildEmojis(guild) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");

    return guild.emojis.cache;
}