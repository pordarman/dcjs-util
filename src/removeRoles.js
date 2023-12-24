const {
    GuildMember,
    Role,
    Collection
} = require("discord.js");
const removeRole = require("./removeRole");

/**
 * Remove roles to the member
 * @param {GuildMember} member - The member to rmove the role
 * @param {Collection<String,Role>|Array<String>} roles - The roles to rmove
 * @returns {Promise<GuildMember>}
 */
module.exports = function removeRoles(member, roles) {

    // If roles is string, call another function
    if (typeof roles == "string") return removeRole(member, roles);

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");
    if (!(roles instanceof Collection || Array.isArray(roles))) throw new TypeError("The entered \"roles\" value must be a Collection or Array value!");

    const removedRoles = [];

    if (roles instanceof Collection) {
        for (const [roleId, role] of roles.entries()) {

            // Check if the role is a valid role
            if (!(role instanceof Role)) throw new TypeError("The entered \"roles\" value must be a Collection of Role values!");

            removedRoles.push(roleId);
        }
    } else {
        for (let index = 0; index < roles.length; index++) {
            const roleId = roles[index];

            // Check if the role is a valid role
            if (typeof roleId !== "string") throw new TypeError("The entered \"roles\" value must be an Array of String values!");
            if (!/^\d{17,20}$/.test(roleId)) throw new TypeError("The entered \"roles\" value must be an Array of valid role IDs!");
            if (!member.guild.roles.cache.has(roleId)) throw new TypeError("The entered \"roles\" value must be an Array of valid role IDs!");

            removedRoles.push(roleId);
        }
    }

    return member.roles.remove(removedRoles);
}