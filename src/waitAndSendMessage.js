const {
    Message,
    TextChannel
} = require("discord.js");
const wait = require("./wait");
const sendMessage = require("./sendMessage");

/**
 * @typedef {Object} MessageObject
 * @property {String} content - The content of the message
 * @property {Array<EmbedBuilder>} embeds - The embeds of the message
 * @property {Boolean} tts - The tts of the message
 * @property {Array<String>} files - The files of the message
 * @property {Object} options - The options of the message
 */

/**
 * Wait and send a message (in milliseconds)
 * @param {TextChannel} channel - The channel to send the message
 * @param {MessageObject} messageObject - The message object
 * @param {Number} delay - The amount of time to wait (in milliseconds)
 * @returns {Promise<Message>}
 */
module.exports = async function waitAndSendMessage(channel, messageObject, delay) {

    // Wait for a given amount of time
    await wait(delay);

    return sendMessage(channel, messageObject);
}