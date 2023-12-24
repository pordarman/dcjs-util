const {
    GuildMember
} = require("discord.js");
const colorRole = require("./colorRole");

/**
 * Get the color of a member (faster than member.displayColor)
 * @param {GuildMember} member - 
 * @returns {Number}
 */
module.exports = function memberDisplayColor(member) {

    return colorRole(member)?.color ?? 0;

}