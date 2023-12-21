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
 * @returns {Promise<Collection<String,GuildChannel|null>>}
 */
module.exports = async function fetchChannelsInContent(guild, content) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");

    // Fetch channel IDs from content
    const content = content.match(/\d{17,20}/g);

    const channels = new Collection();

    // If there is no channel ID in the content, return the empty collection
    if (!content) return channels;

    const guildChannels = await getGuildChannels(guild);

    for (let index = 0; index < content.length; index++) {
        const channelId = content[index];
        const channel = guildChannels.get(channelId);

        if (channel) channels.set(channelId, channel);
    }

    return channels;
}