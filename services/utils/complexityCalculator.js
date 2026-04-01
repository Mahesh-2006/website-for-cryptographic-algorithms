const {
  SECONDS_IN_YEAR,
  UNIVERSE_AGE_YEARS
} = require('./constants');

function parseComplexityExpression(expr) {
  if (typeof expr !== 'string') return { base: 0, type: 'constant' };
  
  const match = expr.match(/^O\((.+)\)$/);
  if (!match) return { base: 0, type: 'unknown' };
  
  const inner = match[1].trim();
  
  if (inner === '1') {
    return { base: 1, type: 'constant' };
  }
  
  if (inner === 'n') {
    return { base: 'n', type: 'linear' };
  }
  
  const polyMatch = inner.match(/^(n)\s*\^\s*(\d+)$/);
  if (polyMatch) {
    return { base: 'n', exponent: parseInt(polyMatch[2]), type: 'polynomial' };
  }
  
  const logMatch = inner.match(/^(n)\s*\*?\s*log\s*\(?\s*(n)\s*\)?/i);
  if (logMatch) {
    return { base: 'n', log: true, type: 'nlogn' };
  }
  
  const sqrtMatch = inner.match(/sqrt\((n)\)/i);
  if (sqrtMatch) {
    return { base: 'n', root: 2, type: 'root' };
  }
  
  if (inner.includes('n')) {
    return { base: 'n', type: 'linear' };
  }
  
  return { base: parseInt(inner) || 0, type: 'constant' };
}

function estimateOperations(complexityExpr, inputSize) {
  const parsed = parseComplexityExpression(complexityExpr);
  const n = inputSize || 1;
  
  switch (parsed.type) {
    case 'constant':
      return BigInt(parsed.base || 1);
    case 'linear':
      return BigInt(n);
    case 'polynomial':
      return BigInt(Math.pow(n, parsed.exponent));
    case 'nlogn':
      return BigInt(Math.floor(n * Math.log2(n)));
    case 'root':
      return BigInt(Math.floor(Math.sqrt(n)));
    default:
      return 1n;
  }
}

function calculateBruteForceTime(keySize, guessesPerSecond, cores = 1) {
  const operations = 2n ** BigInt(keySize);
  const rate = BigInt(guessesPerSecond) * BigInt(cores);
  
  if (rate === 0n) throw new Error('Rate cannot be zero');
  
  const seconds = operations / rate;
  const years = Number(seconds) / Number(SECONDS_IN_YEAR);
  
  return {
    operations: operations.toString(),
    seconds: seconds.toString(),
    years,
    comparedToUniverse: years / UNIVERSE_AGE_YEARS,
    humanReadable: formatTime(seconds)
  };
}

function calculateGroverTime(keySize, guessesPerSecond, cores = 1) {
  const effectiveKey = Math.floor(keySize / 2);
  const operations = 2n ** BigInt(effectiveKey);
  const rate = BigInt(guessesPerSecond) * BigInt(cores);
  
  const seconds = operations / rate;
  const years = Number(seconds) / Number(SECONDS_IN_YEAR);
  
  return {
    operations: operations.toString(),
    seconds: seconds.toString(),
    years,
    comparedToUniverse: years / UNIVERSE_AGE_YEARS,
    humanReadable: formatTime(seconds)
  };
}

function calculateShorTime(keySize) {
  const complexity = {
    rsa2048: { operations: '~2^71', description: 'Sub-exponential' },
    rsa4096: { operations: '~2^85', description: 'Sub-exponential' },
    ecc256: { operations: '~2^63', description: 'Similar to RSA 3072' }
  };
  
  const key = `rsa${keySize}` in complexity ? `rsa${keySize}` : 
              `ecc${keySize}` in complexity ? `ecc${keySize}` : 'unknown';
  
  return complexity[key] || { operations: 'N/A', description: 'Not applicable to symmetric keys' };
}

function formatTime(secondsBigInt) {
  const seconds = typeof secondsBigInt === 'bigint' ? secondsBigInt : BigInt(secondsBigInt);
  
  if (seconds < 0n) return 'Instant';
  
  const minute = 60n;
  const hour = 3600n;
  const day = 86400n;
  const year = SECONDS_IN_YEAR;
  const universe = BigInt(UNIVERSE_AGE_YEARS) * year;
  
  if (seconds >= universe) {
    const universes = Number(seconds / universe);
    if (universes > 1e15) {
      return `∞ (${universes.toExponential(1)} times universe age)`;
    }
    return `∞ (${universes.toLocaleString()} universe ages)`;
  }
  
  const parts = [];
  
  const y = seconds / year;
  if (y > 0n) parts.push(`${y} year${y !== 1n ? 's' : ''}`);
  
  const dRem = seconds % year;
  const d = dRem / day;
  if (d > 0n) parts.push(`${d} day${d !== 1n ? 's' : ''}`);
  
  const hRem = dRem % day;
  const h = hRem / hour;
  if (h > 0n && parts.length < 3) parts.push(`${h}h`);
  
  const mRem = hRem % hour;
  const m = mRem / minute;
  if (m > 0n && parts.length < 4) parts.push(`${m}m`);
  
  const s = mRem % minute;
  if (s > 0n && parts.length < 5) parts.push(`${s}s`);
  
  if (parts.length === 0) return '< 1 second';
  
  return parts.slice(0, 4).join(' ');
}

function getComplexityScore(complexity) {
  const scores = {
    'O(1)': 1,
    'O(log n)': 2,
    'O(n)': 3,
    'O(n log n)': 4,
    'O(n^2)': 5,
    'O(n^3)': 6,
    'O(2^n)': 10,
    'O(n!)': 100
  };
  
  return scores[complexity] || 5;
}

function compareComplexity(a, b) {
  return getComplexityScore(a) - getComplexityScore(b);
}

function getMemoryEstimate(category, keySize) {
  const baseMemory = {
    aes: keySize / 8 * 4,
    sha256: 64,
    sha512: 128,
    bcrypt: 64 * 1024,
    scrypt: 16 * 1024 * 1024,
    argon2: 64 * 1024 * 1024
  };
  
  return baseMemory[category] || 256;
}

function getProofSizeEstimate(protocol, securityBits) {
  const sizes = {
    schnorr: 48,
    zkSNARK: 200,
    zkSTARK: 40000,
    bulletproofs: 136 + securityBits * 2
  };
  
  return sizes[protocol] || 1000;
}

function getHomomorphicComplexity(scheme, operation) {
  const complexities = {
    paillier: {
      keyGen: 'O(n^3)',
      encrypt: 'O(n^2)',
      add: 'O(n^2)',
      scalarMult: 'O(n^2)'
    },
    elgamal: {
      keyGen: 'O(n^2)',
      encrypt: 'O(n)',
      multiply: 'O(n)'
    },
    ckks: {
      keyGen: 'O(n log n)^2',
      encrypt: 'O(n log n)^2',
      add: 'O(n log n)',
      multiply: 'O(n log n)^2',
      rotate: 'O(n log n)'
    },
    bfv: {
      keyGen: 'O(n log n)^2',
      encrypt: 'O(n log n)',
      add: 'O(n log n)',
      multiply: 'O(n log n)^2'
    },
    tfhe: {
      keyGen: 'O(n^3)',
      encrypt: 'O(n)',
      bootstrap: 'O(n^3)'
    }
  };
  
  return complexities[scheme]?.[operation] || 'Unknown';
}

module.exports = {
  parseComplexityExpression,
  estimateOperations,
  calculateBruteForceTime,
  calculateGroverTime,
  calculateShorTime,
  formatTime,
  getComplexityScore,
  compareComplexity,
  getMemoryEstimate,
  getProofSizeEstimate,
  getHomomorphicComplexity
};
