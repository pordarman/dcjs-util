/**
 * Convert a number to ordinal rank
 * @param {Number} number - The number to convert
 * @returns {String}
 */
module.exports = function numberToOrdinalRank(number) {

    // Check the accuracy of the value in the entered parameters
    if (typeof number !== "number") throw new TypeError("The entered \"number\" value must be a Number value!");
    if (number < 0) throw new RangeError("The entered \"number\" must be a positive Number value!");

    const ordinalRanks = ["", "1st", "2nd", "3rd"];
    return ordinalRanks[number] || `${number}th`;
}