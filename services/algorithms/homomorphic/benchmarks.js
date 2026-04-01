const { generateRandomPrime, generateRandomRelativePrime, add, mul } = require('paillier-bigint');
const crypto = require('crypto');

const BENCHMARK_DEFAULTS = {
  keySize: 512,
  iterations: 10,
  warmupRuns: 2
};

async function runPaillierBenchmark() {
  const keySize = BENCHMARK_DEFAULTS.keySize;
  const { publicKey, privateKey } = await generateRandomPrime(keySize);
  const plaintext1 = BigInt(Math.floor(Math.random() * 1000000));
  const plaintext2 = BigInt(Math.floor(Math.random() * 1000000));
  
  const ciphertext1 = publicKey.encrypt(plaintext1);
  const ciphertext2 = publicKey.encrypt(plaintext2);
  
  return { publicKey, privateKey, plaintext1, plaintext2, ciphertext1, ciphertext2 };
}

async function benchmarkPaillierKeyGen() {
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    await generateRandomPrime(BENCHMARK_DEFAULTS.keySize);
  }
  
  const start = process.hrtime.bigint();
  const { publicKey, privateKey } = await generateRandomPrime(BENCHMARK_DEFAULTS.keySize);
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / 1e6;
  return {
    operation: 'keyGen',
    latencyMs: parseFloat(ms.toFixed(2)),
    opsPerSecond: parseFloat((1000 / ms).toFixed(2)),
    keySize: BENCHMARK_DEFAULTS.keySize
  };
}

async function benchmarkPaillierEncrypt() {
  const { publicKey } = await runPaillierBenchmark();
  const plaintext = BigInt(Math.floor(Math.random() * 1000000));
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    publicKey.encrypt(plaintext);
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    publicKey.encrypt(plaintext);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  return {
    operation: 'encrypt',
    latencyMs: parseFloat(ms.toFixed(3)),
    opsPerSecond: parseFloat((1000 / ms).toFixed(2))
  };
}

async function benchmarkPaillierDecrypt() {
  const { publicKey, privateKey, ciphertext1 } = await runPaillierBenchmark();
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    privateKey.decrypt(ciphertext1);
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    privateKey.decrypt(ciphertext1);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  return {
    operation: 'decrypt',
    latencyMs: parseFloat(ms.toFixed(3)),
    opsPerSecond: parseFloat((1000 / ms).toFixed(2))
  };
}

async function benchmarkPaillierAdd() {
  const { publicKey, ciphertext1, ciphertext2 } = await runPaillierBenchmark();
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    add(publicKey, ciphertext1, ciphertext2);
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    add(publicKey, ciphertext1, ciphertext2);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  return {
    operation: 'add (homomorphic)',
    latencyMs: parseFloat(ms.toFixed(3)),
    opsPerSecond: parseFloat((1000 / ms).toFixed(2))
  };
}

async function benchmarkPaillierMul() {
  const { publicKey, ciphertext1 } = await runPaillierBenchmark();
  const scalar = BigInt(Math.floor(Math.random() * 1000000));
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    mul(publicKey, ciphertext1, scalar);
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    mul(publicKey, ciphertext1, scalar);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  return {
    operation: 'mul (scalar multiply)',
    latencyMs: parseFloat(ms.toFixed(3)),
    opsPerSecond: parseFloat((1000 / ms).toFixed(2))
  };
}

async function getPaillierBenchmarks() {
  const [keyGen, encrypt, decrypt, addOp, mulOp] = await Promise.all([
    benchmarkPaillierKeyGen().catch(e => ({ operation: 'keyGen', error: e.message })),
    benchmarkPaillierEncrypt().catch(e => ({ operation: 'encrypt', error: e.message })),
    benchmarkPaillierDecrypt().catch(e => ({ operation: 'decrypt', error: e.message })),
    benchmarkPaillierAdd().catch(e => ({ operation: 'add', error: e.message })),
    benchmarkPaillierMul().catch(e => ({ operation: 'mul', error: e.message }))
  ]);
  
  return {
    algorithm: 'Paillier Cryptosystem',
    type: 'Additively Homomorphic',
    securityAssumption: 'Composite Residuosity (Integer Factorization)',
    source: 'paillier-bigint (live benchmark)',
    live: true,
    operations: {
      keyGen,
      encrypt,
      decrypt,
      add: addOp,
      multiply: mulOp
    },
    homomorphicCapabilities: {
      addCiphertexts: true,
      multiplyCiphertexts: false,
      addPlaintext: true,
      multiplyByPlaintext: true,
      negate: true
    },
    keySizes: {
      publicKey: '512 bits (demo)',
      privateKey: '1024 bits (with CRT)',
      plaintextMax: '512 bits',
      ciphertextSize: '1024 bits'
    },
    useCases: [
      'E-voting systems',
      'Privacy-preserving statistics',
      'Secure multi-party computation',
      'Encrypted database queries'
    ],
    notes: 'Live benchmarks on 512-bit keys (demo). Production should use 2048-bit keys.'
  };
}

function getElGamalHomomorphicBenchmarks() {
  return {
    algorithm: 'ElGamal (Homomorphic)',
    type: 'Multiplicatively Homomorphic',
    securityAssumption: 'Decisional Diffie-Hellman (DDH)',
    
    operations: {
      keyGen: {
        description: 'Generate public/private key pair',
        estimatedMs: 100,
        estimatedOpsPerSecond: 10,
        latency: '~100 milliseconds',
        keySize: '2048-bit (typical)'
      },
      encrypt: {
        description: 'Encrypt plaintext',
        estimatedMs: 20,
        estimatedOpsPerSecond: 50,
        latency: '~20 milliseconds',
        ciphertextExpansion: '2x size'
      },
      decrypt: {
        description: 'Decrypt ciphertext',
        estimatedMs: 30,
        estimatedOpsPerSecond: 33,
        latency: '~30 milliseconds'
      },
      multiply: {
        description: 'Homomorphic multiplication of ciphertexts',
        estimatedMs: 0.3,
        estimatedOpsPerSecond: 3333,
        latency: '~0.3 milliseconds',
        note: 'Multiplies the underlying plaintexts'
      },
      power: {
        description: 'Raise ciphertext to a power',
        estimatedMs: 0.5,
        estimatedOpsPerSecond: 2000,
        latency: '~0.5 milliseconds',
        note: 'Implements scalar multiplication on plaintext'
      }
    },
    
    complexity: {
      keyGen: 'O(n^2)',
      encrypt: 'O(n)',
      decrypt: 'O(n)',
      multiply: 'O(n)'
    },
    
    homomorphicCapabilities: {
      addCiphertexts: false,
      multiplyCiphertexts: true,
      addPlaintext: false,
      multiplyByPlaintext: true,
      negate: false
    },
    
    keySizes: {
      publicKey: '2048 bits',
      privateKey: '2048 bits',
      plaintextMax: 'Subgroup order (~256 bits)',
      ciphertextSize: '4096 bits (2 group elements)'
    },
    
    useCases: [
      'E-voting (multiplication)',
      'Private set intersection',
      'Encrypted search',
      'Threshold encryption'
    ],
    
    notes: 'Complements Paillier. Supports multiplication instead of addition. Ciphertext size doubles plaintext.'
  };
}

function getCKKSBenchmarks() {
  return {
    algorithm: 'CKKS (Cheon-Kim-Kim-Song)',
    type: 'Approximate Fully Homomorphic',
    securityAssumption: 'Ring Learning With Errors (RLWE)',
    
    operations: {
      keyGen: {
        description: 'Generate evaluation and relinearization keys',
        estimatedMs: 20000,
        estimatedOpsPerSecond: 0.05,
        latency: '~20 seconds',
        note: 'Complex key structure (polynomial rings)'
      },
      encrypt: {
        description: 'Encrypt floating-point vector',
        estimatedMs: 500,
        estimatedOpsPerSecond: 2,
        latency: '~500 milliseconds',
        slotCount: '4096 slots (for N=16384)',
        precision: '~15 bits precision typically'
      },
      decrypt: {
        description: 'Decrypt to approximate vector',
        estimatedMs: 300,
        estimatedOpsPerSecond: 3,
        latency: '~300 milliseconds'
      },
      add: {
        description: 'Add two ciphertexts',
        estimatedMs: 50,
        estimatedOpsPerSecond: 20,
        latency: '~50 milliseconds',
        complexity: 'O(N log N)',
        note: 'Vectorized addition'
      },
      multiply: {
        description: 'Multiply two ciphertexts',
        estimatedMs: 500,
        estimatedOpsPerSecond: 2,
        latency: '~500 milliseconds',
        complexity: 'O(N log N)^2',
        note: 'Requires relinearization after multiplication',
        noiseGrowth: 'Significant'
      },
      bootstrap: {
        description: 'Refresh ciphertext (reduce noise)',
        estimatedMs: 5000,
        estimatedOpsPerSecond: 0.2,
        latency: '~5 seconds',
        note: 'Enables unlimited multiplications',
        gateCapacity: 'Unlimited after bootstrapping'
      },
      rotate: {
        description: 'Rotate encrypted vector slots',
        estimatedMs: 200,
        estimatedOpsPerSecond: 5,
        latency: '~200 milliseconds',
        note: 'Enables SIMD-style operations'
      }
    },
    
    complexity: {
      keyGen: 'O(N log N)^2',
      encrypt: 'O(N log N)',
      add: 'O(N log N)',
      multiply: 'O(N log N)^2',
      bootstrap: 'O(N log N)^2'
    },
    
    homomorphicCapabilities: {
      addCiphertexts: true,
      multiplyCiphertexts: true,
      addPlaintext: true,
      multiplyByPlaintext: true,
      rotate: true,
      bootstrap: true,
      limit: 'Noise grows - requires bootstrapping for unlimited depth'
    },
    
    parameters: {
      polyDegree: 16384,
      slots: 4096,
      modulus: '~60 bits',
      precision: '~15-30 bits',
      ciphertextSize: '2 polynomials'
    },
    
    useCases: [
      'Machine learning on encrypted data',
      'Privacy-preserving analytics',
      'Encrypted neural networks',
      'Secure cloud computing'
    ],
    
    notes: 'Best for approximate arithmetic on real/complex numbers. Used in TFHE-like applications. Requires careful noise management.'
  };
}

function getBFVBenchmarks() {
  return {
    algorithm: 'BFV (Brakerski/Fan-Vercauteren)',
    type: 'Exact Integer Fully Homomorphic',
    securityAssumption: 'Ring Learning With Errors (RLWE)',
    
    operations: {
      keyGen: {
        description: 'Generate encryption keys',
        estimatedMs: 15000,
        estimatedOpsPerSecond: 0.067,
        latency: '~15 seconds'
      },
      encrypt: {
        description: 'Encrypt integer vector',
        estimatedMs: 400,
        estimatedOpsPerSecond: 2.5,
        latency: '~400 milliseconds',
        slotCount: '4096 slots'
      },
      decrypt: {
        description: 'Decrypt to integer vector',
        estimatedMs: 250,
        estimatedOpsPerSecond: 4,
        latency: '~250 milliseconds'
      },
      add: {
        description: 'Add two ciphertexts',
        estimatedMs: 40,
        estimatedOpsPerSecond: 25,
        latency: '~40 milliseconds'
      },
      multiply: {
        description: 'Multiply two ciphertexts',
        estimatedMs: 400,
        estimatedOpsPerSecond: 2.5,
        latency: '~400 milliseconds',
        noiseGrowth: 'Moderate',
        note: 'Lower noise growth than CKKS'
      }
    },
    
    complexity: {
      keyGen: 'O(N log N)^2',
      encrypt: 'O(N log N)',
      add: 'O(N log N)',
      multiply: 'O(N log N)^2'
    },
    
    homomorphicCapabilities: {
      addCiphertexts: true,
      multiplyCiphertexts: true,
      addPlaintext: true,
      multiplyByPlaintext: true,
      rotate: false,
      bootstrap: false,
      limit: 'Fixed depth (before refresh)'
    },
    
    parameters: {
      polyDegree: 10204,
      slots: 4096,
      plaintextModulus: '~20-60 bits',
      ciphertextSize: '2 polynomials'
    },
    
    useCases: [
      'Privacy-preserving database queries',
      'Encrypted integer arithmetic',
      'Secure function evaluation',
      'Threshold cryptography'
    ],
    
    notes: 'Better for exact integer arithmetic than CKKS. Lower noise growth. Limited multiplication depth before requiring more complex bootstrapping.'
  };
}

function getTFHEBenchmarks() {
  return {
    algorithm: 'TFHE (Torus FHE)',
    type: 'Boolean Circuit Fully Homomorphic',
    securityAssumption: 'Learning With Errors (LWE)',
    
    operations: {
      keyGen: {
        description: 'Generate keys for bootstrapping',
        estimatedMs: 60000,
        estimatedOpsPerSecond: 0.017,
        latency: '~60 seconds',
        note: 'Complex key structure (lwe + glwe)'
      },
      encrypt: {
        description: 'Encrypt single bit or small integer',
        estimatedMs: 10,
        estimatedOpsPerSecond: 100,
        latency: '~10 milliseconds'
      },
      decrypt: {
        description: 'Decrypt ciphertext',
        estimatedMs: 5,
        estimatedOpsPerSecond: 200,
        latency: '~5 milliseconds'
      },
      gateBootstrap: {
        description: 'Bootstrap single gate (AND, OR, NAND, etc.)',
        estimatedMs: 50,
        estimatedOpsPerSecond: 20,
        latency: '~50 milliseconds',
        note: 'Enables arbitrary circuit depth',
        gateTypes: 'AND, OR, NAND, NOR, XOR, XNOR, MUX, etc.'
      },
      programmableBootstrapping: {
        description: 'Custom function evaluation via bootstrapping',
        estimatedMs: 100,
        estimatedOpsPerSecond: 10,
        latency: '~100 milliseconds',
        note: 'Evaluate arbitrary functions on encrypted data'
      }
    },
    
    complexity: {
      keyGen: 'O(N^3)',
      encrypt: 'O(N)',
      gateBootstrap: 'O(N log N)^2',
      programmableBootstrap: 'O(N log N)^2'
    },
    
    homomorphicCapabilities: {
      arbitraryCircuits: true,
      bootstrapGates: true,
      programmableBootstrapping: true,
      integerArithmetic: 'Via binary decomposition + gate bootstrapping',
      comparison: 'Supported via multiplexer gates',
      muxes: 'MUX gates for conditional execution'
    },
    
    keySizes: {
      lweKey: '~600 bits',
      glweKey: 'N=1024, K=1',
      bootstrappingKey: 'Large (precomputed)',
      lweSample: '~700 bits',
      glweSample: 'N=1024 polynomials'
    },
    
    useCases: [
      'Privacy-preserving computation',
      'Secure function evaluation',
      'Encrypted program execution',
      'General-purpose FHE'
    ],
    
    notes: 'Most flexible FHE scheme. Evaluates arbitrary boolean circuits. Slower than BFV/CKKS but more powerful. Used in practical FHE applications.'
  };
}

async function benchmarkPaillier() {
  return getPaillierBenchmarks();
}

async function benchmarkCKKS() {
  return getCKKSBenchmarks();
}

async function benchmarkBFV() {
  return getBFVBenchmarks();
}

async function benchmarkTFHE() {
  return getTFHEBenchmarks();
}

async function benchmarkAllHomomorphic() {
  const [paillier, elGamal, ckks, bfv, tfhe] = await Promise.all([
    getPaillierBenchmarks(),
    Promise.resolve(getElGamalHomomorphicBenchmarks()),
    Promise.resolve(getCKKSBenchmarks()),
    Promise.resolve(getBFVBenchmarks()),
    Promise.resolve(getTFHEBenchmarks())
  ]);
  
  return {
    paillier,
    elGamal,
    ckks,
    bfv,
    tfhe,
    disclaimer: 'Paillier benchmarks are live (paillier-bigint). Other algorithms use estimated values from research papers.'
  };
}

module.exports = {
  benchmarkAllHomomorphic,
  benchmarkPaillier,
  benchmarkCKKS,
  benchmarkBFV,
  benchmarkTFHE,
  getPaillierBenchmarks,
  getElGamalHomomorphicBenchmarks,
  getCKKSBenchmarks,
  getBFVBenchmarks,
  getTFHEBenchmarks,
  BENCHMARK_DEFAULTS
};
