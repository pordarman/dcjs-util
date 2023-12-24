const {
    Message
} = require("discord.js");
const wait = require("./wait");
const deleteMessage = require("./deleteMessage");

/**
 * Wait and delete a message (in milliseconds)
 * @param {Message} message - The message to delete
 * @param {Number} delay - The amount of time to wait (in milliseconds)
 * @returns {Promise<Message>}
 */
module.exports = async function waitAndDeleteMessage(message, delay) {

    // Wait for a given amount of time
    await wait(delay);

    return deleteMessage(await message);
}