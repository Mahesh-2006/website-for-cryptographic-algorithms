const SECONDS_IN_YEAR = 31536000;
const UNIVERSE_AGE_YEARS = 13.8e9;

function classicalBruteForce(keySize, guessesPerSecond, cores = 1) {
  const operations = BigInt(2) ** BigInt(keySize);
  const rate = BigInt(guessesPerSecond) * BigInt(cores);

  if (rate === 0n) throw new Error("Rate cannot be zero");

  const seconds = operations / rate;
  const years = Number(seconds) / SECONDS_IN_YEAR;

  return {
    model: "Classical",
    operations: operations.toString(),
    seconds: seconds.toString(),
    years,
    comparedToUniverse: years / UNIVERSE_AGE_YEARS
  };
}

function quantumGrover(keySize, guessesPerSecond, cores = 1) {
  const effectiveKey = keySize / 2;

  const operations = BigInt(2) ** BigInt(effectiveKey);
  const rate = BigInt(guessesPerSecond) * BigInt(cores);

  const seconds = operations / rate;
  const years = Number(seconds) / SECONDS_IN_YEAR;

  return {
    model: "Quantum (Grover)",
    operations: operations.toString(),
    seconds: seconds.toString(),
    years,
    comparedToUniverse: years / UNIVERSE_AGE_YEARS
  };
}

module.exports = {
  classicalBruteForce,
  quantumGrover
};