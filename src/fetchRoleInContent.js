const {
    Role,
    Guild
} = require("discord.js");
const fetchRole = require("./fetchRole.js");

/**
 * Retrieves a role from the text entered
 * @param {Guild} guild - The guild to fetch role
 * @param {String} content - The content to fetch role
 * @returns {Promise<Role>|null}
 */
module.exports = function fetchRoleInContent(guild, content) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");

    // Fetch role ID from content
    const roleId = content.match(/\d{17,20}/);

    return roleId ? fetchRole(guild, roleId[0]) : null;
}