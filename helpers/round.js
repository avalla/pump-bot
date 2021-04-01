/**
 * Round number at 8 decimals
 * @param number
 * @returns {number}
 */
function round(number) {
  return Math.ceil((number + Number.EPSILON) * 1_000_000) / 1_000_000;
}

module.exports = round;
