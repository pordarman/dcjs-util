const {
    GuildMember,
    Collection
} = require("discord.js");
const memberAvatar = require('./memberAvatar');
const userDisplayAvatar = require('./userDisplayAvatar');
const userBanner = require('./userBanner');

/**
 * @typedef {Object} GuildMemberInfo
 * @property {String} id - The ID of the member
 * @property {User} user - The user of the member
 * @property {String} nickname - The nickname of the member
 * @property {String} displayName - The display name of the member
 * @property {String} guildAvatarURL - The URL of the member's avatar in the guild
 * @property {String} bannerURL - The URL of the member's banner
 * @property {String} displayHexColor - The display hex color of the member
 * @property {Number} joinedTimestamp - The timestamp of when the member joined the guild
 * @property {Number} premiumSinceTimestamp - The timestamp of when the member boosted the guild
 * @property {Guild} guild - The guild of the member
 * @property {Collection<String, Role>} roles - The roles of the member
 * @property {Collection<String, Role>} rolesWithoutEveryone - The roles of the member without the everyone role
 * @property {Role} highestRole - The highest role of the member
 * @property {Permissions} permissions - The permissions of the member
 * @property {VoiceState} voice - The voice state of the member
 * @property {VoiceChannel} voiceChannel - The voice channel of the member
 * @property {Presence} presence - The presence of the member
 * @property {String} displayAvatarURL - The display avatar of the member
 */

/**
 * Get the information of a guild member
 * @param {GuildMember} member - The member to get the information from
 * @returns {GuildMemberInfo}
 */
module.exports = async function memberInfo(member) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");

    // Fetch the member because banner is not cached
    member.user.fetch(true).catch(() => { });

    // Create memberInfo object
    const memberInfoObject = {
        id: member.id, // The ID of the member
        user: member.user, // The user of the member
        nickname: member.nickname, // The nickname of the member
        displayName: member.displayName, // The display name of the member
        guildAvatarURL: memberAvatar(member), // The URL of the member's avatar in the guild
        bannerURL: userBanner(member.user), // The URL of the member's banner
        displayHexColor: null, // The display hex color of the member
        joinedTimestamp: member.joinedTimestamp, // The timestamp of when the member joined the guild
        premiumSinceTimestamp: member.premiumSinceTimestamp, // The timestamp of when the member boosted the guild
        guild: member.guild, // The guild of the member
        roles: new Collection(), // The roles of the member
        rolesWithoutEveryone: new Collection(), // The roles of the member without the everyone role
        highestRole: null, // The highest role of the member
        permissions: member.permissions, // The permissions of the member
        voice: member.voice, // The voice state of the member
        voiceChannel: member.voice.channel, // The voice channel of the member
        presence: member.presence, // The presence of the member
    };

    memberInfoObject.displayAvatarURL = memberInfoObject.guildAvatarURL ?? userDisplayAvatar(member.user);

    // Loop through all roles of the member and add them to the memberInfo object
    const highestRoleObject = {
        role: null,
        position: -1,
    };
    const displayHexColorObject = {
        role: null,
        position: -1,
    };
    const memberRoles = [...member["_roles"], member.guild.id];
    for (let i = 0; i < memberRoles.length; ++i) {
        const role = member.guild.roles.cache.get(memberRoles[i]);

        // Add the role to the memberInfo object
        memberInfoObject.roles.set(role.id, role);
        if (role.id !== member.guild.id) memberInfoObject.rolesWithoutEveryone.set(role.id, role);

        // If the role is higher than the highest role, set the highest role to the role
        if (role.position > highestRoleObject.position) {
            highestRoleObject.role = role;
            highestRoleObject.position = role.position;

            // If the role has a color, set the displayHexColor to the color
            if (role.color) {
                displayHexColorObject.role = role;
                displayHexColorObject.position = role.position;
            }
        }
    };

    // Add the highest role and hexColor to the memberInfo object
    memberInfoObject.highestRole = highestRoleObject.role;
    memberInfoObject.displayHexColor = displayHexColorObject.role?.hexColor ?? "#000000";

    return memberInfoObject;
}