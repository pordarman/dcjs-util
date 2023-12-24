const {
    GuildMembber
} = require("discord.js");
const userDisplayAvatar = require("./userDisplayAvatar");
const memberAvatar = require("./memberAvatar");

/**
 * Get the default avatar of a member
 * @param {GuildMembber} member - The member to get the default avatar of 
 * @returns {String} 
 */
module.exports = function memberDisplayAvatar(member) {

    return memberAvatar(member) ?? userDisplayAvatar(member.user);
    
}