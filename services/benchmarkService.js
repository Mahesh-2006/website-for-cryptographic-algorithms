const {
  benchmarkAllSymmetric
} = require('./algorithms/symmetric/benchmarks');

const {
  benchmarkAllHashes,
  benchmarkAllHMAC
} = require('./algorithms/hashFunctions/benchmarks');

const {
  benchmarkAllAEAD
} = require('./algorithms/authenticatedEnc/benchmarks');

const {
  benchmarkAllAsymmetric
} = require('./algorithms/asymmetric/benchmarks');

const {
  benchmarkAllPasswordHashing
} = require('./algorithms/passwordHashing/benchmarks');

const {
  benchmarkAllMAC
} = require('./algorithms/mac/benchmarks');

const {
  benchmarkAllDigitalSignatures
} = require('./algorithms/digitalSignatures/benchmarks');

const {
  benchmarkAllKeyExchange
} = require('./algorithms/keyExchange/benchmarks');

const {
  benchmarkAllPostQuantum
} = require('./algorithms/postQuantum/benchmarks');

const {
  benchmarkAllZeroKnowledge
} = require('./algorithms/zeroKnowledge/benchmarks');

const {
  benchmarkAllHomomorphic
} = require('./algorithms/homomorphic/benchmarks');

const CATEGORY_BENCHMARKS = {
  symmetric: async () => {
    try {
      return await benchmarkAllSymmetric();
    } catch (error) {
      throw error;
    }
  },
  
  hash: async () => {
    try {
      const hashes = await benchmarkAllHashes();
      const hmacs = await benchmarkAllHMAC();
      return { hashes, hmacs };
    } catch (error) {
      throw error;
    }
  },
  
  authenticatedEncryption: async () => {
    try {
      return await benchmarkAllAEAD();
    } catch (error) {
      throw error;
    }
  },
  
  asymmetric: async () => {
    try {
      return await benchmarkAllAsymmetric();
    } catch (error) {
      throw error;
    }
  },
  
  passwordHashing: async () => {
    try {
      return await benchmarkAllPasswordHashing();
    } catch (error) {
      throw error;
    }
  },
  
  mac: async () => {
    try {
      return await benchmarkAllMAC();
    } catch (error) {
      throw error;
    }
  },
  
  digitalSignatures: async () => {
    try {
      return await benchmarkAllDigitalSignatures();
    } catch (error) {
      throw error;
    }
  },
  
  keyExchange: async () => {
    try {
      return await benchmarkAllKeyExchange();
    } catch (error) {
      throw error;
    }
  },
  
  postQuantum: async () => {
    try {
      return await benchmarkAllPostQuantum();
    } catch (error) {
      throw error;
    }
  },
  
  zeroKnowledge: async () => {
    try {
      return await benchmarkAllZeroKnowledge();
    } catch (error) {
      throw error;
    }
  },
  
  homomorphic: async () => {
    try {
      return await benchmarkAllHomomorphic();
    } catch (error) {
      throw error;
    }
  }
};

async function runAllBenchmarks() {
  const results = {};
  const errors = {};
  
  for (const [category, benchmarkFn] of Object.entries(CATEGORY_BENCHMARKS)) {
    try {
      results[category] = {
        success: true,
        data: await benchmarkFn()
      };
    } catch (error) {
      results[category] = {
        success: false,
        error: error.message
      };
      errors[category] = error.message;
    }
  }
  
  return { results, errors, totalErrors: Object.keys(errors).length };
}

async function runCategoryBenchmarks(category) {
  if (CATEGORY_BENCHMARKS[category]) {
    try {
      const data = await CATEGORY_BENCHMARKS[category]();
      return {
        success: true,
        category,
        timestamp: new Date().toISOString(),
        data
      };
    } catch (error) {
      return {
        success: false,
        category,
        error: error.message
      };
    }
  }
  
  return {
    success: false,
    error: `Unknown category: ${category}`
  };
}

function getSupportedBenchmarks() {
  return {
    implemented: ['symmetric', 'hash', 'authenticatedEncryption', 'asymmetric', 'passwordHashing', 'mac', 'digitalSignatures', 'keyExchange', 'postQuantum', 'zeroKnowledge', 'homomorphic'],
    nodeCryptoNative: ['symmetric', 'hash', 'authenticatedEncryption', 'asymmetric', 'passwordHashing', 'mac', 'digitalSignatures', 'keyExchange'],
    externalLibrary: ['homomorphic (paillier)', 'hash (blake3)'],
    estimated: ['postQuantum', 'zeroKnowledge', 'homomorphic (except paillier)', 'homomorphic (ckks, bfv, tfhe, elgamal)'],
    note: 'Live benchmarks use Node.js crypto module, blake3-jit, or paillier-bigint. Estimated values from research papers and reference implementations.'
  };
}

module.exports = {
  runAllBenchmarks,
  runCategoryBenchmarks,
  getSupportedBenchmarks,
  CATEGORY_BENCHMARKS
};
