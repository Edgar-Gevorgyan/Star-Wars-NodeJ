/**
 * Returns a Boolean value that indicates whether a value is an integer.
 * @param number A numeric value.
 */
function isInt(number) {
    return !isNaN(number) && Number.isInteger(parseFloat(number));
}

/**
 * Returns a Boolean value that indicates whether the arguments is correctly given.
 */
function isValid(){
    if (process.argv.length != 3) {
        console.log('Usage: node index.js <film number>')
        return false
    } else if (!isInt(process.argv[2])) {
        console.log('Usage: node index.js <film number> where <film number> is a number')
        return false
    }
    return true
}

/**
 * Returns a integer Number value which represent the film id.
 */
function getFilmID() {
    return parseInt(process.argv[2])
}


module.exports =  {
    isValid,
    getFilmID,
}