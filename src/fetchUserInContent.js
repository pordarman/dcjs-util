const {
    User,
    Client
} = require("discord.js");
const fetchUser = require("./fetchUser.js");

/**
 * Retrieves a user from the text entered
 * @param {Client} client - Discord Client
 * @param {String} content - The content to fetch user
 * @returns {Promise<User>|null}
 */
module.exports = function fetchUserInContent(client, content) {

    // Check the accuracy of the value in the entered parameters
    if (!(client instanceof Client)) throw new TypeError("The entered \"client\" value must be a Client value!");
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");

    // Fetch user ID from content
    const userId = content.match(/\d{17,20}/);

    return userId ? fetchUser(client, userId[0]) : null;
}