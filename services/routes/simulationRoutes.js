const express = require("express");

const {
  classicalBruteForce,
  quantumGrover
} = require("../securityEngine");

const { getAlgorithmById } = require("../algorithms/registry");

const router = express.Router();

router.post("/simulate", (req, res) => {
  const { keySize, guessesPerSecond, cores = 1, attackType = "classical" } = req.body;

  if (!keySize) {
    return res.status(400).json({ success: false, error: "keySize is required" });
  }

  try {
    let result;

    if (attackType === "quantum") {
      result = quantumGrover(keySize, guessesPerSecond || 1e12, cores);
      result.model = "Quantum (Grover's Algorithm)";
    } else if (attackType === "shor") {
      return res.status(400).json({ 
        success: false, 
        error: "Shor's algorithm requires different parameters. Use /api/educational/simulate-crack instead."
      });
    } else {
      result = classicalBruteForce(keySize, guessesPerSecond || 1e12, cores);
      result.model = "Classical Brute Force";
    }

    result.keySize = keySize;
    result.guessesPerSecond = guessesPerSecond || 1e12;
    result.cores = cores;
    result.attackType = attackType;

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post("/simulate-algorithm", (req, res) => {
  const { algorithmId, guessesPerSecond = 1e12, cores = 1, attackType = "classical" } = req.body;

  if (!algorithmId) {
    return res.status(400).json({ success: false, error: "algorithmId is required" });
  }

  try {
    const algorithm = getAlgorithmById(algorithmId);

    if (!algorithm) {
      return res.status(404).json({ success: false, error: `Algorithm '${algorithmId}' not found` });
    }

    let keySize;
    const securityParams = algorithm.securityParams || {};

    if (typeof securityParams.keySize === 'number') {
      keySize = securityParams.keySize;
    } else if (typeof securityParams.keySize === 'object') {
      if (securityParams.keySize.typical) {
        keySize = securityParams.keySize.typical;
      } else if (securityParams.keySize.default) {
        keySize = securityParams.keySize.default;
      } else if (Array.isArray(securityParams.keySize.options)) {
        keySize = Math.max(...securityParams.keySize.options);
      }
    }

    if (!keySize && securityParams.outputSize) {
      keySize = securityParams.outputSize;
    }

    if (!keySize) {
      return res.status(400).json({ 
        success: false, 
        error: `Cannot determine key size for algorithm '${algorithmId}'` 
      });
    }

    let result;
    let humanReadable;

    if (attackType === "quantum") {
      result = quantumGrover(keySize, guessesPerSecond, cores);
      result.model = "Quantum (Grover's Algorithm)";
    } else {
      result = classicalBruteForce(keySize, guessesPerSecond, cores);
      result.model = "Classical Brute Force";
    }

    const SECONDS_IN_YEAR = 31536000;
    const UNIVERSE_AGE_YEARS = 13.8e9;

    const secondsBigInt = BigInt(result.seconds);
    const year = 31536000n;
    const universe = BigInt(Math.floor(UNIVERSE_AGE_YEARS)) * year;

    if (secondsBigInt >= universe) {
      humanReadable = "Longer than the age of the universe";
    } else if (secondsBigInt < 60n) {
      humanReadable = "Less than a minute";
    } else if (secondsBigInt < 3600n) {
      humanReadable = `${Math.floor(Number(secondsBigInt) / 60)} minute(s)`;
    } else if (secondsBigInt < 86400n) {
      humanReadable = `${Math.floor(Number(secondsBigInt) / 3600)} hour(s)`;
    } else if (secondsBigInt < 31536000n) {
      humanReadable = `${Math.floor(Number(secondsBigInt) / 86400)} day(s)`;
    } else {
      humanReadable = `${(Number(secondsBigInt) / SECONDS_IN_YEAR).toExponential(2)} years`;
    }

    res.json({
      success: true,
      algorithm: {
        id: algorithm.id,
        name: algorithm.name,
        category: algorithm.category,
        securityLevel: algorithm.securityLevel
      },
      simulationParams: {
        keySize,
        guessesPerSecond,
        cores,
        attackType
      },
      results: {
        operations: result.operations,
        seconds: result.seconds,
        years: result.years,
        comparedToUniverse: result.comparedToUniverse,
        humanReadable
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
