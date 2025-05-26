// THis Object is a hierarchy of units for weight conversion
let unitHierarchy = {
    'ton': 1000000000,
    'kilogram': 1000000,
    'gram': 1000,
    'milligram': 1,
};

/**
 * Converts an object representing weight in tons, kilograms, grams, and milligrams
 * to a total weight in milligrams.
 * @param {Object} data - An object with properties tons, kilograms, grams, and milligrams.
  * @returns {number} - The total weight in milligrams.
 * */
const convertToMilligrams = (data) => {
    return data.tons * unitHierarchy.ton +
        data.kilograms * unitHierarchy.kilogram +
        data.grams * unitHierarchy.gram +
        data.milligrams * unitHierarchy.milligram;
};

/**
 * Converts a total weight in milligrams to an object representing weight in tons,  
 * kilograms, grams, and milligrams.
 * @param {number} totalMg - The total weight in milligrams.
 *  @returns {Object} - An object with properties tons, kilograms, grams, and milligrams.
 * */
function convertFromMilligrams(totalMg) {
    const result = {};
    result.tons = Math.floor(totalMg / unitHierarchy.ton);
    totalMg %= unitHierarchy.ton;

    result.kilograms = Math.floor(totalMg / unitHierarchy.kilogram);
    totalMg %= unitHierarchy.kilogram;

    result.grams = Math.floor(totalMg / unitHierarchy.gram);
    totalMg %= unitHierarchy.gram;

    result.milligrams = totalMg;
    return result;
}

/**
 * Updates the stock of an item based on the current stock, change in stock, and operation type.
 * @param {Object} current/initial - The initial stock represented in tons, kilograms, grams, and milligrams.
 * @param {Object} change - The change in stock represented in tons, kilograms, grams, and milligrams.
 * @param {string} operation - The operation to perform, either "sell" or "purchase".
 * */

function updateStock(current, change, operation) {
    const currentMg = convertToMilligrams(current);
    const changeMg = convertToMilligrams(change);

    let resultMg;
    if (operation === "sell") {
        resultMg = currentMg - changeMg;
        if (resultMg < 0) throw new Error("Insufficient stock to sell.");
    } else if (operation === "purchase") {
        resultMg = currentMg + changeMg;
    } else {
        throw new Error("Invalid operation. Use 'sell' or 'purchase'.");
    }

    return convertFromMilligrams(resultMg);
}
// stock of object in tons, kilograms, grams, and milligrams
let initial_stock = { tons: 1, kilograms: 2, grams: 0, milligrams: 0 };

/* This will reduce the stock by 1 gram.
 */
let after_sale = updateStock(
    initial_stock,
    { tons: 0, kilograms: 0, grams: 1, milligrams: 0 },
    "sell"
);
// output the result
console.log("#Result:", after_sale);