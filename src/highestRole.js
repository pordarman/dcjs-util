const {
    GuildMember,
    Role
} = require("discord.js");
const getRoles = require("./getRoles");

/**
 * Get the highest role of a member (faster than member.roles.highest)
 * @param {GuildMember} member - The member to get the highest role from
 * @returns {Role}
 */
module.exports = function highestRole(member) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");

    const memberRoles = [...member["_roles"], member.guild.id];
    const allRoles = getRoles(member.guild);
    const highestObject = {
        role: null,
        position: -1,
    };

    // Loop through all roles
    for (let i = 0; i < memberRoles.length; i++) {
        const role = allRoles.get(memberRoles[i]);

        if (role.position > highestObject.position) {
            highestObject.role = role;
            highestObject.position = role.position;
        }
    }

    return highestObject.role;
}