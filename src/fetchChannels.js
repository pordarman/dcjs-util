const {
    GuildChannel,
    Guild,
    Collection
} = require("discord.js");
const getGuildChannels = require("./getGuildChannels.js");

/**
 * Fetch discord channels
 * @param {Guild} guild - The guild to fetch channels
 * @param {Array<String>} channelIds - The channel IDs to fetch
 * @returns {Promise<Collection<String,GuildChannel|null>>}
 */
module.exports = async function fetchChannels(guild, channelIds) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (!Array.isArray(channelIds)) throw new TypeError("The entered \"channelIds\" value must be a Array value!");

    const channels = new Collection();
    const guildChannels = await getGuildChannels(guild);

    for (let index = 0; index < channelIds.length; index++) {
        const channelId = channelIds[index];

        // Check if the channelId is a string
        if (typeof channelId !== "string") throw new TypeError("The entered \"channelIds\" value must be an Array of String values!");

        const channel = guildChannels.get(channelId);
        if (channel) channels.set(channelId, channel);
    }

    return channels;
}