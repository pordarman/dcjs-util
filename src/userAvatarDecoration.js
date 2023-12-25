const {
    User
} = require("discord.js");

/**
 * Get the avatarDecoration of a user
 * @param {User} user - The user to get the avatarDecoration of
 * @returns {String|null}
 */
module.exports = function userAvatarDecoration(user) {

    // Check the accuracy of the value in the entered parameters
    if (!(user instanceof User)) throw new TypeError("The entered \"user\" value must be a User value!");

    // If the user has no avatarDecoration, return null
    if (!user.avatarDecoration) return null;

    // If the user has a gif avatarDecoration, return the gif avatarDecoration
    return user.avatarDecorationURL({ extension: "png", size: 4096 })
}