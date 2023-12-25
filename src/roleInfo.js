const {
    Role,
    Guild,
    PermissionsBitField,
    GuildMember,
    Collection
} = require("discord.js");
const fetchAllMembers = require("./fetchAllMembers.js");
const roleIcon = require("./roleIcon.js");

/**
 * @typedef {Object} RoleInfo
 * @property {String} id - The ID of the role
 * @property {String} name - The name of the role
 * @property {Number} color - The color of the role
 * @property {String} hexColor - The hex color of the role
 * @property {String} iconURL - The URL of the role's icon
 * @property {Boolean} hoist - Whether the role is hoisted
 * @property {Number} position - The position of the role
 * @property {PermissionsBitField} permissions - The permissions of the role
 * @property {Boolean} managed - Whether the role is managed
 * @property {Boolean} mentionable - Whether the role is mentionable
 * @property {Guild} guild - The guild of the role
 * @property {Number} createdTimestamp - The timestamp the role was created at
 * @property {Collection<String, GuildMember>} allMembers - The all members that have the role
 * @property {Collection<String, GuildMember>} members - The members that have the role (without bots)
 * @property {Collection<String, GuildMember>} bots - The bots that have the role
 * 
 */

/**
 * Get the information of a guild role
 * @param {Role} role - The role to get the information from
 * @returns {Promise<RoleInfo>}
 */
module.exports = async function roleInfo(role) {

    // Check the accuracy of the value in the entered parameters
    if (!(role instanceof Role)) throw new TypeError("The entered \"role\" value must be a Role value!");

    // Create a new object
    const roleInfoObject = {
        id: role.id, // The ID of the role
        name: role.name, // The name of the role
        color: role.color, // The color of the role
        hexColor: role.hexColor, // The hex color of the role
        iconURL: roleIcon(role), // The URL of the role's icon
        hoist: role.hoist, // Whether the role is hoisted
        position: role.position, // The position of the role
        permissions: role.permissions, // The permissions of the role
        managed: role.managed, // Whether the role is managed
        mentionable: role.mentionable, // Whether the role is mentionable
        deleted: role.deleted, // Whether the role is deleted
        guild: role.guild, // The guild of the role
        createdTimestamp: role.createdTimestamp, // The timestamp the role was created at
        allMembers: new Collection(), // The all members that have the role
        members: new Collection(), // The members that have the role (without bots)
        bots: new Collection() // The bots that have the role
    };

    const getAllMembers = await fetchAllMembers(role.guild);

    // Loop through all members
    getAllMembers.forEach(member => {

        // If the member has the role
        if (member["_roles"].includes(role.id)) {
            roleInfoObject.allMembers.set(member.id, member);

            // If the member is a bot
            if (member.user.bot) roleInfoObject.bots.set(member.id, member);
            else roleInfoObject.members.set(member.id, member);
        }
    });

    return roleInfoObject;
}