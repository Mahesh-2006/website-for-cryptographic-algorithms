const express = require("express");

const {
  classicalBruteForce,
  quantumGrover
} = require("../securityEngine");

const router = express.Router();

router.post("/simulate", (req, res) => {
  const { keySize, guessesPerSecond, cores, attackType } = req.body;

  try {
    let result;

    if (attackType === "quantum") {
      result = quantumGrover(keySize, guessesPerSecond, cores);
    } else {
      result = classicalBruteForce(keySize, guessesPerSecond, cores);
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;