let Discord;

// Check if discord.js is installed
try {
    Discord = require('discord.js');
} catch (_) {
    throw new Error("discord.js is required");
}

// Check for updates
try {
    import("node-fetch").then(async (fetch) => {
        const fetchPackage = await fetch.default("https://registry.npmjs.org/dcjs-util");
        const fetchJson = await fetchPackage.json();

        const package = require("./package.json");

        // Get the latest version of the package
        const version = fetchJson["dist-tags"].latest;

        // If the version of the package is not the latest, warn the user
        if (version != package.version) {
            console.log(`Your version is outdated "${package.version}", Use: "npm i ${package.name}@${version}" to get new features!`)
        }
    }).catch(() => { });
} catch (_) { }

// If discord version is not v14, throw error
if (Discord.version.split('.')[0] !== "14") throw new Error("Discord.js v14 required");

// Load all commands
module.exports = {
    addReaction: require("./src/addReaction"),
    addRole: require("./src/addRole"),
    addRoles: require("./src/addRoles"),
    botInfo: require("./src/botInfo"),
    botRole: require("./src/botRole"),
    colorRole: require("./src/colorRole"),
    customPresence: require("./src/customPresence"),
    deleteMessage: require("./src/deleteMessage"),
    editMessage: require("./src/editMessage"),
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
    getGuildEmojis: require("./src/getGuildEmojis"),
    getRoles: require("./src/getRoles"),
    guildInfo: require("./src/guildInfo"),
    guildShardId: require("./src/guildShardId"),
    hasAnyRole: require("./src/hasAnyRole"),
    hasEveryRole: require("./src/hasEveryRole"),
    hasMember: require("./src/hasMember"),
    hasPermission: require("./src/hasPermission"),
    hasRole: require("./src/hasRole"),
    highestRole: require("./src/highestRole"),
    hoistRole: require("./src/hoistRole"),
    iconRole: require("./src/iconRole"),
    infiniteSetTimeout: require("./src/infiniteSetTimeout"),
    isBot: require("./src/isBot"),
    isDM: require("./src/isDM"),
    isGuild: require("./src/isGuild"),
    isMember: require("./src/isMember"),
    isUser: require("./src/isUser"),
    memberAvatar: require("./src/memberAvatar"),
    memberDisplayAvatar: require("./src/memberDisplayAvatar"),
    memberDisplayColor: require("./src/memberDisplayColor"),
    memberDisplayHexColor: require("./src/memberDisplayHexColor"),
    memberRoles: require("./src/memberRoles"),
    numberToOrdinalRank: require("./src/numberToOrdinalRank"),
    removeDiscordMarkdown: require("./src/removeDiscordMarkdown"),
    removeMarkdown: require("./src/removeMarkdown"),
    removeRole: require("./src/removeRole"),
    removeRoles: require("./src/removeRoles"),
    sendMessage: require("./src/sendMessage"),
    splitMessage: require("./src/splitMessage"),
    spotifyPresence: require("./src/spotifyPresence"),
    streamPresence: require("./src/streamPresence"),
    toHumanize: require("./src/toHumanize"),
    userAvatar: require("./src/userAvatar"),
    userDisplayAvatar: require("./src/userDisplayAvatar"),
    veryDeepEqual: require("./src/veryDeepEqual"),
    wait: require("./src/wait"),
    waitAndDeleteMessage: require("./src/waitAndDeleteMessage"),
    waitAndEditMessage: require("./src/waitAndEditMessage"),
    waitAndSendMessage: require("./src/waitAndSendMessage"),
    waitFirstMessage: require("./src/waitFirstMessage"),
    waitMessages: require("./src/waitMessages"),
}