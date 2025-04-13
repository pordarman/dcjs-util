const {
    User
} = require("discord.js");

/**
 * Get the avatar of a user
 * @param {User} user - The user to get the avatar of
 * @returns {String|null}
 */
module.exports = function userAvatar(user) {

    // Check the accuracy of the value in the entered parameters
    if (!(user instanceof User)) throw new TypeError("The entered \"user\" value must be a User value!");

    // If the user has no avatar, return null
    if (!user.avatar) return null;

    // If the user has a gif avatar, return the gif avatar
    return user.avatarURL({ extension: "png", forceStatic: true, size: 4096 });
}