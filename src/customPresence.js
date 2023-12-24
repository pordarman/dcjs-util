const {
    GuildMember,
    Presence,
    ActivityType
} = require("discord.js");

/**
 * Get the custom presence of a member or user
 * @param {GuildMember} member - The member or user to get the custom presence of 
 * @returns {Presence|null}
 */
module.exports = function customPresence(member) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");

    // If the member has no presence, return null
    return member.presence?.activities?.find(activity => activity.type == ActivityType.Custom) ?? null;
}