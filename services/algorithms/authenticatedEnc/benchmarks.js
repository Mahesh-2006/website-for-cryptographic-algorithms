const crypto = require('crypto');

const BENCHMARK_DEFAULTS = {
  dataSize: 65536,
  iterations: 10000,
  warmupRuns: 100
};

async function benchmarkAEAD(algorithm = 'aes-256-gcm', dataSize = BENCHMARK_DEFAULTS.dataSize) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const data = crypto.randomBytes(dataSize);
  const authTag = Buffer.alloc(16);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.setAuthTag(authTag);
    cipher.update(data);
    cipher.final();
  }
  
  const start = process.hrtime.bigint();
  let lastCiphertext;
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.setAuthTag(authTag);
    lastCiphertext = Buffer.concat([cipher.update(data), cipher.final()]);
  }
  const end = process.hrtime.bigint();
  
  const nsPerOp = Number(end - start) / BENCHMARK_DEFAULTS.iterations;
  const opsPerSecond = 1e9 / nsPerOp;
  const throughputMBps = (dataSize * 1e9) / (Number(end - start) * 1024 * 1024);
  
  return {
    algorithm,
    dataSize,
    nsPerOp: Math.round(nsPerOp),
    opsPerSecond: Math.round(opsPerSecond),
    throughputMBps: throughputMBps.toFixed(2)
  };
}

async function benchmarkAllAEAD() {
  const algorithms = [
    'aes-128-gcm',
    'aes-192-gcm',
    'aes-256-gcm'
  ];
  
  const results = [];
  
  for (const algo of algorithms) {
    try {
      results.push(await benchmarkAEAD(algo));
    } catch (e) {
      console.error(`${algo} benchmark error:`, e.message);
    }
  }
  
  return results;
}

module.exports = {
  benchmarkAEAD,
  benchmarkAllAEAD,
  BENCHMARK_DEFAULTS
};
