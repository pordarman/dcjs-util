const {
    User
} = require("discord.js");

/**
 * Get the banner of a user
 * @param {User} user - The user to get the banner of
 * @returns {String|null}
 */
module.exports =  function userBanner(user) {

    // Check the accuracy of the value in the entered parameters
    if (!(user instanceof User)) throw new TypeError("The entered \"user\" value must be a User value!");

    // If the user has no banner, return null
    if (!user.banner) return null;

    // If the user has a gif banner, return the gif banner
    return user.banner.startsWith("a_") ? user.bannerURL({ format: "gif", dynamic: true, size: 4096 }) : user.bannerURL({ format: "png", dynamic: true, size: 4096 });
}