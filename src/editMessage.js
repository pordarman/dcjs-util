const {
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
 * Edit a message
 * @param {Message} message - The message to edit
 * @param {MessageObject} messageObject - The message object
 * @returns {Message}
 */
module.exports = function editMessage(message, messageObject) {

    // Check the accuracy of the value in the entered parameters
    if (!(message instanceof Message)) throw new TypeError("The entered \"message\" value must be a Message value!");
    if (typeof messageObject != "string" && !isObject(messageObject)) throw new TypeError("The entered \"messageObject\" value must be a String or Object value!");

    return message.edit(messageObject);
}