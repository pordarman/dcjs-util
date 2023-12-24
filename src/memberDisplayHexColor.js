const {
    GuildMember
} = require("discord.js");
const colorRole = require("./colorRole");

/**
 * Get the hex color of a member (faster than member.displayHexColor)
 * @param {GuildMember} member - 
 * @returns {String}
 */
module.exports = function memberDisplayHexColor(member) {

    return colorRole(member)?.hexColor ?? "#000000";

}