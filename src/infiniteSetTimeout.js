const MAX_NUMBER_IN_TIMEOUT = 2 ** 31 - 1;

/**
  * This function runs the setTimeout function indefinitely
  * @param {() => any} functionParam - The function to be executed
  * @param {Number} milisecond - The time to wait before executing the function
  * @returns {() => void} Returns a function that stops the setTimeout function
  */
module.exports = function infiniteSetTimeout(functionParam, milisecond) {

    // Check the accuracy of the value in the entered parameters
    if (typeof functionParam !== "function") throw new TypeError("The entered \"functionParam\" value must be a Function value!");
    if (typeof milisecond !== "number") throw new TypeError("The entered \"milisecond\" value must be a Number value!");

    function mySetTimeout(functionParam, milisecond, callback) {
        // If the milisecond value is much higher than the maximum value that can be used in setTimeout, we divide it into pieces and run it in order
        let timeout = milisecond >= MAX_NUMBER_IN_TIMEOUT ?
            setTimeout(() => {
                callback(timeout);
                return mySetTimeout(functionParam, milisecond - MAX_NUMBER_IN_TIMEOUT, callback);
            }, MAX_NUMBER_IN_TIMEOUT) :
            setTimeout(functionParam, milisecond);

        callback(timeout);
    }

    // We create a variable and keep the data of the currently running setTimeout function by constantly changing this variable
    let timeout;
    mySetTimeout(
        functionParam,
        milisecond,
        (newTimeout) => timeout = newTimeout
    );

    // Finally, we create a new function to finish this timeout process
    return function () {
        return clearTimeout(timeout);
    };
};