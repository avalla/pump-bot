/**
 * Round number at 8 decimals
 * @param number
 * @returns {number}
 */
function round(number) {
  return Math.round((number) * 1_000_000) / 1_000_000;
}

module.exports = round;
