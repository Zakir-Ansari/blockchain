/**
 * Utility function to convert BigInt values to strings recursively.
 * @param {any} data - The data that can contain BigInt values to be converted.
 * @returns {any} - The data with BigInt values converted to strings.
 */
const formatData = (data) => {
  if (Array.isArray(data)) {
    return data.map(formatData); // Recursively handle array elements
  } else if (typeof data === "object" && data !== null) {
    const newObj = {};
    for (const key in data) {
      newObj[key] = formatData(data[key]); // Recursively handle object properties
    }
    return newObj;
  } else if (typeof data === "bigint") {
    return data.toString(); // Convert BigInt to string
  } else {
    return data; // Return the value as is if it's not a BigInt
  }
};

module.exports = {
  formatData,
};
