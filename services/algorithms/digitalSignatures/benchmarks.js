const crypto = require('crypto');

const BENCHMARK_DEFAULTS = {
  iterations: 100,
  warmupRuns: 5
};

async function benchmarkRSASign(keySize = 2048, hashAlgo = 'SHA256') {
  const { privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: keySize,
    publicExponent: 65537
  });
  
  const data = crypto.randomBytes(32);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.sign(hashAlgo, data, privateKey);
  }
  
  const signatures = [];
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    const sig = crypto.sign(hashAlgo, data, privateKey);
    signatures.push(sig);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  const opsPerSecond = 1000 / ms;
  
  return {
    algorithm: `RSA-${keySize}`,
    operation: 'sign',
    hashAlgorithm: hashAlgo,
    keySize,
    signatureSize: Math.ceil(keySize / 8),
    ms: parseFloat(ms.toFixed(3)),
    opsPerSecond: Math.round(opsPerSecond),
    latency: `${(ms * 1000).toFixed(0)} microseconds`
  };
}

async function benchmarkRSAVerify(keySize = 2048, hashAlgo = 'SHA256') {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: keySize,
    publicExponent: 65537
  });
  
  const data = crypto.randomBytes(32);
  const signature = crypto.sign(hashAlgo, data, privateKey);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.verify(hashAlgo, data, publicKey, signature);
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    crypto.verify(hashAlgo, data, publicKey, signature);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  const opsPerSecond = 1000 / ms;
  
  return {
    algorithm: `RSA-${keySize}`,
    operation: 'verify',
    hashAlgorithm: hashAlgo,
    keySize,
    signatureSize: Math.ceil(keySize / 8),
    ms: parseFloat(ms.toFixed(3)),
    opsPerSecond: Math.round(opsPerSecond),
    latency: `${(ms * 1000).toFixed(0)} microseconds`
  };
}

async function benchmarkRSAKeyGen(keySize = 2048) {
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.generateKeyPairSync('rsa', { modulusLength: keySize });
  }
  
  const times = [];
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    const start = process.hrtime.bigint();
    crypto.generateKeyPairSync('rsa', { modulusLength: keySize });
    const end = process.hrtime.bigint();
    times.push(Number(end - start) / 1e6);
  }
  
  const avgMs = times.reduce((a, b) => a + b, 0) / times.length;
  const opsPerSecond = 1000 / avgMs;
  
  return {
    algorithm: `RSA-${keySize}`,
    operation: 'keyGen',
    keySize,
    ms: parseFloat(avgMs.toFixed(3)),
    opsPerSecond: Math.round(opsPerSecond),
    latency: `${(avgMs * 1000).toFixed(0)} microseconds`
  };
}

async function benchmarkECDSASign(curve = 'prime256v1') {
  const { privateKey } = crypto.generateKeyPairSync('ec', { namedCurve: curve });
  
  const data = crypto.randomBytes(32);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.sign('sha256', data, privateKey);
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    crypto.sign('sha256', data, privateKey);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  const opsPerSecond = 1000 / ms;
  
  const signatureSizes = { prime256v1: 64, secp384r1: 96, secp521r1: 132 };
  
  return {
    algorithm: `ECDSA-${curve}`,
    operation: 'sign',
    curve,
    hashAlgorithm: 'SHA256',
    signatureSize: signatureSizes[curve] || 64,
    ms: parseFloat(ms.toFixed(3)),
    opsPerSecond: Math.round(opsPerSecond),
    latency: `${(ms * 1000).toFixed(0)} microseconds`
  };
}

async function benchmarkECDSAVerify(curve = 'prime256v1') {
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: curve });
  
  const data = crypto.randomBytes(32);
  const signature = crypto.sign('sha256', data, privateKey);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.verify('sha256', data, publicKey, signature);
  }
  
  const start = process.hrtime.bigint();
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    crypto.verify('sha256', data, publicKey, signature);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  const opsPerSecond = 1000 / ms;
  
  const signatureSizes = { prime256v1: 64, secp384r1: 96, secp521r1: 132 };
  
  return {
    algorithm: `ECDSA-${curve}`,
    operation: 'verify',
    curve,
    hashAlgorithm: 'SHA256',
    signatureSize: signatureSizes[curve] || 64,
    ms: parseFloat(ms.toFixed(3)),
    opsPerSecond: Math.round(opsPerSecond),
    latency: `${(ms * 1000).toFixed(0)} microseconds`
  };
}

async function benchmarkECDSAKeyGen(curve = 'prime256v1') {
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.generateKeyPairSync('ec', { namedCurve: curve });
  }
  
  const times = [];
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    const start = process.hrtime.bigint();
    crypto.generateKeyPairSync('ec', { namedCurve: curve });
    const end = process.hrtime.bigint();
    times.push(Number(end - start) / 1e6);
  }
  
  const avgMs = times.reduce((a, b) => a + b, 0) / times.length;
  const opsPerSecond = 1000 / avgMs;
  
  return {
    algorithm: `ECDSA-${curve}`,
    operation: 'keyGen',
    curve,
    ms: parseFloat(avgMs.toFixed(3)),
    opsPerSecond: Math.round(opsPerSecond),
    latency: `${(avgMs * 1000).toFixed(0)} microseconds`
  };
}

async function benchmarkAllDigitalSignatures() {
  const results = {
    RSA: [],
    ECDSA: []
  };
  
  const rsaSizes = [2048, 3072, 4096];
  for (const size of rsaSizes) {
    try {
      results.RSA.push({
        keyGen: await benchmarkRSAKeyGen(size),
        sign: await benchmarkRSASign(size),
        verify: await benchmarkRSAVerify(size)
      });
    } catch (e) {
      console.error(`RSA-${size} benchmark error:`, e.message);
    }
  }
  
  const curves = ['prime256v1', 'secp384r1'];
  for (const curve of curves) {
    try {
      results.ECDSA.push({
        keyGen: await benchmarkECDSAKeyGen(curve),
        sign: await benchmarkECDSASign(curve),
        verify: await benchmarkECDSAVerify(curve)
      });
    } catch (e) {
      console.error(`ECDSA-${curve} benchmark error:`, e.message);
    }
  }
  
  return results;
}

module.exports = {
  benchmarkRSASign,
  benchmarkRSAVerify,
  benchmarkRSAKeyGen,
  benchmarkECDSASign,
  benchmarkECDSAVerify,
  benchmarkECDSAKeyGen,
  benchmarkAllDigitalSignatures,
  BENCHMARK_DEFAULTS
};
