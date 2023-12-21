const {
    User,
    Client,
    Collection
} = require("discord.js");
const fetchAllMembers = require("./fetchAllMembers.js");

/**
 * Fetch discord users
 * @param {Client} client - Discord Client
 * @param {Array<String>} userIds - The user IDs to fetch
 * @returns {Promise<Collection<String,User|null>>}
 */
module.exports = async function fetchUsers(client, userIds) {

    // Check the accuracy of the value in the entered parameters
    if (!(client instanceof Client)) throw new TypeError("The entered \"client\" value must be a Client value!");
    if (!Array.isArray(userIds)) throw new TypeError("The entered \"userIds\" value must be a Array value!");

    // Fetch discord user without check
    async function fetchUser(userId) {

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

    const users = new Collection();

    for (let index = 0; index < userIds.length; index++) {
        const userId = userIds[index];

        // Check if the userId is a string
        if (typeof userId !== "string") throw new TypeError("The entered \"userIds\" value must be an Array of String values!");

        const user = await fetchUser(userId);
        if (user) users.set(userId, user);
    }

    return users;
}