const {
    Message
} = require("discord.js");
const wait = require("./wait");
const editMessage = require("./editMessage");

/**
 * @typedef {Object} MessageObject
 * @property {String} content - The content of the message
 * @property {Array<EmbedBuilder>} embeds - The embeds of the message
 * @property {Boolean} tts - The tts of the message
 * @property {Array<String>} files - The files of the message
 * @property {Object} options - The options of the message
 */

/**
 * Wait and edit a message (in milliseconds)
 * @param {Message} message - The message to edit
 * @param {MessageObject} messageObject - The message object
 * @param {Number} delay - The amount of time to wait (in milliseconds)
 * @returns {Promise<Message>}
 */
module.exports = async function waitAndEditMessage(message, messageObject, delay) {

    // Wait for a given amount of time
    await wait(delay);

    return editMessage(await message, messageObject);
}