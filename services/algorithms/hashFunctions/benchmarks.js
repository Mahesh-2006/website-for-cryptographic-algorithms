const crypto = require('crypto');
const blakejs = require('blakejs');
const blake3 = require('blake3-jit');

const BENCHMARK_DEFAULTS = {
  dataSize: 65536,
  iterations: 10000,
  warmupRuns: 100
};

async function benchmarkHash(algorithm = 'sha256', dataSize = BENCHMARK_DEFAULTS.dataSize) {
  const data = crypto.randomBytes(dataSize);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.createHash(algorithm).update(data).digest();
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    crypto.createHash(algorithm).update(data).digest();
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

async function benchmarkAllHashes() {
  const hashes = ['md5', 'sha1', 'sha256', 'sha384', 'sha512'];
  const results = [];
  
  for (const hash of hashes) {
    try {
      results.push(await benchmarkHash(hash));
    } catch (e) {
      console.error(`${hash} benchmark error:`, e.message);
    }
  }
  
  try {
    const blake2b = await benchmarkHash('blake2b512');
    blake2b.algorithm = 'BLAKE2b-512';
    results.push(blake2b);
  } catch (e) {
    console.error('BLAKE2b benchmark error:', e.message);
  }
  
  try {
    const blake2s = await benchmarkHash('blake2s256');
    blake2s.algorithm = 'BLAKE2s-256';
    results.push(blake2s);
  } catch (e) {
    console.error('BLAKE2s benchmark error:', e.message);
  }

  try {
    results.push(await benchmarkBlake3());
  } catch (e) {
    console.error('BLAKE3 benchmark error:', e.message);
  }
  
  return results;
}

async function benchmarkBlake3(dataSize = BENCHMARK_DEFAULTS.dataSize) {
  const data = Buffer.alloc(dataSize);
  crypto.randomFillSync(data);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    blake3.hash(data);
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    blake3.hash(data);
  }
  const end = process.hrtime.bigint();
  
  const nsPerOp = Number(end - start) / BENCHMARK_DEFAULTS.iterations;
  const opsPerSecond = 1e9 / nsPerOp;
  const throughputMBps = (dataSize * 1e9) / (Number(end - start) * 1024 * 1024);
  
  return {
    algorithm: 'BLAKE3',
    dataSize,
    nsPerOp: Math.round(nsPerOp),
    opsPerSecond: Math.round(opsPerSecond),
    throughputMBps: throughputMBps.toFixed(2),
    source: 'blake3-jit (live benchmark)'
  };
}

async function benchmarkHMAC(algorithm = 'sha256', dataSize = BENCHMARK_DEFAULTS.dataSize) {
  const key = crypto.randomBytes(64);
  const data = crypto.randomBytes(dataSize);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.createHmac(algorithm, key).update(data).digest();
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    crypto.createHmac(algorithm, key).update(data).digest();
  }
  const end = process.hrtime.bigint();
  
  const nsPerOp = Number(end - start) / BENCHMARK_DEFAULTS.iterations;
  const opsPerSecond = 1e9 / nsPerOp;
  const throughputMBps = (dataSize * 1e9) / (Number(end - start) * 1024 * 1024);
  
  return {
    algorithm: `hmac-${algorithm}`,
    dataSize,
    nsPerOp: Math.round(nsPerOp),
    opsPerSecond: Math.round(opsPerSecond),
    throughputMBps: throughputMBps.toFixed(2)
  };
}

async function benchmarkAllHMAC() {
  const results = [];
  
  try {
    results.push(await benchmarkHMAC('sha256'));
    results.push(await benchmarkHMAC('sha512'));
  } catch (e) {
    console.error('HMAC benchmark error:', e.message);
  }
  
  return results;
}

module.exports = {
  benchmarkHash,
  benchmarkHMAC,
  benchmarkAllHashes,
  benchmarkAllHMAC,
  BENCHMARK_DEFAULTS
};
