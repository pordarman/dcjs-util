const {
    GuildMember,
    Guild,
    Collection
} = require("discord.js");
const fetchAllMembers = require("./fetchAllMembers.js");

/**
 * Fetch discord members
 * @param {Guild} guild - The guild to fetch members
 * @param {Array<String>} memberIds - The member IDs to fetch
 * @returns {Promise<Collection<String,GuildMember>>}
 */
module.exports = async function fetchMembers(guild, memberIds) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (!Array.isArray(memberIds)) throw new TypeError("The entered \"memberIds\" value must be a Array value!");

    const members = new Collection();
    const guildMembers = await fetchAllMembers(guild);

    for (let index = 0; index < memberIds.length; index++) {
        const memberId = memberIds[index];

        // Check if the memberId is a string
        if (typeof memberId !== "string") throw new TypeError("The entered \"memberIds\" value must be an Array of String values!");

        const member = guildMembers.get(memberId);
        if (member) members.set(memberId, member);
    }

    return members;
}