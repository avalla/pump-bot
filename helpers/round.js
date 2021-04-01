/**
 * Round number at 8 decimals
 * @param number
 * @returns {number}
 */
function round(number) {
  return Math.round((number + Number.EPSILON) * 100_000_000) / 100_000_000;
}

module.exports = round;
