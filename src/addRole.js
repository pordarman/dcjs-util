const {
    GuildMember,
    Role,
    Collection
} = require("discord.js");
const addRoles = require("./addRoles");

/**
 * Add a role to the member
 * @param {GuildMember} member - The member to add the role
 * @param {Role|String} role - The role to add
 * @returns {Promise<GuildMember>}
 */
module.exports = function addRole(member, role) {

    // If role is Array or Collection, call another function
    if (role instanceof Array || role instanceof Collection) return addRoles(member, role);

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");
    if (!(role instanceof Role || typeof role == "string")) throw new TypeError("The entered \"role\" value must be a Role or String value!");

    if (typeof role == "string") role = member.guild.roles.cache.get(role);

    // Check if the role is a valid role
    if (!role) throw new TypeError("The entered \"role\" value must be a valid role ID!");

    return member.roles.add(role);
}