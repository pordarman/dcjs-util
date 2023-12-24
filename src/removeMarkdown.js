/**
 * Removes markdown from a string
 * @param {String} string - The string to remove markdown
 * @returns {String}
 */
module.exports = function removeMarkdown(string) {

    // Check the accuracy of the value in the entered parameters
    if (typeof string !== "string") throw new TypeError("The entered \"string\" value must be a String value!");

    return string.replace(
        /(?:__|[*#])|\[(.*?)\]\(.*?\)/,
        '$1'
    );
}