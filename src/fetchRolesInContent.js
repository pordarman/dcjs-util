const {
    Role,
    Guild,
    Collection
} = require("discord.js");
const getRoles = require("./getRoles.js");

/**
 * Fetch discord roles in content
 * @param {Guild} guild - The guild to fetch roles
 * @param {String} content - The content to fetch roles
 * @returns {Promise<Collection<String,Role|null>>}
 */
module.exports = async function fetchRolesInContent(guild, content) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");

    // Fetch role IDs from content
    const content = content.match(/\d{17,20}/g);

    const roles = new Collection();

    // If there is no role ID in the content, return the empty collection
    if (!content) return roles;

    const guildRoles = await getRoles(guild);

    for (let index = 0; index < content.length; index++) {
        const roleId = content[index];
        const role = guildRoles.get(roleId);

        if (role) roles.set(roleId, role);
    }

    return roles;
}