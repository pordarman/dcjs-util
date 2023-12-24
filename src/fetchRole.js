const {
    Role,
    Guild
} = require("discord.js");

/**
 * Fetch discord role
 * @param {Guild} guild - The guild to fetch role
 * @param {String} roleId - The role ID to fetch
 * @returns {Role|null}
 */
module.exports = function fetchRole(guild, roleId) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (typeof roleId !== "string") throw new TypeError("The entered \"roleId\" value must be a String value!");
    if (!/^\d{17,20}$/.test(roleId)) throw new TypeError("The entered \"roleId\" value must be a valid role ID!");

    return guild.roles.cache.get(roleId) || null;
}