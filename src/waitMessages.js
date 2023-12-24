const {
    TextChannel,
    Message,
    Collection
} = require("discord.js");

/**
 * @typedef {Object} waitMessageObject
 * @property {Number} max - The maximum number of messages to collect
 * @property {() => Boolean} filter - The filter function
 * @property {Number} time - The time to wait (in milliseconds)
 */

/**
 * Wait for the first message sent by a user
 * @param {TextChannel} channel - The channel to wait the message from
 * @param {waitMessageObject} options - The awaitMessage options
 * @returns {Promise<Collection<String, Message>>}
 */
module.exports = async function waitMessages(channel, {
    max = 1,
    filter = () => true,
    time = 60 * 1000, // 1 minute
} = {}) {

    // Check the accuracy of the value in the entered parameters
    if (!(channel instanceof TextChannel)) throw new TypeError("The entered \"channel\" value must be a TextChannel value!");
    if (typeof filter !== "function") throw new TypeError("The entered \"filter\" value must be a Function value!");
    if (typeof max !== "number") throw new TypeError("The entered \"max\" value must be a Number value!");
    if (max < 0) throw new RangeError("The entered \"max\" must be a positive Number value!");
    if (typeof time !== "number") throw new TypeError("The entered \"time\" value must be a Number value!");
    if (time < 0) throw new RangeError("The entered \"time\" must be a positive Number value!");

    // Wait for the first message sent by a user
    const messageCollection = await channel.awaitMessages({
        filter,
        max,
        time,
        errors: ["time"]
    }).catch(() => { });

    // Check if the message collection is empty
    return messageCollection || new Collection();
}