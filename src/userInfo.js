const {
    User,
    UserFlags
} = require("discord.js");
const userAvatar = require('./userAvatar');
const userDisplayAvatar = require('./userDisplayAvatar');
const userBanner = require('./userBanner');
const userAvatarDecoration = require('./userAvatarDecoration');

/**
 * @typedef {Object} UserInfo
 * @property {String} username - The name of the user
 * @property {String} discriminator - The discriminator of the user
 * @property {String} id - The ID of the user
 * @property {Boolean} bot - Whether the user is a bot
 * @property {Client} client - The client of the user
 * @property {Number} createdTimestamp - The timestamp the user was created at
 * @property {String} globalName - The global name of the user
 * @property {String} avatarURL - The URL of the user's avatar
 * @property {?String} bannerURL - The URL of the user's banner
 * @property {String} displayAvatarURL - The display avatar of the user
 * @property {?String} avatarDecorationURL - The avatar decoration of the user
 * @property {UserFlags} flags - The flags of the user
 * @property {Number} accentColor - The accent color of the user
 * @property {String} hexAccentColor - The hex accent color of the user
 */

/**
 * Get the information of a guild user
 * @param {User} user - The user to get the information from
 * @returns {UserInfo}
 */
module.exports = async function userInfo(user) {

    // Check the accuracy of the value in the entered parameters
    if (!(user instanceof User)) throw new TypeError("The entered \"user\" value must be a User value!");

    // Fetch the user because banner is not cached
    user.fetch(true).catch(() => { });

    // Create userInfo object
    const userInfoObject = {
        username: user.username, // The name of the user
        discriminator: user.discriminator, // The discriminator of the user
        id: user.id, // The ID of the user
        bot: user.bot, // Whether the user is a bot
        client: user.client, // The client of the user
        createdTimestamp: user.createdTimestamp, // The timestamp the user was created at
        globalName: user.globalName, // The global name of the user
        avatarURL: userAvatar(user), // The URL of the user's avatar
        bannerURL: userBanner(user), // The URL of the user's banner
        displayAvatarURL: userDisplayAvatar(user), // The display avatar of the user
        avatarDecorationURL: userAvatarDecoration(user), // The avatar decoration of the user
        flags: user.flags, // The flags of the user
        accentColor: user.accentColor, // The accent color of the user
        hexAccentColor: user.hexAccentColor, // The hex accent color of the user
    };

    return userInfoObject;
}