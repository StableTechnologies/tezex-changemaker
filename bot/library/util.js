const { BigNumber } = require("bignumber.js");
const config = require(`./${
  process.env.BOT_ENV || "prod"
}-network-config.json`);

/**
 * Returns the minimum expected value by an initiator after deducting reward for swap responder
 *
 * @param swapValue the actual swap value initiated by the user
 * @param rewardInBIPS reward taken by the swap responder in basis points
 */
module.exports.calcSwapReturn = (swapValue, rewardInBIPS) => {
  return new BigNumber(swapValue)
    .multipliedBy(
      new BigNumber(1).minus(new BigNumber(rewardInBIPS).div(10000))
    )
    .toFixed(0, 3);
};

/**
 * constants for calculations
 * feePad : contains the fee padding of each asset for each pair tx fee [Y*txFee]
 * minTradeVolume : contains minimum volume of swaps expected of each asset for each pair, helps calculate estimated eth balance req. (no. of swaps = maxVolume/minVolume)*feePerTx*feePad
 */
module.exports.constants = {
  tokenTypes: {
    FA2: "fa2",
    FA12: "FA12",
  },
  feePad: {
    "usdc/usdtz": {
      usdc: new BigNumber(config.pairs["usdc/usdtz"]["usdc"].feePad),
      usdtz: new BigNumber(config.pairs["usdc/usdtz"]["usdtz"].feePad),
    },
    "eth/ethtz": {
      eth: new BigNumber(config.pairs["eth/ethtz"]["eth"].feePad),
      ethtz: new BigNumber(config.pairs["eth/ethtz"]["ethtz"].feePad),
    },
    "wbtc/tzbtc": {
      wbtc: new BigNumber(config.pairs["wbtc/tzbtc"]["wbtc"].feePad),
      tzbtc: new BigNumber(config.pairs["wbtc/tzbtc"]["tzbtc"].feePad),
    },
    "wbtc/btctz": {
      wbtc: new BigNumber(config.pairs["wbtc/btctz"]["wbtc"].feePad),
      btctz: new BigNumber(config.pairs["wbtc/btctz"]["btctz"].feePad),
    },
  },
  minTradeVolume: {
    "usdc/usdtz": {
      usdc: new BigNumber(
        config.pairs["usdc/usdtz"]["usdc"].minTradeVolume
      ).multipliedBy(10 ** 6),
      usdtz: new BigNumber(
        config.pairs["usdc/usdtz"]["usdtz"].minTradeVolume
      ).multipliedBy(10 ** 6),
    },
    "eth/ethtz": {
      eth: new BigNumber(
        config.pairs["eth/ethtz"]["eth"].minTradeVolume
      ).multipliedBy(10 ** 18),
      ethtz: new BigNumber(
        config.pairs["eth/ethtz"]["ethtz"].minTradeVolume
      ).multipliedBy(10 ** 18),
    },
    "wbtc/tzbtc": {
      wbtc: new BigNumber(
        config.pairs["wbtc/tzbtc"]["wbtc"].minTradeVolume
      ).multipliedBy(10 ** 8),
      tzbtc: new BigNumber(
        config.pairs["wbtc/tzbtc"]["tzbtc"].minTradeVolume
      ).multipliedBy(10 ** 8),
    },
    "wbtc/btctz": {
      wbtc: new BigNumber(
        config.pairs["wbtc/btctz"]["wbtc"].minTradeVolume
      ).multipliedBy(10 ** 8),
      btctz: new BigNumber(
        config.pairs["wbtc/btctz"]["btctz"].minTradeVolume
      ).multipliedBy(10 ** 8),
    },
  },
};

module.exports.STATE = {
  START: 0,
  DONE: 0,
  INITIATED: 1,
  RESPONSE_FOUND: 2,
  REFUNDED: 3,
  ERROR: 4,
};
/**
 * Takes a whole no. with the original decimal count and required precision (rounded up)
 * @param number BigNumber compatible value
 * @param decimals original decimal count
 * @param precision required decimal places
 */
module.exports.convertBigIntToFloat = (number, decimals, precision) => {
  return new BigNumber(number)
    .div(new BigNumber(10).pow(decimals))
    .toFixed(precision);
};

/**
 * Returns the individual pairs from a given pair string eg. "a/b" -> ["a","b"]
 *
 * @param pairString a valid pair string eg. "a/b"
 * @returns individual items/assets from the pair
 */
module.exports.getAssets = (pairString) => {
  return pairString.split("/");
};

/**
 * Returns the counter item from a given pair string eg. ("a/b","b") -> "a"
 *
 * @param pairString a valid pair string eg. "a/b"
 * @param asset one of the items in the pair
 * @returns the other item in the pair
 */
module.exports.getCounterPair = (pairString, asset) => {
  const items = pairString.split("/");
  if (items[0] !== asset) return items[0];
  if (items[1] !== asset) return items[1];
  throw new Error("counter pair not found");
};
