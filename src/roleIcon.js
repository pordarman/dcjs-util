const {
    Role
} = require("discord.js");

/**
 * Get the icon of a role
 * @param {Role} role - The role to get the icon of
 * @returns {String|null}
 */
module.exports =  function roleSplash(role) {

    // Check the accuracy of the value in the entered parameters
    if (!(role instanceof Role)) throw new TypeError("The entered \"role\" value must be a Role value!");

    // If the role has no icon, return null
    if (!role.icon) return null;

    // If the role has a gif icon, return the gif icon
    return role.icon.startsWith("a_") ? role.iconURL({ format: "gif", dynamic: true, size: 4096 }) : role.iconURL({ format: "png", dynamic: true, size: 4096 });
}