const crypto = require('crypto');

const BENCHMARK_DEFAULTS = {
  iterations: 100,
  warmupRuns: 10
};

async function benchmarkPBKDF2(iterations = 100000, keyLength = 32) {
  const password = crypto.randomBytes(32);
  const salt = crypto.randomBytes(16);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
  }
  
  const start = process.hrtime.bigint();
  const hash = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / 1e6;
  const opsPerSecond = 1000 / ms;
  
  return {
    algorithm: 'PBKDF2-SHA256',
    iterations,
    keyLength,
    ms: ms.toFixed(2),
    opsPerSecond: Math.round(opsPerSecond),
    recommendedOpsPerSecond: Math.round(1000 / 600)
  };
}

async function benchmarkScrypt(params = { N: 16384, r: 8, p: 1 }, keyLength = 32) {
  const password = crypto.randomBytes(32);
  const salt = crypto.randomBytes(16);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.scryptSync(password, salt, keyLength, params);
  }
  
  const start = process.hrtime.bigint();
  const hash = crypto.scryptSync(password, salt, keyLength, params);
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / 1e6;
  const opsPerSecond = 1000 / ms;
  const memoryMB = (params.N * params.r * 128) / (1024 * 1024);
  
  return {
    algorithm: 'scrypt',
    params,
    memoryMB: memoryMB.toFixed(2),
    ms: ms.toFixed(2),
    opsPerSecond: Math.round(opsPerSecond)
  };
}

async function benchmarkAllPasswordHashing() {
  const results = [];
  
  const pbkdf2Iterations = [60000, 100000, 250000, 500000];
  for (const iter of pbkdf2Iterations) {
    try {
      results.push(await benchmarkPBKDF2(iter));
    } catch (e) {
      console.error('PBKDF2 benchmark error:', e.message);
    }
  }
  
  const scryptParams = [
    { N: 16384, r: 8, p: 1, label: 'interactive' },
    { N: 32768, r: 8, p: 1, label: 'moderate' },
    { N: 65536, r: 8, p: 1, label: 'sensitive' }
  ];
  
  for (const params of scryptParams) {
    try {
      results.push(await benchmarkScrypt(params));
    } catch (e) {
      console.error('scrypt benchmark error:', e.message);
    }
  }
  
  return results;
}

module.exports = {
  benchmarkPBKDF2,
  benchmarkScrypt,
  benchmarkAllPasswordHashing,
  BENCHMARK_DEFAULTS
};
