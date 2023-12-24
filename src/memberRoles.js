const {
    GuildMember,
    Collection,
    Role
} = require("discord.js");
const getRoles = require("./getRoles");

/**
 * Get the roles of a member (faster than member.roles.cache)
 * @param {GuildMember} member - The member to get the roles from
 * @returns {Collection<String,Role>}
 */
module.exports = function memberRoles(member) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");

    // Create a new collection of roles
    const roles = new Collection();
    const memberRoles = [...member["_roles"], member.guild.id];
    const allRoles = getRoles(member.guild);

    // Loop through all roles
    for (let i = 0; i < memberRoles.length; i++) {
        const role = allRoles.get(memberRoles[i]);

        roles.set(role.id, role);
    }

    return roles;
}