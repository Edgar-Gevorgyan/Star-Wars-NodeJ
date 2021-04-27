/**
 * Returns a Boolean value that indicates whether a value is an integer.
 * @param number A numeric value.
 */
function isInt(number) {
    return !isNaN(number) && Number.isInteger(parseFloat(number));
}

function getFilmNumber() {
    if (process.argv.length != 3) {
        console.log('usage: node index.js <film number>')
        return
    } else if (!isInt(process.argv[2])) {
        console.log('usage: node index.js <film number> where <film number> is a number')
        return
    }
    return process.argv[2]
}

export default {
    getFilmNumber
}