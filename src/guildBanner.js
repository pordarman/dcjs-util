const {
    Guild
} = require("discord.js");

/**
 * Get the banner of a guild
 * @param {Guild} guild - The guild to get the banner of
 * @returns {String|null}
 */
module.exports = function guildBanner(guild) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");

    // If the guild has no banner, return null
    if (!guild.banner) return null;

    // If the guild has a gif banner, return the gif banner
    return guild.bannerURL({ extension: "png", forceStatic: true, size: 4096 });
}