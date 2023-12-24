const {
    GuildMember,
    Role
} = require("discord.js");
const getRoles = require("./getRoles");

/**
 * Get the hoist role of a member (faster than member.roles.hoist)
 * @param {GuildMember} member - The member to get the hoist role from
 * @returns {Role|null}
 */
module.exports = function hoistRole(member) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");

    const memberRoles = [...member["_roles"], member.guild.id];
    const allRoles = getRoles(member.guild);
    const hoistObject = {
        role: null,
        position: -1,
    };

    // Loop through all roles
    for (let i = 0; i < memberRoles.length; i++) {
        const role = allRoles.get(memberRoles[i]);

        // If the role is not hoisted, skip it
        if (!role.hoist) continue;

        if (role.position > hoistObject.position) {
            hoistObject.role = role;
            hoistObject.position = role.position;
        }
    }

    return hoistObject.role;
}