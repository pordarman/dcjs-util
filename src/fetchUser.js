const {
    User,
    Client
} = require("discord.js");

/**
 * Fetch discord user
 * @param {Client} client - Discord Client
 * @param {String} userId - The user ID to fetch
 * @returns {Promise<User|null>}
 */
module.exports = async function fetchUser(client, userId) {

    // Check the accuracy of the value in the entered parameters
    if (!(client instanceof Client)) throw new TypeError("The entered \"client\" value must be a Client value!");
    if (typeof userId !== "string") throw new TypeError("The entered \"userId\" value must be a String value!");
    if (!/^\d{17,20}$/.test(userId)) throw new TypeError("The entered \"userId\" value must be a valid user ID!");

    // If shard is enabled
    if (client.shard !== null) {
        // Navigate all shards and find the user
        try {
            const findUserWithShard = await client.shard.broadcastEval(
                (clientParam, userIdParam) => clientParam.users.cache.get(userIdParam),
                {
                    context: userId
                }
            );
            const user = findUserWithShard.find((a) => !!a);

            if (user) return new User(client, user);
        } catch (e) { }
    }

    return client.users.cache.get(userId) || await client.users.fetch(userId).catch(() => { }) || null;
}