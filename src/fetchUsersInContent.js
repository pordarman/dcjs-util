const {
    User,
    Client,
    Collection
} = require("discord.js");

/**
 * Fetch discord users in content
 * @param {Client} client - Discord Client
 * @param {String} content - The content to fetch users
 * @returns {Promise<Collection<String,User>>}
 */
module.exports = async function fetchUsersInContent(client, content) {

    // Check the accuracy of the value in the entered parameters
    if (!(client instanceof Client)) throw new TypeError("The entered \"client\" value must be a Client value!");
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");

    // Fetch user IDs from content
    const userIds = content.match(/\d{17,20}/g);

    const users = new Collection();

    // If there is no user ID in the content, return the empty collection
    if (!userIds) return users;

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

    for (let index = 0; index < userIds.length; index++) {
        const userId = userIds[index];
        const user = await fetchUser(userId);

        if (user) users.set(userId, user);
    }

    return users;
}