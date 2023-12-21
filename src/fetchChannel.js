const {
    GuildChannel,
    Client
} = require("discord.js");

/**
 * Fetch discord channel
 * @param {Client} client - Discord Client
 * @param {String} channelId - The channel ID to fetch
 * @returns {Promise<GuildChannel>|null}
 */
module.exports = async function fetchChannel(client, channelId) {

    // Check the accuracy of the value in the entered parameters
    if (!(client instanceof Client)) throw new TypeError("The entered \"client\" value must be a Client value!");
    if (typeof channelId !== "string") throw new TypeError("The entered \"channelId\" value must be a String value!");
    if (!/^\d{17,20}$/.test(channelId)) throw new TypeError("The entered \"channelId\" value must be a valid channel ID!");

    return client.channels.cache.get(channelId) || await client.channels.fetch(channelId).catch(() => { }) || null;
}