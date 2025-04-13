const {
    GuildMember
} = require("discord.js");

/**
 * Get the avatar of a member in guild
 * @param {GuildMember} member - The member to get the avatar of
 * @returns {String|null}
 */
module.exports = function memberAvatar(member) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");

    // If the member has no avatar, return null
    if (!member.avatar) return null;

    // If the member has a gif avatar, return the gif avatar
    return member.avatarURL({ extension: "png", forceStatic: true, size: 4096 });
}