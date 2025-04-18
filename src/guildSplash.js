const {
    Guild
} = require("discord.js");

/**
 * Get the splash of a guild
 * @param {Guild} guild - The guild to get the splash of
 * @returns {String|null}
 */
module.exports = function guildSplash(guild) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");

    // If the guild has no splash, return null
    if (!guild.splash) return null;

    // If the guild has a gif splash, return the gif splash
    return guild.splashURL({ extension: "png", forceStatic: true, size: 4096 });
}