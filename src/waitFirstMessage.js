const {
    TextChannel,
    Message
} = require("discord.js");
const waitMessages = require("./waitMessages");

/**
 * @typedef {Object} waitMessageObject
 * @property {() => Boolean} filter - The filter function
 * @property {Number} time - The time to wait (in milliseconds) (default: 1 minute)
 */

/**
 * Wait for the first message sent by a user
 * @param {TextChannel} channel - The channel to wait the message from
 * @param {waitMessageObject} options - The awaitMessage options
 * @returns {Promise<Message|null>}
 */
module.exports = async function waitFirstMessage(channel, {
    filter = () => true,
    time = 60 * 1000, // 1 minute
} = {}) {

    const messages = await waitMessages(channel, {
        filter,
        time,
        max: 1
    });

   return messages.first() || null;
}