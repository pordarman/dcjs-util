const {
    GuildMember,
    Guild,
    Collection
} = require("discord.js");
const fetchAllMembers = require("./fetchAllMembers.js");

/**
 * Fetch discord members in content
 * @param {Guild} guild - The guild to fetch members
 * @param {String} content - The content to fetch members
 * @returns {Promise<Collection<String,GuildMember|null>>}
 */
module.exports = async function fetchMembersInContent(guild, content) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");

    // Fetch member IDs from content
    const content = content.match(/\d{17,20}/g);

    const members = new Collection();

    // If there is no member ID in the content, return the empty collection
    if (!content) return members;

    const guildMembers = await fetchAllMembers(guild);

    for (let index = 0; index < content.length; index++) {
        const memberId = content[index];
        const member = guildMembers.get(memberId);

        if (member) members.set(memberId, member);
    }

    return members;
}