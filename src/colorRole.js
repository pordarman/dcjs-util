const {
    GuildMember,
    Role
} = require("discord.js");
const getRoles = require("./getRoles");

/**
 * Get the color role of a member (faster than member.roles.color)
 * @param {GuildMember} member - The member to get the color role from
 * @returns {Role|null}
 */
module.exports = function colorRole(member) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");

    const memberRoles = [...member["_roles"], member.guild.id];
    const allRoles = getRoles(member.guild);
    const colorObject = {
        role: null,
        position: -1,
    };

    // Loop through all roles
    for (let i = 0; i < memberRoles.length; i++) {
        const role = allRoles.get(memberRoles[i]);

        // If the role has no color, skip it
        if (!role.color) continue;

        if (role.position > colorObject.position) {
            colorObject.role = role;
            colorObject.position = role.position;
        }
    }

    return colorObject.role;
}