/**
 * Arranges the number in a human-readable way (like 1234 => 1,234) 
 * @param {Number} number - Number to humanize
 * @param {String} language - Language to humanize
 * @returns {Boolean}
 */
module.exports = function toHumanize(number, language = "en") {
    try {
        return number.toLocaleString(language);
    } catch (_) {
        return number;
    }
}