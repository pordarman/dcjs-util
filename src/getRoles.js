const {
    Role,
    Collection,
    Guild
} = require("discord.js");

/**
 * Pulls all roles on the server
 * @param {Guild} guild - The guild to pull roles
 * @returns {Promise<Collection<String, Role>>}
 */
module.exports = async function getGuildRoles(guild) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");

    return guild.roles.cache.size == 0 ? await guild.roles.fetch().catch(() => new Collection()) : guild.roles.cache;
}