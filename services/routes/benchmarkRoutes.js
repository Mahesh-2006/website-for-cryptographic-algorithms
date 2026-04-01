const express = require('express');
const router = express.Router();

const {
  benchmarkAES,
  benchmarkChaCha20,
  benchmarkAllSymmetric
} = require('../algorithms/symmetric/benchmarks');

const {
  benchmarkHash,
  benchmarkHMAC,
  benchmarkAllHashes,
  benchmarkAllHMAC
} = require('../algorithms/hashFunctions/benchmarks');

const {
  benchmarkAEAD,
  benchmarkAllAEAD
} = require('../algorithms/authenticatedEnc/benchmarks');

const {
  benchmarkRSAKeyGen,
  benchmarkRSAEncrypt,
  benchmarkRSADecrypt,
  benchmarkECKeyGen,
  benchmarkECDH,
  benchmarkAllAsymmetric
} = require('../algorithms/asymmetric/benchmarks');

const {
  benchmarkPBKDF2,
  benchmarkScrypt,
  benchmarkAllPasswordHashing
} = require('../algorithms/passwordHashing/benchmarks');

const {
  benchmarkHMAC: benchmarkHMACmac,
  benchmarkCMAC,
  benchmarkPoly1305,
  benchmarkGMAC,
  benchmarkAllMAC
} = require('../algorithms/mac/benchmarks');

const {
  benchmarkRSAKeyGen: benchmarkRSASign,
  benchmarkRSAEncrypt: benchmarkRSASignOp,
  benchmarkRSAVerify,
  benchmarkECDSASign,
  benchmarkECDSAVerify,
  benchmarkECKeyGen: benchmarkECDSAKeyGen,
  benchmarkAllDigitalSignatures
} = require('../algorithms/digitalSignatures/benchmarks');

const {
  benchmarkDHKeyGen,
  benchmarkDHKeyExchange,
  benchmarkECDHKeyGen,
  benchmarkECDHKeyExchange,
  benchmarkX25519KeyExchange,
  benchmarkAllKeyExchange
} = require('../algorithms/keyExchange/benchmarks');

const {
  benchmarkAllPostQuantum,
  benchmarkKyber,
  benchmarkDilithium
} = require('../algorithms/postQuantum/benchmarks');

const {
  benchmarkAllZeroKnowledge,
  benchmarkSchnorr,
  benchmarkZKSNARK,
  benchmarkZKSTARK,
  benchmarkBulletproofs
} = require('../algorithms/zeroKnowledge/benchmarks');

const {
  benchmarkAllHomomorphic,
  benchmarkPaillier,
  benchmarkCKKS,
  benchmarkBFV,
  benchmarkTFHE
} = require('../algorithms/homomorphic/benchmarks');

const {
  runAllBenchmarks,
  runCategoryBenchmarks,
  getSupportedBenchmarks
} = require('../benchmarkService');

const BENCHMARK_DEFAULTS = {
  dataSize: 65536,
  iterations: 10000,
  warmupRuns: 100
};

router.post('/', async (req, res) => {
  try {
    const { algorithm, category, options = {} } = req.body;
    const dataSize = options.dataSize || BENCHMARK_DEFAULTS.dataSize;
    
    let result;
    let resultCategory = category;
    
    if (category === 'symmetric') {
      if (algorithm === 'all') {
        result = await benchmarkAllSymmetric();
      } else if (algorithm?.startsWith('aes')) {
        const parts = algorithm.split('-');
        const keySize = parseInt(parts[1]);
        const mode = parts[2] || 'gcm';
        result = await benchmarkAES(keySize, mode, dataSize);
      } else if (algorithm === 'chacha20') {
        result = await benchmarkChaCha20(dataSize);
      } else {
        return res.status(400).json({
          success: false,
          error: `Unknown symmetric algorithm: ${algorithm}`
        });
      }
    } else if (category === 'hash') {
      if (algorithm === 'all') {
        const hashes = await benchmarkAllHashes();
        const hmacs = await benchmarkAllHMAC();
        result = { hashes, hmacs };
      } else if (algorithm.startsWith('hmac-')) {
        const hashAlgo = algorithm.replace('hmac-', '');
        result = await benchmarkHMAC(hashAlgo, dataSize);
      } else {
        result = await benchmarkHash(algorithm, dataSize);
      }
    } else if (category === 'authenticatedEncryption') {
      if (algorithm === 'all') {
        result = await benchmarkAllAEAD();
      } else {
        result = await benchmarkAEAD(algorithm, dataSize);
      }
    } else if (category === 'asymmetric') {
      if (algorithm === 'all') {
        result = await benchmarkAllAsymmetric();
      } else if (algorithm.startsWith('RSA')) {
        const keySize = parseInt(algorithm.replace('RSA-', ''));
        const operation = options.operation || 'encrypt';
        if (operation === 'keyGen') {
          result = await benchmarkRSAKeyGen(keySize);
        } else if (operation === 'encrypt') {
          result = await benchmarkRSAEncrypt(keySize, options.dataSize || 256);
        } else if (operation === 'decrypt') {
          result = await benchmarkRSADecrypt(keySize, options.dataSize || 256);
        }
      } else if (algorithm.startsWith('ec') || algorithm === 'prime256v1' || algorithm === 'secp384r1') {
        const curve = algorithm.replace('ec-', '');
        const operation = options.operation || 'keyExchange';
        if (operation === 'keyGen') {
          result = await benchmarkECKeyGen(curve);
        } else {
          result = await benchmarkECDH(curve);
        }
      }
    } else if (category === 'passwordHashing') {
      if (algorithm === 'all') {
        result = await benchmarkAllPasswordHashing();
      } else if (algorithm === 'pbkdf2') {
        result = await benchmarkPBKDF2(options.iterations || 100000, options.keyLength || 32);
      } else if (algorithm === 'scrypt') {
        result = await benchmarkScrypt(options.params || { N: 16384, r: 8, p: 1 });
      }
    } else if (category === 'mac') {
      if (algorithm === 'all') {
        result = await benchmarkAllMAC();
      } else if (algorithm === 'hmac-sha256') {
        result = await benchmarkHMACmac('sha256', 64, dataSize);
      } else if (algorithm === 'hmac-sha512') {
        result = await benchmarkHMACmac('sha512', 128, dataSize);
      } else if (algorithm === 'cmac') {
        result = await benchmarkCMAC(16, dataSize);
      } else if (algorithm === 'poly1305') {
        result = await benchmarkPoly1305(32, dataSize);
      } else if (algorithm === 'gmac') {
        result = await benchmarkGMAC(16, dataSize);
      }
    } else if (category === 'digitalSignatures') {
      if (algorithm === 'all') {
        result = await benchmarkAllDigitalSignatures();
      } else if (algorithm.startsWith('RSA')) {
        const keySize = parseInt(algorithm.replace('RSA-', ''));
        if (options.operation === 'sign') {
          result = await benchmarkRSASign(keySize);
        } else if (options.operation === 'verify') {
          result = await benchmarkRSAVerify(keySize);
        } else if (options.operation === 'keyGen') {
          result = await benchmarkRSAKeyGen(keySize);
        }
      } else if (algorithm.startsWith('ECDSA') || algorithm.startsWith('ecdsa')) {
        const curve = algorithm.replace('ECDSA-', '').replace('ecdsa-', '') || 'prime256v1';
        if (options.operation === 'sign') {
          result = await benchmarkECDSASign(curve);
        } else if (options.operation === 'verify') {
          result = await benchmarkECDSAVerify(curve);
        } else if (options.operation === 'keyGen') {
          result = await benchmarkECKeyGen(curve);
        }
      }
    } else if (category === 'keyExchange') {
      if (algorithm === 'all') {
        result = await benchmarkAllKeyExchange();
      } else if (algorithm.startsWith('DH')) {
        const keySize = parseInt(algorithm.replace('DH-', '')) || 2048;
        if (options.operation === 'keyGen') {
          result = await benchmarkDHKeyGen(`modp${keySize}`);
        } else {
          result = await benchmarkDHKeyExchange(`modp${keySize}`);
        }
      } else if (algorithm.startsWith('ECDH') || algorithm.startsWith('ecdh')) {
        const curve = algorithm.replace('ECDH-', '').replace('ecdh-', '') || 'prime256v1';
        if (options.operation === 'keyGen') {
          result = await benchmarkECDHKeyGen(curve);
        } else {
          result = await benchmarkECDHKeyExchange(curve);
        }
      } else if (algorithm === 'X25519' || algorithm === 'x25519') {
        result = await benchmarkX25519KeyExchange();
      }
    } else if (category === 'postQuantum') {
      if (algorithm === 'all') {
        result = await benchmarkAllPostQuantum();
      } else if (algorithm.startsWith('kyber')) {
        const level = algorithm.replace('kyber', '').replace('-', '') || '512';
        result = await benchmarkKyber(level);
      } else if (algorithm.startsWith('dilithium')) {
        const level = algorithm.replace('dilithium', '').replace('-', '') || '3';
        result = await benchmarkDilithium(level);
      }
    } else if (category === 'zeroKnowledge') {
      if (algorithm === 'all') {
        result = await benchmarkAllZeroKnowledge();
      } else if (algorithm === 'schnorr') {
        result = await benchmarkSchnorr();
      } else if (algorithm === 'zk-snark' || algorithm === 'zkSNARK') {
        result = await benchmarkZKSNARK();
      } else if (algorithm === 'zk-stark' || algorithm === 'zkSTARK') {
        result = await benchmarkZKSTARK();
      } else if (algorithm === 'bulletproofs') {
        result = await benchmarkBulletproofs();
      }
    } else if (category === 'homomorphic') {
      if (algorithm === 'all') {
        result = await benchmarkAllHomomorphic();
      } else if (algorithm === 'paillier') {
        result = await benchmarkPaillier();
      } else if (algorithm === 'ckks') {
        result = await benchmarkCKKS();
      } else if (algorithm === 'bfv') {
        result = await benchmarkBFV();
      } else if (algorithm === 'tfhe') {
        result = await benchmarkTFHE();
      }
    } else {
      const unsupportedResult = await runCategoryBenchmarks(category);
      return res.status(400).json({
        success: false,
        error: `Unknown category: ${category}`
      });
    }
    
    res.json({
      success: true,
      category,
      algorithm: algorithm || 'all',
      timestamp: new Date().toISOString(),
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/run-all', async (req, res) => {
  try {
    const results = await runAllBenchmarks();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/supported', (req, res) => {
  const supported = getSupportedBenchmarks();
  const algorithms = {
    symmetric: ['aes-128-gcm', 'aes-192-gcm', 'aes-256-gcm', 'aes-128-cbc', 'aes-256-cbc', 'chacha20'],
    hash: ['md5', 'sha1', 'sha256', 'sha384', 'sha512', 'blake2b512', 'blake2s256', 'BLAKE2b-512', 'BLAKE2s-256', 'BLAKE3', 'hmac-sha256', 'hmac-sha512'],
    authenticatedEncryption: ['aes-128-gcm', 'aes-192-gcm', 'aes-256-gcm'],
    asymmetric: ['RSA-2048', 'RSA-3072', 'RSA-4096', 'prime256v1', 'secp384r1', 'X25519', 'X448'],
    passwordHashing: ['pbkdf2', 'scrypt', 'argon2id', 'bcrypt'],
    mac: ['hmac-sha256', 'hmac-sha512', 'cmac', 'poly1305', 'gmac', 'cbc-mac'],
    digitalSignatures: ['RSA-2048', 'RSA-4096', 'ECDSA-prime256v1', 'ECDSA-secp384r1', 'EdDSA-Ed25519', 'EdDSA-Ed448'],
    keyExchange: ['DH-2048', 'DH-3072', 'ECDH-prime256v1', 'ECDH-secp384r1', 'X25519', 'X448'],
    postQuantum: ['kyber512', 'kyber768', 'kyber1024', 'dilithium2', 'dilithium3', 'dilithium5', 'sphincs-plus-128s', 'falcon512', 'classic-mceliece'],
    zeroKnowledge: ['schnorr', 'zk-snark', 'zk-stark', 'bulletproofs'],
    homomorphic: ['paillier', 'elgamal-homomorphic', 'ckks', 'bfv', 'tfhe']
  };
  
  res.json({
    success: true,
    supported,
    algorithms
  });
});

module.exports = router;
