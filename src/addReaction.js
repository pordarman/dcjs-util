const {
    Message,
    MessageReaction,
    GuildEmoji
} = require("discord.js");

/**
 * Add a reaction to the message
 * @param {Message} message - The message to add the reaction
 * @param {String|GuildEmoji} emoji - The emoji of the reaction
 * @returns {Promise<MessageReaction>}
 */
module.exports = function addReaction(message, emoji) {

    // Check the accuracy of the value in the entered parameters
    if (!(message instanceof Message)) throw new TypeError("The entered \"message\" value must be a Message value!");
    if (!(emoji instanceof GuildEmoji || typeof emoji == "string")) throw new TypeError("The entered \"emoji\" value must be a GuildEmoji or String value!");

    if (typeof emoji == "string") emoji = message.guild.emojis.cache.get(emoji);

    // Check if the emoji is a valid emoji
    if (!emoji) throw new TypeError("The entered \"emoji\" value must be a valid emoji ID!");

    return message.react(emoji);
}