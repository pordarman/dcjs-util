/**
 * Returns the shard ID of the server
 * @param {String} guildId - Guild Id
 * @param {Number} shardCount - Client shard count (client.shard?.count)
 * @returns {Boolean}
 */
module.exports = function shardId(guildId, shardCount = 1) {

    // Check the accuracy of the value in the entered parameters
    if (typeof guildId !== "string") throw new TypeError("\"guildId\" must be a string!");
    if (!/\d{17,20}/.test(guildId)) throw new TypeError("\"guildId\" must be a valid guild ID!");
    if (typeof shardCount !== "number") throw new TypeError("\"shardCount\" must be a number!");
    if (shardCount < 0) throw new RangeError("\"shardCount\" must be a positive Number value!");

    return Number(BigInt(guildId) >> 22n) % shardCount;
}