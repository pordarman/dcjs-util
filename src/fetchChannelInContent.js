const {
    GuildChannel,
    Client
} = require("discord.js");
const fetchChannel = require("./fetchChannel.js");

/**
 * Retrieves a channel from the text entered
 * @param {Client} client - Discord Client
 * @param {String} content - The content to fetch channel
 * @returns {Promise<GuildChannel|null>}
 */
module.exports = function fetchChannelInContent(client, content) {

    // Check the accuracy of the value in the entered parameters
    if (!(client instanceof Client)) throw new TypeError("The entered \"client\" value must be a Client value!");
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");

    // Fetch channel ID from content
    const channelId = content.match(/\d{17,20}/);

    return channelId ? fetchChannel(client, channelId[0]) : null;
}