const Discord = require('discord.js');

// If discord version is not v14, throw error
if (Discord.version.split('.')[0] !== "14") throw new Error("Discord.js v14 required");

// Load all commands
module.exports = {
    addRole: require("./src/addRole"),
    addRoles: require("./src/addRoles"),
    fetchAllMembers: require("./src/fetchAllMembers"),
    fetchChannel: require("./src/fetchChannel"),
    fetchChannelInContent: require("./src/fetchChannelInContent"),
    fetchChannels: require("./src/fetchChannels"),
    fetchChannelsInContent: require("./src/fetchChannelsInContent"),
    fetchMember: require("./src/fetchMember"),
    fetchMemberInContent: require("./src/fetchMemberInContent"),
    fetchMembers: require("./src/fetchMembers"),
    fetchMembersInContent: require("./src/fetchMembersInContent"),
    fetchRole: require("./src/fetchRole"),
    fetchRoleInContent: require("./src/fetchRoleInContent"),
    fetchRoles: require("./src/fetchRoles"),
    fetchRolesInContent: require("./src/fetchRolesInContent"),
    fetchUser: require("./src/fetchUser"),
    fetchUserInContent: require("./src/fetchUserInContent"),
    fetchUsers: require("./src/fetchUsers"),
    fetchUsersInContent: require("./src/fetchUsersInContent"),
    getAllChannels: require("./src/getAllChannels"),
    getGuildChannels: require("./src/getGuildChannels"),
    getRoles: require("./src/getRoles"),
    guildShardId: require("./src/guildShardId"),
    hasAnyRole: require("./src/hasAnyRole"),
    hasEveryRole: require("./src/hasEveryRole"),
    hasMember: require("./src/hasMember"),
    hasRole: require("./src/hasRole"),
    isBot: require("./src/isBot"),
    isMember: require("./src/isMember"),
    isUser: require("./src/isUser"),
    removeRole: require("./src/removeRole"),
    removeRoles: require("./src/removeRoles"),
    splitMessage: require("./src/splitMessage"),
}