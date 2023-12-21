const {
    GuildChannel,
    Collection,
    Client
} = require("discord.js");

/**
 * Pulls all channels on the server
 * @param {Client} client - The client to pull channels
 * @returns {Promise<Collection<String, GuildChannel>>}
 */
module.exports = async function getAllChannels(client) {

    // Check the accuracy of the value in the entered parameters
    if (!(client instanceof Client)) throw new TypeError("The entered \"client\" value must be a Client value!");

    return client.channels.cache.size == 0 ? await client.channels.fetch().catch(() => new Collection()) : client.channels.cache;
}