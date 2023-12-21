const {
    GuildMember,
    Guild
} = require("discord.js");
const fetchAllMembers = require("./fetchAllMembers.js")

/**
 * Fetches a member from the guild
 * @param {Guild} guild - The guild to fetch the member
 * @param {String} memberId - The member ID to fetch
 * @returns {Promise<GuildMember>}
 */
module.exports = async function fetchMember(guild, memberId) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (typeof memberId !== "string") throw new TypeError("The entered \"memberId\" value must be a String value!");
    if (!/^\d{17,20}$/.test(memberId)) throw new TypeError("The entered \"memberId\" value must be a valid member ID!");

    const allMembers = await fetchAllMembers(guild);
    return allMembers.get(memberId);
}