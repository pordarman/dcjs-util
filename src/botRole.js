const {
    GuildMember,
    Role
} = require("discord.js");
const getRoles = require("./getRoles");

/**
 * Get the bot role of a member (faster than member.roles.botRole)
 * @param {GuildMember} member - The member to get the bot role from
 * @returns {Role|null}
 */
module.exports = function botRole(member) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");
    if (!member.user.bot) return null;

    const memberRoles = member["_roles"];
    const allRoles = getRoles(member.guild);

    // Loop through all roles
    for (let i = 0; i < memberRoles.length; i++) {
        const role = allRoles.get(memberRoles[i]);

        // If the role is a bot role, return it
        if (role.managed) return role;
    }

    return null;
}