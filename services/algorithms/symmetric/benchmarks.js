const crypto = require('crypto');

const BENCHMARK_DEFAULTS = {
  dataSize: 65536,
  iterations: 10000,
  warmupRuns: 100
};

async function benchmarkAES(keySize = 256, mode = 'gcm', dataSize = BENCHMARK_DEFAULTS.dataSize) {
  const algorithm = `aes-${keySize}-${mode}`;
  const key = crypto.randomBytes(keySize / 8);
  const iv = crypto.randomBytes(mode === 'gcm' ? 12 : 16);
  const data = crypto.randomBytes(dataSize);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.update(data);
    cipher.final();
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.update(data);
    cipher.final();
  }
  const end = process.hrtime.bigint();
  
  const nsPerOp = Number(end - start) / BENCHMARK_DEFAULTS.iterations;
  const opsPerSecond = 1e9 / nsPerOp;
  const throughputMBps = (dataSize * 1e9) / (Number(end - start) * 1024 * 1024);
  
  return {
    algorithm,
    keySize,
    mode,
    dataSize,
    nsPerOp: Math.round(nsPerOp),
    opsPerSecond: Math.round(opsPerSecond),
    throughputMBps: throughputMBps.toFixed(2)
  };
}

async function benchmarkChaCha20(dataSize = BENCHMARK_DEFAULTS.dataSize) {
  const key = crypto.randomBytes(32);
  const nonce = crypto.randomBytes(12);
  const data = crypto.randomBytes(dataSize);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    const cipher = crypto.createCipheriv('chacha20', key, nonce);
    cipher.update(data);
    cipher.final();
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    const cipher = crypto.createCipheriv('chacha20', key, nonce);
    cipher.update(data);
    cipher.final();
  }
  const end = process.hrtime.bigint();
  
  const nsPerOp = Number(end - start) / BENCHMARK_DEFAULTS.iterations;
  const opsPerSecond = 1e9 / nsPerOp;
  const throughputMBps = (dataSize * 1e9) / (Number(end - start) * 1024 * 1024);
  
  return {
    algorithm: 'chacha20',
    keySize: 256,
    dataSize,
    nsPerOp: Math.round(nsPerOp),
    opsPerSecond: Math.round(opsPerSecond),
    throughputMBps: throughputMBps.toFixed(2)
  };
}

async function benchmarkAllSymmetric() {
  const results = [];
  
  try {
    results.push(await benchmarkAES(128, 'gcm'));
    results.push(await benchmarkAES(192, 'gcm'));
    results.push(await benchmarkAES(256, 'gcm'));
    results.push(await benchmarkAES(128, 'cbc'));
    results.push(await benchmarkAES(256, 'cbc'));
  } catch (e) {
    console.error('AES benchmark error:', e.message);
  }
  
  try {
    results.push(await benchmarkChaCha20());
  } catch (e) {
    console.error('ChaCha20 benchmark error:', e.message);
  }
  
  return results;
}

module.exports = {
  benchmarkAES,
  benchmarkChaCha20,
  benchmarkAllSymmetric,
  BENCHMARK_DEFAULTS
};
