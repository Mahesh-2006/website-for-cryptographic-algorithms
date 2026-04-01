const crypto = require('crypto');

const BENCHMARK_DEFAULTS = {
  keySize: 2048,
  iterations: 10,
  warmupRuns: 2
};

async function benchmarkRSAKeyGen(keySize = BENCHMARK_DEFAULTS.keySize) {
  const start = process.hrtime.bigint();
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: keySize,
    publicExponent: 65537
  });
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / 1e6;
  
  return {
    algorithm: `RSA-${keySize}`,
    operation: 'keyGen',
    keySize,
    ms: Math.round(ms),
    opsPerSecond: Math.round(1000 / ms)
  };
}

async function benchmarkRSAEncrypt(keySize = BENCHMARK_DEFAULTS.keySize, dataSize = 256) {
  const { publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: keySize,
    publicExponent: 65537
  });
  
  const plaintext = crypto.randomBytes(dataSize);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.publicEncrypt(publicKey, plaintext);
  }
  
  const start = process.hrtime.bigint();
  let ciphertext;
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    ciphertext = crypto.publicEncrypt(publicKey, plaintext);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  
  return {
    algorithm: `RSA-${keySize}`,
    operation: 'encrypt',
    keySize,
    dataSize,
    ms: ms.toFixed(2),
    opsPerSecond: Math.round(1 / ms)
  };
}

async function benchmarkRSADecrypt(keySize = BENCHMARK_DEFAULTS.keySize, dataSize = 256) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: keySize,
    publicExponent: 65537
  });
  
  const plaintext = crypto.randomBytes(dataSize);
  const ciphertext = crypto.publicEncrypt(publicKey, plaintext);
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.privateDecrypt(privateKey, ciphertext);
  }
  
  const start = process.hrtime.bigint();
  let decrypted;
  for (let i = 0; i < BENCHMARK_DEFAULTS.iterations; i++) {
    decrypted = crypto.privateDecrypt(privateKey, ciphertext);
  }
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / (BENCHMARK_DEFAULTS.iterations * 1e6);
  
  return {
    algorithm: `RSA-${keySize}`,
    operation: 'decrypt',
    keySize,
    ms: ms.toFixed(2),
    opsPerSecond: Math.round(1 / ms)
  };
}

async function benchmarkECKeyGen(curve = 'prime256v1') {
  const start = process.hrtime.bigint();
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', {
    namedCurve: curve
  });
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / 1e6;
  
  return {
    algorithm: curve,
    operation: 'keyGen',
    ms: Math.round(ms),
    opsPerSecond: Math.round(1000 / ms)
  };
}

async function benchmarkECDH(curve = 'prime256v1') {
  const a = crypto.generateKeyPairSync('ec', { namedCurve: curve });
  const b = crypto.generateKeyPairSync('ec', { namedCurve: curve });
  
  for (let i = 0; i < BENCHMARK_DEFAULTS.warmupRuns; i++) {
    crypto.ECDH.convertKey(a.publicKey);
    crypto.ECDH.convertKey(b.publicKey);
  }
  
  const start = process.hrtime.bigint();
  const aPublicKey = crypto.ECDH.convertKey(a.publicKey);
  const bPublicKey = crypto.ECDH.convertKey(b.publicKey);
  const sharedA = a.computeSecret(bPublicKey);
  const sharedB = b.computeSecret(aPublicKey);
  const end = process.hrtime.bigint();
  
  const ms = Number(end - start) / 1e6;
  
  return {
    algorithm: curve,
    operation: 'keyExchange',
    ms: ms.toFixed(2),
    opsPerSecond: Math.round(1000 / ms)
  };
}

async function benchmarkAllAsymmetric() {
  const results = [];
  
  const rsaSizes = [2048, 3072, 4096];
  for (const size of rsaSizes) {
    try {
      results.push(await benchmarkRSAKeyGen(size));
      results.push(await benchmarkRSAEncrypt(size));
      results.push(await benchmarkRSADecrypt(size));
    } catch (e) {
      console.error(`RSA-${size} benchmark error:`, e.message);
    }
  }
  
  const curves = ['prime256v1', 'secp384r1'];
  for (const curve of curves) {
    try {
      results.push(await benchmarkECKeyGen(curve));
      results.push(await benchmarkECDH(curve));
    } catch (e) {
      console.error(`${curve} benchmark error:`, e.message);
    }
  }
  
  return results;
}

module.exports = {
  benchmarkRSAKeyGen,
  benchmarkRSAEncrypt,
  benchmarkRSADecrypt,
  benchmarkECKeyGen,
  benchmarkECDH,
  benchmarkAllAsymmetric,
  BENCHMARK_DEFAULTS
};
