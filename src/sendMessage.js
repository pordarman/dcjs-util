const {
    TextChannel,
    Message,
    EmbedBuilder
} = require("discord.js");

/**
 * @typedef {Object} MessageObject
 * @property {String} content - The content of the message
 * @property {Array<EmbedBuilder>} embeds - The embeds of the message
 * @property {Boolean} tts - The tts of the message
 * @property {Array<String>} files - The files of the message
 * @property {Object} options - The options of the message
 */

function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * Send a message to the channel
 * @param {TextChannel} channel - The channel to send the message
 * @param {MessageObject} messageObject - The message object
 * @returns {Message}
 */
module.exports = function sendMessage(channel, messageObject) {

    // Check the accuracy of the value in the entered parameters
    if (!(channel instanceof TextChannel)) throw new TypeError("The entered \"channel\" value must be a TextChannel value!");
    if (typeof messageObject != "string" && !isObject(messageObject)) throw new TypeError("The entered \"messageObject\" value must be a String or Object value!");

    return channel.send(messageObject);
}