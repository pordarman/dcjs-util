/**
 * Checks if two values are deeply equal, including Date, RegExp, Array, NaN, and other object methods.
 * @param {*} value1 - The first value.
 * @param {*} value2 - The second value.
 * @returns {Boolean}
 */
module.exports = function veryDeepEqual(value1, value2) {
    // If the values are strictly equal, return true
    if (value1 === value2) {
        return true;
    }

    // If either value is null or not an object, they are not deeply equal
    if (value1 === null || typeof value1 !== 'object' || value2 === null || typeof value2 !== 'object') {
        return false;
    }

    // Check if the values are Date objects
    if (value1 instanceof Date && value2 instanceof Date) {
        return value1.getTime() === value2.getTime();
    }

    // Check if the values are RegExp objects
    if (value1 instanceof RegExp && value2 instanceof RegExp) {
        return value1.toString() === value2.toString();
    }

    // Array check
    if (Array.isArray(value1) && Array.isArray(value2)) {
        // If the lengths are different, they are not deeply equal
        if (value1.length !== value2.length) {
            return false;
        }

        // Check if each element in the arrays is deeply equal
        for (let i = 0; i < value1.length; i++) {
            if (!veryDeepEqual(value1[i], value2[i])) {
                return false;
            }
        }

        return true;
    }

    // NaN check
    if (Number.isNaN(value1) && Number.isNaN(value2)) {
        return true;
    }

    // Object keys check
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    // If the number of keys is different, they are not deeply equal
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Check if each key and its corresponding value are deeply equal
    for (let key of keys1) {
        if (!veryDeepEqual(value1[key], value2[key])) {
            return false;
        }
    }

    // If all checks pass, the values are deeply equal
    return true;
}

