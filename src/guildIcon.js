const {
    Guild
} = require("discord.js");

/**
 * Get the icon of a guild
 * @param {Guild} guild - The guild to get the icon of
 * @returns {String|null}
 */
module.exports = function guildIcon(guild) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");

    // If the guild has no icon, return null
    if (!guild.icon) return null;

    // If the guild has a gif icon, return the gif icon
    return guild.iconURL({ extension: "png", forceStatic: true, size: 4096 });
}