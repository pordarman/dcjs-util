const {
    GuildMember,
    Guild
} = require("discord.js");
const fetchMember = require("./fetchMember.js");

/**
 * Retrieves a member from the text entered
 * @param {Guild} guild - The guild to fetch member
 * @param {String} content - The content to fetch member
 * @returns {Promise<GuildMember|null>}
 */
module.exports = function fetchMemberInContent(guild, content) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");

    // Fetch member ID from content
    const userId = content.match(/\d{17,20}/);

    return userId ? fetchMember(guild, userId[0]) : null;
}