/**
 * Convert a number to ordinal rank
 * @param {Number} number - The number to convert
 * @returns {String}
 */
module.exports = function numberToOrdinalRank(number) {

    // Check the accuracy of the value in the entered parameters
    if (typeof number !== "number") throw new TypeError("The entered \"number\" value must be a Number value!");
    if (number <= 0) throw new RangeError("The entered \"number\" must be a positive Number value!");

    // If number is between 11 and 13, the suffix is "th"
    if (number > 10 && number < 14) return `${number}th`;

    // Get last digit of number
    const lastDigit = number % 10;

    switch (lastDigit) {
        case 1:
            return `${number}st`;

        case 2:
            return `${number}nd`;

        case 3:
            return `${number}rd`;

        default:
            return `${number}th`;
    }
}