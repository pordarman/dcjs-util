/**
 * Removes discord markdown from a string
 * @param {String} string - The string to remove discord markdown
 * @returns {String}
 */
module.exports = function removeDiscordMarkdown(string) {

    // Check the accuracy of the value in the entered parameters
    if (typeof string !== "string") throw new TypeError("The entered \"string\" value must be a String value!");

    return string.replace(
        /([_~|*`])/g,
        "\\$1"
    );
}