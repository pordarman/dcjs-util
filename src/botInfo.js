const {
    User,
    GuildMember,
    Collection,
    Role
} = require("discord.js");
const memberRoles = require('./memberRoles');
const highestRole = require('./highestRole');
const memberDisplayHexColor = require('./memberDisplayHexColor');
const memberAvatar = require('./memberAvatar');
const userDisplayAvatar = require('./userDisplayAvatar');

/**
 * @typedef {Object} BotInfo
 * @property {String} name - The name of the bot
 * @property {String} tag - The tag of the bot
 * @property {String} id - The id of the bot
 * @property {String} globalName - The global name of the bot
 * @property {String} displayAvatar - The avatar of the bot
 * @property {?String} cpuName - The name of the cpu of the bot
 * @property {?String} platform - The platform of the bot
 * @property {Number} createdTimestamp - The timestamp of when the bot was created
 * @property {Number} readyTimestamp - The timestamp of when the bot was ready
 * @property {Number} guildCount - The number of guilds the bot is in
 * @property {Number} userCount - The number of users the bot can see
 * @property {Number} channelCount - The number of channels the bot can see
 * @property {Number} roleCount - The number of roles the bot can see
 * @property {Number} emojiCount - The number of emojis the bot can see
 * @property {Number} shardCount - The number of shards the bot has
 * @property {Number} ping - The ping of the bot
 * @property {Number} usedMemory - The used memory of the bot (in bytes)
 * @property {?Number} totalMemory - The total memory of the bot (in bytes)
 * @property {?Number} freeMemory - The free memory of the bot (in bytes)
 * @property {?Number} usedMemory - The used memory of the bot (in bytes)
 * @property {?Number} usedMemoryPercentage - The used memory percentage of the bot
 * @property {?Collection<String,Role>} roles - The roles of the bot
 * @property {?Role} highestRole - The highest role of the bot
 * @property {?String} displayHexColor - The display hex color of the bot
 * @property {?String} guildAvatar - The display avatar of the bot in the guild
 * @property {?Number} joinedTimestamp - The timestamp of when the bot joined the guild
 */

/**
 * Get the bot info
 * @param {User|GuildMember} userOrMember - The bot to get the info of
 * @returns {Promise<BotInfo>}
 */
module.exports = async function botInfo(userOrMember) {

    // Check the accuracy of the value in the entered parameters
    if (!(userOrMember instanceof User) && !(userOrMember instanceof GuildMember)) throw new TypeError("The entered \"bot\" value must be a User or GuildMember value!");

    const client = userOrMember.client;

    let clientUser;
    let member;

    // If the bot is in a guild
    if (userOrMember instanceof GuildMember) {
        clientUser = userOrMember.user;
        member = userOrMember;
    } else {
        clientUser = userOrMember;
    }

    // Create a new object
    const botInfoObject = {
        username: clientUser.username, // The name of the bot
        tag: clientUser.tag, // The tag of the bot
        id: clientUser.id, // The id of the bot
        globalName: clientUser.displayName, // The global name of the bot
        displayAvatar: userDisplayAvatar(clientUser), // The avatar of the bot
        createdTimestamp: clientUser.createdTimestamp, // The timestamp of when the bot was created
        readyTimestamp: client.readyTimestamp, // The timestamp of when the bot was ready
        guildCount: 0, // The number of guilds the bot is in
        userCount: 0, // The number of users the bot can see
        channelCount: 0, // The number of channels the bot can see
        roleCount: 0, // The number of roles the bot can see
        emojiCount: 0, // The number of emojis the bot can see
        shardCount: client.shard?.count ?? 1, // The number of shards the bot has
        ping: client.ws.ping, // The ping of the bot
        usedMemory: 0, // The used memory of the bot (in bytes)
    };

    // If the bot is in a guild
    if (member) {

        botInfoObject.roles = memberRoles(member); // The roles of the bot
        botInfoObject.highestRole = highestRole(member); // The highest role of the bot
        botInfoObject.displayHexColor = memberDisplayHexColor(member); // The display hex color of the bot
        botInfoObject.guildAvatar = memberAvatar(member); // The display avatar of the bot in the guild
        botInfoObject.joinedTimestamp = member.joinedTimestamp; // The timestamp of when the bot joined the guild
    }

    // If os package is installed
    try {
        const os = require('os');

        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();

        botInfoObject.totalMemory = totalMemory; // The total memory of the bot (in bytes)
        botInfoObject.freeMemory = freeMemory; // The free memory of the bot (in bytes)
        botInfoObject.usedMemory = totalMemory - freeMemory; // The used memory of the bot (in bytes)
        botInfos.usedMemoryPercentage = Math.round(botInfos.usedMemory / botInfos.totalMemory * 100); // The used memory percentage of the bot

        botInfoObject.cpuName = os.cpus()[0].model; // The name of the cpu of the bot
        botInfoObject.platform = os.platform(); // The platform of the bot
    } catch (_) { }

    // If shard is enabled
    if (client.shard) {

        // Get the data of all shards
        const allShardDatas = await client.shard.broadcastEval(
            (clientParam) => {
                const resultObject = {
                    guildCount: 0,
                    userCount: 0,
                    channelCount: 0,
                    roleCount: 0,
                    emojiCount: 0,
                    usedMemory: 0,
                }
                resultObject.guildCount += clientParam.guilds.cache.size;
                resultObject.channelCount += clientParam.channels.cache.size;
                resultObject.usedMemory += process.memoryUsage().heapUsed;

                // Loop through all guilds of the shard
                clientParam.guilds.cache.forEach(guild => {
                    resultObject.userCount += guild.memberCount;
                    resultObject.roleCount += guild.roles.cache.size;
                    resultObject.emojiCount += guild.emojis.cache.size;
                });

                return resultObject
            }
        );

        // Loop through all shard datas
        for (let i = 0; i < allShardDatas.length; i++) {
            const shardData = allShardDatas[i];
            for (const key in shardData) {
                botInfoObject[key] += shardData[key];
            }
        }
    }
    // If shard is disabled
    else {
        botInfoObject.guildCount = client.guilds.cache.size; // The number of guilds the bot is in
        botInfoObject.channelCount = client.channels.cache.size; // The number of channels the bot can see
        botInfoObject.usedMemory = process.memoryUsage().heapUsed; // The used memory of the bot

        // Loop through all guilds of the bot
        client.guilds.cache.forEach(guild => {
            botInfoObject.userCount += guild.memberCount;
            botInfoObject.roleCount += guild.roles.cache.size;
            botInfoObject.emojiCount += guild.emojis.cache.size;
        });
    }

    return botInfoObject;
}