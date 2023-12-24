const {
    Guild,
    GuildChannel,
    Collection,
    Role,
    GuildEmoji,
    Presence,
    VoiceState,
    ChannelType
} = require("discord.js");
const fetchAllMembers = require("./fetchAllMembers");
const getGuildEmojis = require("./getGuildEmojis");
const getRoles = require("./getRoles");
const getGuildChannels = require("./getGuildChannels");
const guildIcon = require("./guildIcon");
const guildBanner = require("./guildBanner");
const guildSplash = require("./guildSplash");
const guildDiscoverySplash = require("./guildDiscoverySplash");

/**
 * @typedef {Object} GuildInfo
 * @property {String} name - Guild name
 * @property {String} id - Guild id
 * @property {Number} memberCount - Guild member count
 * @property {String} iconURL - Guild icon
 * @property {String} bannerURL - Guild banner
 * @property {String} splashURL - Guild splash
 * @property {String} discoverySplashURL - Guild discovery splash
 * @property {String} description - Guild description
 * @property {Number} createdTimestamp - Guild created timestamp
 * @property {String} preferredLocale - Guild preferred locale
 * @property {String} explicitContentFilter - Guild explicit content filter
 * @property {String} verificationLevel - Guild verification level
 * @property {String} defaultMessageNotifications - Guild default message notifications
 * @property {?GuildChannel} afkChannel - Guild afk channel
 * @property {Number} afkTimeout - Guild afk timeout (in seconds)
 * @property {?GuildChannel} systemChannel - Guild system channel
 * @property {?GuildChannel} rulesChannel - Guild rules channel
 * @property {?GuildChannel} publicUpdatesChannel - Guild public updates channel
 * @property {GuildMember} owner - Guild owner
 * @property {Collection<String,GuildMember>} guildMembers - All guild members (bots and members)
 * @property {Collection<String,GuildMember>} members - Guild members (without bots)
 * @property {Collection<String,GuildMember>} bots - Guild bots
 * @property {Collection<String,GuildEmoji>} emojis - All Guild emojis (animated and static)
 * @property {Collection<String,GuildEmoji>} animatedEmojis - Guild animated emojis
 * @property {Collection<String,GuildEmoji>} staticEmojis - Guild static emojis
 * @property {Collection<String,Role>} roles - All guild roles
 * @property {Role} highestRole - Guild highest role
 * @property {Collection<String,GuildChannel>} channels - Guild channels
 * @property {Collection<String,GuildChannel>} textChannels - Guild text channels
 * @property {Collection<String,GuildChannel>} voiceChannels - Guild voice channels
 * @property {Collection<String,GuildChannel>} categoryChannels - Guild category channels
 * @property {Collection<String,GuildChannel>} otherChannels - Guild other channels (news, store, ...)
 * @property {Presence} presences - Guild presences
 * @property {Collection<String,GuildMember>} onlineMembers - Guild online members
 * @property {Collection<String,GuildMember>} offlineMembers - Guild offline members
 * @property {Collection<String,GuildMember>} idleMembers - Guild idle members
 * @property {Collection<String,GuildMember>} dndMembers - Guild dnd members
 * @property {Collection<String,VoiceState>} voiceStates - Guild voice states
 * @property {Array<String>} features - Guild features
 * @property {Number} mfaLevel - Guild mfa level
 * @property {Number} premiumTier - Guild premium tier
 * @property {?Number} premiumSubscriptionCount - Guild premium subscription count
 * @property {?Boolean} widgetEnabled - Guild widget enabled
 * @property {?GuildChannel} widgetChannel - Guild widget channel
 * @property {?String} vanityURLCode - Guild vanity url code
 * @property {?Number} vanityURLUses - Guild vanity url uses
 * @property {String} systemChannelFlags - Guild system channel flags
 */

/**
 * Get the info of a guild 
 * @param {Guild} guild - The guild to get the info from
 * @returns {Promise<GuildInfo>}
 */
module.exports = async function guildInfo(guild) {

    // Check the accuracy of the value in the entered parameters
    if (!(guild instanceof Guild)) throw new TypeError("The entered \"guild\" value must be a Guild value!");

    const allGuildMembers = await fetchAllMembers(guild);

    const allBots = new Collection();
    const allMembers = new Collection();

    // Loop through all members
    allGuildMembers.forEach(member => {
        if (member.user.bot) allBots.set(member.id, member);
        else allMembers.set(member.id, member);
    });

    const allGuildEmojis = getGuildEmojis(guild);

    const animatedEmojis = new Collection();
    const staticEmojis = new Collection();

    // Loop through all emojis
    allGuildEmojis.forEach(emoji => {
        if (emoji.animated) animatedEmojis.set(emoji.id, emoji);
        else staticEmojis.set(emoji.id, emoji);
    });

    const allRoles = getRoles(guild);
    const allChannels = getGuildChannels(guild);

    const highestRoleObject = {
        role: null,
        position: -1,
    };

    // Loop through all roles
    allRoles.forEach(role => {
        if (role.position > highestRoleObject.position) {
            highestRoleObject.role = role;
            highestRoleObject.position = role.position;
        }
    });

    const channelCollections = {
        text: new Collection(),
        voice: new Collection(),
        category: new Collection(),
        others: new Collection()
    };

    // Loop through all channels and add them to the corresponding collection
    allChannels.forEach(channel => {
        switch (channel.type) {
            case ChannelType.GuildText:
                channelCollections.text.set(channel.id, channel);
                break;

            case ChannelType.GuildVoice:
                channelCollections.voice.set(channel.id, channel);
                break;

            case ChannelType.GuildCategory:
                channelCollections.category.set(channel.id, channel);
                break;

            default:
                channelCollections.others.set(channel.id, channel);
                break;
        }
    });

    const userPresenceCollection = {
        online: new Collection(),
        offline: new Collection(),
        idle: new Collection(),
        dnd: new Collection()
    };

    // Loop through all members
    allGuildMembers.forEach(member => {
        const presence = member.presence;

        // If the member has no presence, skip it
        if (!presence) return;

        // Add the member to the corresponding collection
        userPresenceCollection[presence.status].set(member.id, member);
    });

    const guildInfosObject = {
        name: guild.name, // Guild name
        id: guild.id, // Guild id
        memberCount: guild.memberCount, // Guild member count
        iconURL: guildIcon(guild), // Guild icon
        bannerURL: guildBanner(guild), // Guild banner
        splashURL: guildSplash(guild), // Guild splash
        discoverySplashURL: guildDiscoverySplash(guild), // Guild discovery splash
        description: guild.description, // Guild description
        createdTimestamp: guild.createdTimestamp, // Guild created timestamp
        preferredLocale: guild.preferredLocale, // Guild preferred locale
        explicitContentFilter: guild.explicitContentFilter, // Guild explicit content filter
        verificationLevel: guild.verificationLevel, // Guild verification level
        defaultMessageNotifications: guild.defaultMessageNotifications, // Guild default message notifications
        afkChannel: guild.afkChannel, // Guild afk channel
        afkTimeout: guild.afkTimeout, // Guild afk timeout (in seconds)
        systemChannel: guild.systemChannel, // Guild system channel
        rulesChannel: guild.rulesChannel, // Guild rules channel
        publicUpdatesChannel: guild.publicUpdatesChannel, // Guild public updates channel
        owner: allMembers.get(guild.ownerId), // Guild owner
        guildMembers: allGuildMembers, // All guild members (bots and members)
        members: allMembers, // Guild members (without bots)
        bots: allBots, // Guild bots
        emojis: allGuildEmojis, // All Guild emojis (animated and static)
        animatedEmojis: animatedEmojis, // Guild animated emojis 
        staticEmojis: staticEmojis, // Guild static emojis
        roles: allRoles, // All guild roles
        highestRole: highestRoleObject.role, // Guild highest role
        channels: allChannels, // Guild channels
        textChannels: channelCollections.text, // Guild text channels
        voiceChannels: channelCollections.voice, // Guild voice channels
        categoryChannels: channelCollections.category, // Guild category channels
        otherChannels: channelCollections.others, // Guild other channels (news, store, ...)
        presences: guild.presences.cache, // Guild presences
        onlineMembers: userPresenceCollection.online, // Guild online members
        offlineMembers: userPresenceCollection.offline, // Guild offline members
        idleMembers: userPresenceCollection.idle, // Guild idle members
        dndMembers: userPresenceCollection.dnd, // Guild dnd members
        voiceStates: guild.voiceStates.cache, // Guild voice states
        features: guild.features, // Guild features
        mfaLevel: guild.mfaLevel, // Guild mfa level
        premiumTier: guild.premiumTier, // Guild premium tier
        premiumSubscriptionCount: guild.premiumSubscriptionCount, // Guild premium subscription count
        widgetEnabled: guild.widgetEnabled, // Guild widget enabled
        widgetChannel: guild.widgetChannel, // Guild widget channel
        vanityURLCode: guild.vanityURLCode, // Guild vanity url code
        vanityURLUses: guild.vanityURLUses, // Guild vanity url uses
        systemChannelFlags: guild.systemChannelFlags, // Guild system channel flags
    }

    return guildInfosObject;
}