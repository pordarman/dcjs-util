const {
    Role,
    Guild,
    Collection
} = require("discord.js");
const getRoles = require("./getRoles.js");

/**
 * Fetch discord roles
 * @param {Guild} guild - The guild to fetch roles
 * @param {Array<String>} roleIds - The role IDs to fetch
 * @returns {Collection<String,Role|null>}
 */
module.exports = function fetchRoles(guild, roleIds) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (!Array.isArray(roleIds)) throw new TypeError("The entered \"roleIds\" value must be a Array value!");

    const roles = new Collection();
    const guildRoles = getRoles(guild);

    for (let index = 0; index < roleIds.length; index++) {
        const roleId = roleIds[index];

        // Check if the roleId is a string
        if (typeof roleId !== "string") throw new TypeError("The entered \"roleIds\" value must be an Array of String values!");

        const role = guildRoles.get(roleId);
        if (role) roles.set(roleId, role);
    }

    return roles;
}