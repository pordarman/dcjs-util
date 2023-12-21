/**
 * Splits message by character length (default: 2000)
 * @param {String} content - The content to split
 * @param {Number} limit - The character limit to split
 * @returns {Array<String>}
 */
module.exports = function splitMessage(content, limit) {

    // Check the accuracy of the value in the entered parameters
    if (typeof content !== "string") throw new TypeError("The entered \"content\" value must be a String value!");
    if (typeof limit !== "number") throw new TypeError("The entered \"limit\" value must be a Number value!");
    if (limit < 1) throw new TypeError("The entered \"limit\" value must be a positive Number value!");

    const FOR_LOOP_COUNT = Math.ceil(content.length / limit);
    let messages = [];

    for (let index = 0; index < FOR_LOOP_COUNT; index++) {
        messages.push(
            content.slice(index * limit, (index + 1) * limit)
        );
    }

    return messages;
}