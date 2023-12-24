const {
    GuildMember,
    Role
} = require("discord.js");

/**
 * Checks if the member has the role
 * @param {GuildMember} member - Member whose role will be checked
 * @param {Role|String} role - Role or ID to check
 * @returns {Boolean}
 */
module.exports = function addRole(member, role) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");
    if (!(role instanceof Role || typeof role == "string")) throw new TypeError("The entered \"role\" value must be a Role or String value!");

    if (role instanceof Role) role = role.id;

    return member["_roles"].includes(role);
}