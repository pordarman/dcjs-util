const {
    Guild,
    GuildMember,
    Collection,
} = require("discord.js");

/**
 * Pulls all members on the server
 * @param {Guild} guild - The guild to pull members
 * @returns {Promise<Collection<String, GuildMember>>}
 */
module.exports = async function fetchAllMembers(guild) {
    const cache = guild.members.cache;

    // Return cached data if all members are withdrawn
    return guild.memberCount == cache.size ?
        cache :
        await guild.members.fetch().catch(() => new Collection());
}