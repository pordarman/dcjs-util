const {
    GuildMember,
    Guild
} = require("discord.js");
const fetchAllMembers = require("./fetchAllMembers.js")

/**
 * Checks if the member is in the guild
 * @param {Guild} guild - The guild to fetch the member
 * @param {String} memberId - The member ID to check
 * @returns {Promise<Boolean>}
 */
module.exports = async function hasMember(guild, memberId) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (typeof memberId !== "string") throw new TypeError("The entered \"memberId\" value must be a String value!");
    if (!/^\d{17,20}$/.test(memberId)) throw new TypeError("The entered \"memberId\" value must be a valid member ID!");

    const allMembers = await fetchAllMembers(guild);
    return allMembers.has(memberId);
}