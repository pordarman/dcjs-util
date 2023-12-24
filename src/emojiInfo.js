const {
    GuildEmoji,
    Client,
    Guild,
    User
} = require("discord.js");

/**
 * @typedef {Object} GuildEmojiInfo
 * @property {String} name - The name of the emoji
 * @property {String} id - The ID of the emoji
 * @property {String} url - The URL of the emoji
 * @property {String} identifier - The identifier of the emoji
 * @property {String} iconURL - The URL of the emoji's icon
 * @property {Boolean} animated - Whether the emoji is animated
 * @property {Boolean} available - Whether the emoji is available
 * @property {Guild} guild - The guild of the emoji
 * @property {Number} createdTimestamp - The timestamp the emoji was created at
 * @property {Boolean} deletable - Whether the emoji is deletable
 * @property {User} author - The author of the emoji
 */

/**
 * Get the information of a guild emoji
 * @param {Client} client - The client
 * @param {GuildEmoji|String} emoji - The emoji to get the information from (can be the emoji ID)
 * @returns {Promise<GuildEmojiInfo>}
 */
module.exports = async function emojiInfo(client, emoji) {

    // Check the accuracy of the value in the entered parameters
    if (!(client instanceof Client)) throw new TypeError("The entered \"client\" value must be a Client value!");
    if (!(emoji instanceof GuildEmoji) && typeof emoji !== "string") throw new TypeError("The entered \"emoji\" value must be a GuildEmoji or String value!");

    // If the entered value is a string
    if (typeof emoji === "string") {

        // If the entered value is not a valid emoji ID
        if (!emoji.match(/\d{17,20}/g)) throw new TypeError("The entered \"emoji\" value must be a valid emoji ID");

        emoji = client.emojis.cache.get(emoji);

        // If the emoji is not found
        if (!emoji) return null;
    };

    const emojiInfoObject = {
        name: emoji.name, // The name of the emoji
        id: emoji.id, // The ID of the emoji
        url: emoji.url, // The URL of the emoji
        identifier: emoji.identifier, // The identifier of the emoji
        iconURL: emoji.imageURL({ extension: "png", size: 4096 }), // The URL of the emoji's icon
        animated: emoji.animated, // Whether the emoji is animated
        available: emoji.available, // Whether the emoji is available
        guild: emoji.guild, // The guild of the emoji
        createdTimestamp: emoji.createdTimestamp, // The timestamp the emoji was created at
        deletable: emoji.deletable, // Whether the emoji is deletable
        author: await emoji.fetchAuthor(), // The author of the emoji
    };

    return emojiInfoObject;
}