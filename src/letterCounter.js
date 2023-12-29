/**
 * Shows how many times all letters in the entered text are repeated
 * @param {String} string - String to count letters
 * @returns {Map<String, Number>}
 */
module.exports = function letterCounter(string) {

    // Check the accuracy of the value in the entered parameters
    if (typeof string !== "string") throw new TypeError("The entered \"string\" value must be a String value!");

    const allLetters = string.match(/[a-zığüişöç]/gi);

    const letterCounter = new Map([
        ["_allLetters", allLetters.length],
        ["_allCharacters", string.length]
    ]);

    if (allLetters === null) return letterCounter;

    for (let i = 0; i < allLetters.length; i++) {
        const letter = allLetters[i].toLocaleLowerCase();

        letterCounter.set(letter, (letterCounter.get(letter) || 0) + 1);
    }

    return letterCounter;
}