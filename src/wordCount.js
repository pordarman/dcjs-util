/**
 * Shows how many times all words in the entered text are repeated
 * @param {String} string 
 * @returns {Map<String, Number>}
 */
module.exports = function wordCounter(string) {

    // Check the accuracy of the value in the entered parameters
    if (typeof string !== "string") throw new TypeError("The entered \"string\" value must be a String value!");

    const allWords = string.match(/[a-zığüişöç]+/gi);

    const wordCounter = new Map([
        ["_allWords", allWords.length],
        ["_allCharacters", string.length]
    ]);

    if (allWords === null) return wordCounter;

    for (let i = 0; i < allWords.length; i++) {
        const word = allWords[i].toLocaleLowerCase();

        wordCounter.set(word, (wordCounter.get(word) || 0) + 1);
    }

    return wordCounter;
}