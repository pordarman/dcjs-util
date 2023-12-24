const {
    GuildMember,
    Role
} = require("discord.js");
const getRoles = require("./getRoles");

/**
 * Get the icon role of a member (faster than member.roles.icon)
 * @param {GuildMember} member - The member to get the icon role from
 * @returns {Role|null}
 */
module.exports = function iconRole(member) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");

    const memberRoles = [...member["_roles"], member.guild.id];
    const allRoles = getRoles(member.guild);
    const iconObject = {
        role: null,
        position: -1,
    };

    // Loop through all roles
    for (let i = 0; i < memberRoles.length; i++) {
        const role = allRoles.get(memberRoles[i]);

        // If the role has no icon, skip it
        if (!role.icon) continue;

        if (role.position > iconObject.position) {
            iconObject.role = role;
            iconObject.position = role.position;
        }
    }

    return iconObject.role;
}