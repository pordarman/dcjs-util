/**
 * Returns length of value
 * @param {any} value - Value to find length
 * @returns {Number}
 */
module.exports = function length(value) {

    // If value has length property, return length
    if ("length" in value && typeof value.length == "number") return value.length;

    // If value has size property, return size
    if ("size" in value && typeof value.size == "number") return value.size;

    // If value has toString method, return length of toString method
    if ("toString" in value && typeof value.toString == "function") return value.toString().length;

    // If value is object, return length of object keys
    if (typeof value === "object") return Object.keys(value).length;

    // Default return 0
    return 0;
}