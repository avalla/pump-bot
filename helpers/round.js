/**
 * Round number at 6 decimals
 * @param number
 * @param decimals
 * @returns {number}
 */
function round(number, decimals = 6) {
  const multiplier = Math.pow(10, decimals);
  const value = Math.round(number * multiplier) / multiplier;
  if (isNaN(value)) {
    return undefined;
  }
  return value;
}

module.exports = round;
