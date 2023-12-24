const {
    User
} = require("discord.js");
const userAvatar = require("./userAvatar");

/**
 * Get the default avatar of a user
 * @param {User} user - The user to get the default avatar of 
 * @returns {String} 
 */
module.exports = function userDisplayAvatar(user) {

    return userAvatar(user) ?? user.defaultAvatarURL;
}