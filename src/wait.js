/**
 * Wait for a given amount of time
 * @param {Number} delay - The amount of time to wait (in milliseconds)
 * @returns {Promise<void>}
 */
module.exports = function wait(delay) {

    // Check the accuracy of the value in the entered parameters
    if (typeof delay !== "number") throw new TypeError("The entered \"delay\" value must be a Number value!");

    return new Promise(resolve => setTimeout(resolve, delay));
}