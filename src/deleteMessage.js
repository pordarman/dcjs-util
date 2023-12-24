const {
    Message
} = require("discord.js");

/**
 * Delete a message
 * @param {GuildMember} message - The message to delete
 * @returns {Promise<Message>}
 */
module.exports = async function deleteMessage(message) {

    // Check the accuracy of the value in the entered parameters
    if (!(message instanceof Message)) throw new TypeError("The entered \"message\" value must be a Message value!");

    return message.delete();
}