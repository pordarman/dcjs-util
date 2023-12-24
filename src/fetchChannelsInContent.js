const {
    GuildChannel,
    Guild,
    Collection
} = require("discord.js");
const getGuildChannels = require("./getGuildChannels.js");

/**
 * Fetch discord channels in content
 * @param {Guild} guild - The guild to fetch channels
 * @param {String} content - The content to fetch channels
 * @returns {Collection<String,GuildChannel|null>}
 */
module.exports = function fetchChannelsInContent(guild, content) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");

    // Fetch channel IDs from content
    const channelIds = content.match(/\d{17,20}/g);

    const channels = new Collection();

    // If there is no channel ID in the content, return the empty collection
    if (!channelIds) return channels;

    const guildChannels = getGuildChannels(guild);

    for (let index = 0; index < channelIds.length; index++) {
        const channelId = channelIds[index];
        const channel = guildChannels.get(channelId);

        if (channel) channels.set(channelId, channel);
    }

    return channels;
}