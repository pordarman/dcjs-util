const {
    GuildChannel,
    Collection,
    Guild
} = require("discord.js");

/**
 * Pulls all channels on the server
 * @param {Guild} guild - The guild to pull channels
 * @returns {Collection<String, GuildChannel>}
 */
module.exports = function getGuildChannels(guild) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");

    return guild.channels.cache;
}