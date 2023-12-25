const {
    GuildMember
} = require("discord.js");
const allPermissions = new Set([
    "CreateInstantInvite",
    "KickMembers",
    "BanMembers",
    "Administrator",
    "ManageChannels",
    "ManageGuild",
    "AddReactions",
    "ViewAuditLog",
    "PrioritySpeaker",
    "Stream",
    "ViewChannel",
    "SendMessages",
    "SendTTSMessages",
    "ManageMessages",
    "EmbedLinks",
    "AttachFiles",
    "ReadMessageHistory",
    "MentionEveryone",
    "UseExternalEmojis",
    "ViewGuildInsights",
    "Connect",
    "Speak",
    "MuteMembers",
    "DeafenMembers",
    "MoveMembers",
    "UseVAD",
    "ChangeNickname",
    "ManageNicknames",
    "ManageRoles",
    "ManageWebhooks",
    "ManageEmojisAndStickers",
    "ManageGuildExpressions",
    "UseApplicationCommands",
    "RequestToSpeak",
    "ManageEvents",
    "ManageThreads",
    "CreatePublicThreads",
    "CreatePrivateThreads",
    "UseExternalStickers",
    "SendMessagesInThreads",
    "UseEmbeddedActivities",
    "ModerateMembers",
    "ViewCreatorMonetizationAnalytics",
    "UseSoundboard",
    "UseExternalSounds",
    "SendVoiceMessages"
]);

/**
 * Checks if the member has the permission
 * @param {GuildMember} member - Member whose permission will be checked
 * @param {"CreateInstantInvite"|"KickMembers"|"BanMembers"|"Administrator"|"ManageChannels"|"ManageGuild"|"AddReactions"|"ViewAuditLog"|"PrioritySpeaker"|"Stream"|"ViewChannel"|"SendMessages"|"SendTTSMessages"|"ManageMessages"|"EmbedLinks"|"AttachFiles"|"ReadMessageHistory"|"MentionEveryone"|"UseExternalEmojis"|"ViewGuildInsights"|"Connect"|"Speak"|"MuteMembers"|"DeafenMembers"|"MoveMembers"|"UseVAD"|"ChangeNickname"|"ManageNicknames"|"ManageRoles"|"ManageWebhooks"|"ManageEmojisAndStickers"|"ManageGuildExpressions"|"UseApplicationCommands"|"RequestToSpeak"|"ManageEvents"|"ManageThreads"|"CreatePublicThreads"|"CreatePrivateThreads"|"UseExternalStickers"|"SendMessagesInThreads"|"UseEmbeddedActivities"|"ModerateMembers"|"ViewCreatorMonetizationAnalytics"|"UseSoundboard"|"UseExternalSounds"|"SendVoiceMessages"} permission - Permission to check
 * @returns {Boolean}
 */
module.exports = function hasPermission(member, permission) {

    // Check the accuracy of the value in the entered parameters
    if (!(member instanceof GuildMember)) throw new TypeError("The entered \"member\" value must be a GuildMember value!");
    if (typeof permission !== "string") throw new TypeError("The entered \"permission\" value must be a String value!");
    if (!allPermissions.has(permission)) throw new TypeError("The entered \"permission\" value must be a valid permission!");

    const memberRoleIds = [...member["_roles"], member.guild.id];

    return memberRoleIds.some(roleId => member.guild.roles.cache.get(roleId).permissions.has(permission));
}