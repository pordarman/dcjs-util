const {
    Guild
} = require("discord.js");

/**
 * Get the discoverySplash of a guild
 * @param {Guild} guild - The guild to get the discoverySplash of
 * @returns {String|null}
 */
module.exports = function guildSplash(guild) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");

    // If the guild has no discoverySplash, return null
    if (!guild.discoverySplash) return null;

    // If the guild has a gif discoverySplash, return the gif discoverySplash
    return guild.discoverySplashURL({ extension: "png", forceStatic: true, size: 4096 });
}