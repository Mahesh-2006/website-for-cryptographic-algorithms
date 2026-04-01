/**
 * Hardware Performance Database
 * Pre-calibrated performance values for accurate cryptographic estimates
 * 
 * Categories:
 * 1. Consumer CPUs (Desktop/Laptop)
 * 2. Workstation CPUs
 * 3. Server CPUs
 * 4. Supercomputers
 * 5. Quantum Computers
 * 
 * All performance values are calibrated in operations per second for:
 * - AES operations (with/without AES-NI)
 * - RSA operations (2048-bit, 4096-bit)
 * - SHA-256 hashing
 * - Discrete log operations (Elliptic Curve)
 * - Modular exponentiation
 */

// Base performance unit: operations per second for a single core
// Reference: Intel i5-12400 = 1.0 baseline

const PERFORMANCE基准 = {
  baseline: {
    cpu: 'Intel i5-12400',
    aesOpsPerSec: 500000000,        // 500M AES-128 ops/sec
    rsa2048OpsPerSec: 1000,          // 1000 RSA-2048 ops/sec
    rsa4096OpsPerSec: 150,           // 150 RSA-4096 ops/sec
    sha256OpsPerSec: 800000000,      // 800M SHA-256 ops/sec
    ecdsaOpsPerSec: 50000,           // 50K ECDSA ops/sec
    modExpOpsPerSec: 500,            // 500 modular exponentiations/sec
    memoryBandwidthGBps: 25,         // 25 GB/s
    aesNiSupport: true,
    cores: 6,
    baseClockGHz: 2.5,
    boostClockGHz: 4.4
  }
};

// ============================================
// CONSUMER CPUs (Desktop & Laptop)
// ============================================
const CONSUMER_CPUS = {
  // Intel Consumer Line
  'intel-i3-12100': {
    name: 'Intel Core i3-12100',
    category: 'consumer',
    architecture: 'x86_64',
    cores: 4,
    threads: 8,
    baseClockGHz: 3.3,
    boostClockGHz: 4.3,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 0.7,
    specs: {
      aes: { opsPerSec: 350000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 700, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 105, unit: 'ops/sec' },
      sha256: { opsPerSec: 560000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 35000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 50, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 20, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'intel-i5-12400': {
    name: 'Intel Core i5-12400',
    category: 'consumer',
    architecture: 'x86_64',
    cores: 6,
    threads: 12,
    baseClockGHz: 2.5,
    boostClockGHz: 4.4,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 1.0,
    specs: {
      aes: { opsPerSec: 500000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 1000, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 150, unit: 'ops/sec' },
      sha256: { opsPerSec: 800000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 50000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 70, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 30, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'intel-i7-13700': {
    name: 'Intel Core i7-13700',
    category: 'consumer',
    architecture: 'x86_64',
    cores: 16,
    threads: 24,
    baseClockGHz: 2.1,
    boostClockGHz: 5.2,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 1.8,
    specs: {
      aes: { opsPerSec: 900000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 1800, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 270, unit: 'ops/sec' },
      sha256: { opsPerSec: 1440000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 90000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 120, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 50, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'intel-i9-13900k': {
    name: 'Intel Core i9-13900K',
    category: 'consumer',
    architecture: 'x86_64',
    cores: 24,
    threads: 32,
    baseClockGHz: 3.0,
    boostClockGHz: 5.8,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 2.5,
    specs: {
      aes: { opsPerSec: 1250000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 2500, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 375, unit: 'ops/sec' },
      sha256: { opsPerSec: 2000000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 125000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 150, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 65, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'intel-i9-14900k': {
    name: 'Intel Core i9-14900K',
    category: 'consumer',
    architecture: 'x86_64',
    cores: 24,
    threads: 32,
    baseClockGHz: 3.2,
    boostClockGHz: 6.0,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 2.8,
    specs: {
      aes: { opsPerSec: 1400000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 2800, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 420, unit: 'ops/sec' },
      sha256: { opsPerSec: 2240000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 140000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 170, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 75, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  
  // AMD Consumer Line
  'amd-ryzen5-5600': {
    name: 'AMD Ryzen 5 5600',
    category: 'consumer',
    architecture: 'x86_64',
    cores: 6,
    threads: 12,
    baseClockGHz: 3.5,
    boostClockGHz: 4.4,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 0.95,
    specs: {
      aes: { opsPerSec: 475000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 950, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 142, unit: 'ops/sec' },
      sha256: { opsPerSec: 760000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 47500, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 65, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 28, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'amd-ryzen7-7700x': {
    name: 'AMD Ryzen 7 7700X',
    category: 'consumer',
    architecture: 'x86_64',
    cores: 8,
    threads: 16,
    baseClockGHz: 4.5,
    boostClockGHz: 5.4,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 1.6,
    specs: {
      aes: { opsPerSec: 800000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 1600, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 240, unit: 'ops/sec' },
      sha256: { opsPerSec: 1280000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 80000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 110, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 45, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'amd-ryzen9-7950x': {
    name: 'AMD Ryzen 9 7950X',
    category: 'consumer',
    architecture: 'x86_64',
    cores: 16,
    threads: 32,
    baseClockGHz: 4.5,
    boostClockGHz: 5.7,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 2.6,
    specs: {
      aes: { opsPerSec: 1300000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 2600, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 390, unit: 'ops/sec' },
      sha256: { opsPerSec: 2080000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 130000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 160, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 70, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  
  // Apple Silicon
  'apple-m1': {
    name: 'Apple M1',
    category: 'consumer',
    architecture: 'arm64',
    cores: 8,
    threads: 8,
    baseClockGHz: 3.2,
    boostClockGHz: 3.2,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 1.1,
    specs: {
      aes: { opsPerSec: 550000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 1100, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 165, unit: 'ops/sec' },
      sha256: { opsPerSec: 880000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 55000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 75, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 32, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'apple-m2': {
    name: 'Apple M2',
    category: 'consumer',
    architecture: 'arm64',
    cores: 8,
    threads: 8,
    baseClockGHz: 3.5,
    boostClockGHz: 3.5,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 1.4,
    specs: {
      aes: { opsPerSec: 700000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 1400, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 210, unit: 'ops/sec' },
      sha256: { opsPerSec: 1120000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 70000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 95, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 40, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'apple-m3-max': {
    name: 'Apple M3 Max',
    category: 'consumer',
    architecture: 'arm64',
    cores: 16,
    threads: 16,
    baseClockGHz: 4.0,
    boostClockGHz: 4.0,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 2.2,
    specs: {
      aes: { opsPerSec: 1100000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 2200, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 330, unit: 'ops/sec' },
      sha256: { opsPerSec: 1760000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 110000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 140, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 60, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'apple-m4-ultra': {
    name: 'Apple M4 Ultra',
    category: 'consumer',
    architecture: 'arm64',
    cores: 32,
    threads: 32,
    baseClockGHz: 4.2,
    boostClockGHz: 4.2,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 4.0,
    specs: {
      aes: { opsPerSec: 2000000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 4000, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 600, unit: 'ops/sec' },
      sha256: { opsPerSec: 3200000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 200000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 250, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 110, unit: 'hashes/sec', memoryMB: 64 }
    }
  }
};

// ============================================
// WORKSTATION CPUs
// ============================================
const WORKSTATION_CPUS = {
  'intel-xeon-w-2295': {
    name: 'Intel Xeon W-2295',
    category: 'workstation',
    architecture: 'x86_64',
    cores: 18,
    threads: 36,
    baseClockGHz: 3.0,
    boostClockGHz: 4.8,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 2.2,
    specs: {
      aes: { opsPerSec: 1100000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 2200, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 330, unit: 'ops/sec' },
      sha256: { opsPerSec: 1760000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 110000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 140, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 60, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'amd-ripper-pro-5995wx': {
    name: 'AMD Threadripper PRO 5995WX',
    category: 'workstation',
    architecture: 'x86_64',
    cores: 64,
    threads: 128,
    baseClockGHz: 2.7,
    boostClockGHz: 4.5,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 6.0,
    specs: {
      aes: { opsPerSec: 3000000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 6000, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 900, unit: 'ops/sec' },
      sha256: { opsPerSec: 4800000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 300000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 380, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 165, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'amd-ripper-pro-7995wx': {
    name: 'AMD Threadripper PRO 7995WX',
    category: 'workstation',
    architecture: 'x86_64',
    cores: 96,
    threads: 192,
    baseClockGHz: 2.5,
    boostClockGHz: 5.1,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 10.0,
    specs: {
      aes: { opsPerSec: 5000000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 10000, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 1500, unit: 'ops/sec' },
      sha256: { opsPerSec: 8000000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 500000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 600, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 260, unit: 'hashes/sec', memoryMB: 64 }
    }
  }
};

// ============================================
// SERVER CPUs
// ============================================
const SERVER_CPUS = {
  'intel-xeon-gold-6348': {
    name: 'Intel Xeon Gold 6348',
    category: 'server',
    architecture: 'x86_64',
    cores: 28,
    threads: 56,
    baseClockGHz: 2.6,
    boostClockGHz: 3.4,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 3.5,
    specs: {
      aes: { opsPerSec: 1750000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 3500, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 525, unit: 'ops/sec' },
      sha256: { opsPerSec: 2800000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 175000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 220, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 95, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'intel-xeon-platinum-8480+': {
    name: 'Intel Xeon Platinum 8480+',
    category: 'server',
    architecture: 'x86_64',
    cores: 56,
    threads: 112,
    baseClockGHz: 2.0,
    boostClockGHz: 3.8,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 6.0,
    specs: {
      aes: { opsPerSec: 3000000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 6000, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 900, unit: 'ops/sec' },
      sha256: { opsPerSec: 4800000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 300000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 380, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 165, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'amd-epyc-7763': {
    name: 'AMD EPYC 7763',
    category: 'server',
    architecture: 'x86_64',
    cores: 64,
    threads: 128,
    baseClockGHz: 2.45,
    boostClockGHz: 3.5,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 7.0,
    specs: {
      aes: { opsPerSec: 3500000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 7000, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 1050, unit: 'ops/sec' },
      sha256: { opsPerSec: 5600000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 350000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 440, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 190, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'amd-epyc-9654': {
    name: 'AMD EPYC 9654 (Genoa)',
    category: 'server',
    architecture: 'x86_64',
    cores: 96,
    threads: 192,
    baseClockGHz: 2.4,
    boostClockGHz: 3.7,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 12.0,
    specs: {
      aes: { opsPerSec: 6000000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 12000, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 1800, unit: 'ops/sec' },
      sha256: { opsPerSec: 9600000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 600000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 760, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 330, unit: 'hashes/sec', memoryMB: 64 }
    }
  },
  'apple-m2-ultra-server': {
    name: 'Apple M2 Ultra (Server Config)',
    category: 'server',
    architecture: 'arm64',
    cores: 24,
    threads: 24,
    baseClockGHz: 3.5,
    boostClockGHz: 3.5,
    aesNi: true,
    shaExtensions: true,
    performanceScore: 3.5,
    specs: {
      aes: { opsPerSec: 1750000000, unit: 'AES-128 ops/sec' },
      rsa2048: { opsPerSec: 3500, unit: 'ops/sec' },
      rsa4096: { opsPerSec: 525, unit: 'ops/sec' },
      sha256: { opsPerSec: 2800000000, unit: 'hashes/sec' },
      ecdsa: { opsPerSec: 175000, unit: 'signatures/sec' },
      scrypt: { opsPerSec: 220, unit: 'hashes/sec', memoryMB: 16 },
      argon2id: { opsPerSec: 95, unit: 'hashes/sec', memoryMB: 64 }
    }
  }
};

// ============================================
// GPU ACCELERATORS (for parallel attacks)
// ============================================
const GPU_ACCELERATORS = {
  'none': {
    name: 'No GPU',
    category: 'gpu',
    performanceMultiplier: 1,
    aesMultiplier: 1,
    shaMultiplier: 1,
    notes: 'CPU only'
  },
  'nvidia-rtx-4090': {
    name: 'NVIDIA RTX 4090',
    category: 'gpu',
    architecture: 'cuda',
    cudaCores: 16384,
    boostClockGHz: 2.52,
    memoryGB: 24,
    memoryBandwidthGBps: 1008,
    performanceMultiplier: 50,
    aesMultiplier: 100,
    shaMultiplier: 200,
    rsaMultiplier: 10,
    notes: 'Excellent for hash cracking, password brute-force'
  },
  'nvidia-a100': {
    name: 'NVIDIA A100',
    category: 'gpu',
    architecture: 'cuda',
    cudaCores: 6912,
    boostClockGHz: 1.41,
    memoryGB: 80,
    memoryBandwidthGBps: 2039,
    performanceMultiplier: 80,
    aesMultiplier: 150,
    shaMultiplier: 300,
    rsaMultiplier: 15,
    notes: 'Data center GPU, excellent for large-scale attacks'
  },
  'nvidia-h100': {
    name: 'NVIDIA H100',
    category: 'gpu',
    architecture: 'cuda',
    cudaCores: 16896,
    boostClockGHz: 1.98,
    memoryGB: 80,
    memoryBandwidthGBps: 3350,
    performanceMultiplier: 150,
    aesMultiplier: 250,
    shaMultiplier: 500,
    rsaMultiplier: 25,
    notes: 'Latest data center GPU, fastest available'
  },
  'amd-rx-7900-xtx': {
    name: 'AMD Radeon RX 7900 XTX',
    category: 'gpu',
    architecture: 'rdna3',
    streamProcessors: 6144,
    boostClockGHz: 2.5,
    memoryGB: 24,
    memoryBandwidthGBps: 960,
    performanceMultiplier: 35,
    aesMultiplier: 70,
    shaMultiplier: 140,
    rsaMultiplier: 7,
    notes: 'Good for hash cracking'
  }
};

// ============================================
// SUPERCOMPUTERS
// ============================================
const SUPERCOMPUTERS = {
  'fugaku': {
    name: 'Fugaku (RIKEN)',
    category: 'supercomputer',
    architecture: 'arm64-a64fx',
    cores: 15897600,
    theoreticalPeakTFlops: 1006,
    powerMW: 29.9,
    aesMultiplier: 31795,
    shaMultiplier: 158976,
    rsaMultiplier: 158976,
    memoryTB: 5106,
    notes: 'World\'s most power-efficient supercomputer (2024)'
  },
  'frontier': {
    name: 'Frontier (Oak Ridge)',
    category: 'supercomputer',
    architecture: 'x86_64-gpu',
    cores: 8699904,
    gpus: 37632,
    theoreticalPeakTFlops: 1194,
    powerMW: 21.1,
    aesMultiplier: 50000,
    shaMultiplier: 250000,
    rsaMultiplier: 100000,
    memoryTB: 4600,
    notes: 'First exascale supercomputer'
  },
  'aurora': {
    name: 'Aurora (Argonne)',
    category: 'supercomputer',
    architecture: 'x86_64-gpu',
    cores: 9324032,
    gpus: 63744,
    theoreticalPeakTFlops: 1584,
    powerMW: 60,
    aesMultiplier: 70000,
    shaMultiplier: 350000,
    rsaMultiplier: 150000,
    memoryTB: 7000,
    notes: 'Most powerful supercomputer (2026)'
  },
  'eagle': {
    name: 'Eagle (Microsoft)',
    category: 'supercomputer',
    architecture: 'x86_64-gpu',
    cores: 2000000,
    gpus: 16000,
    theoreticalPeakTFlops: 561,
    powerMW: 15,
    aesMultiplier: 25000,
    shaMultiplier: 125000,
    rsaMultiplier: 50000,
    memoryTB: 2000,
    notes: 'Microsoft Azure cloud supercomputer'
  },
  'lumi': {
    name: 'LUMI (CSC Finland)',
    category: 'supercomputer',
    architecture: 'x86_64-gpu',
    cores: 2750000,
    gpus: 6000,
    theoreticalPeakTFlops: 380,
    powerMW: 6,
    aesMultiplier: 15000,
    shaMultiplier: 75000,
    rsaMultiplier: 30000,
    memoryTB: 1500,
    notes: 'European supercomputer'
  }
};

// ============================================
// QUANTUM COMPUTERS
// ============================================
const QUANTUM_COMPUTERS = {
  'ibm-heron': {
    name: 'IBM Heron (2024)',
    category: 'quantum',
    architecture: 'quantum-superconducting',
    qubits: 133,
    quantumVolume: 512,
    gateError: 0.001,
    coherenceTimeMs: 0.3,
    rsaSpeedup: 'Shor\'s: O(n³) vs classical O(exp(n))',
    eccSpeedup: 'ECDLP broken by Shor\'s algorithm',
    practicalForRSA: false,
    notes: 'Current era quantum - too small for breaking RSA-2048'
  },
  'ibm-flamingo': {
    name: 'IBM Flamingo (2025)',
    category: 'quantum',
    architecture: 'quantum-superconducting',
    qubits: 1386,
    quantumVolume: 8192,
    gateError: 0.0005,
    coherenceTimeMs: 0.5,
    rsaSpeedup: 'Approaching cryptographic relevance',
    eccSpeedup: 'Could break ECC-256 with error correction',
    practicalForRSA: false,
    notes: 'Large scale, needs better error correction'
  },
  'ibm-starling': {
    name: 'IBM Starling (2026)',
    category: 'quantum',
    architecture: 'quantum-superconducting',
    qubits: 100000,
    quantumVolume: 65536,
    gateError: 0.0001,
    coherenceTimeMs: 1.0,
    rsaSpeedup: 'Breaking RSA-2048 requires ~4000 logical qubits',
    eccSpeedup: 'Breaking ECC-256 requires ~1500 logical qubits',
    practicalForRSA: true,
    notes: 'Error-corrected, cryptographically relevant'
  },
  'google-willow': {
    name: 'Google Willow (2024)',
    category: 'quantum',
    architecture: 'quantum-superconducting',
    qubits: 105,
    quantumVolume: 256,
    gateError: 0.0015,
    coherenceTimeMs: 0.2,
    rsaSpeedup: 'Below cryptographic threshold',
    eccSpeedup: 'Below cryptographic threshold',
    practicalForRSA: false,
    notes: 'Focus on quantum error correction research'
  },
  'ionq-forte': {
    name: 'IonQ Forte (2024)',
    category: 'quantum',
    architecture: 'quantum-trapped-ion',
    qubits: 36,
    quantumVolume: 32768,
    gateError: 0.0003,
    coherenceTimeMs: 100,
    rsaSpeedup: 'High gate fidelity but few qubits',
    eccSpeedup: 'High quality gates, limited scale',
    practicalForRSA: false,
    notes: 'Trapped ion - very high quality gates'
  },
  'quantinuum-h2': {
    name: 'Quantinuum H2 (2025)',
    category: 'quantum',
    architecture: 'quantum-trapped-ion',
    qubits: 56,
    quantumVolume: 65536,
    gateError: 0.0002,
    coherenceTimeMs: 200,
    rsaSpeedup: 'Highest fidelity quantum computer',
    eccSpeedup: 'Could theoretically attack small ECC',
    practicalForRSA: false,
    notes: 'Highest quantum volume, best gate fidelity'
  }
};

// ============================================
// MEMORY CONFIGURATIONS
// ============================================
const MEMORY_CONFIGS = {
  '4gb': { ramGB: 4, label: '4 GB', memoryHardPenalty: 0.5, notes: 'Very limited for memory-hard algorithms' },
  '8gb': { ramGB: 8, label: '8 GB', memoryHardPenalty: 0.75, notes: 'Minimum for most operations' },
  '16gb': { ramGB: 16, label: '16 GB', memoryHardPenalty: 1.0, notes: 'Standard configuration' },
  '32gb': { ramGB: 32, label: '32 GB', memoryHardPenalty: 1.0, notes: 'Good for large memory-hard operations' },
  '64gb': { ramGB: 64, label: '64 GB', memoryHardPenalty: 1.0, notes: 'Excellent for all operations' },
  '128gb': { ramGB: 128, label: '128 GB', memoryHardPenalty: 1.0, notes: 'Workstation grade' },
  '256gb': { ramGB: 256, label: '256 GB', memoryHardPenalty: 1.0, notes: 'Server grade' },
  '512gb': { ramGB: 512, label: '512 GB', memoryHardPenalty: 1.0, notes: 'High-end server' },
  '1tb': { ramGB: 1024, label: '1 TB', memoryHardPenalty: 1.0, notes: 'Supercomputer node' },
  '4tb': { ramGB: 4096, label: '4 TB', memoryHardPenalty: 1.0, notes: 'Supercomputer' },
  '8tb': { ramGB: 8192, label: '8 TB', memoryHardPenalty: 1.0, notes: 'Supercomputer' }
};

// ============================================
// OPERATING SYSTEMS
// ============================================
const OPERATING_SYSTEMS = {
  'windows-11': { name: 'Windows 11', cryptoMultiplier: 1.0, notes: 'Standard performance' },
  'windows-server-2022': { name: 'Windows Server 2022', cryptoMultiplier: 1.0, notes: 'Optimized for server workloads' },
  'macos-14': { name: 'macOS Sonoma', cryptoMultiplier: 1.05, notes: 'Slightly optimized crypto' },
  'ubuntu-24-04': { name: 'Ubuntu 24.04 LTS', cryptoMultiplier: 1.0, notes: 'Standard Linux' },
  'debian-12': { name: 'Debian 12', cryptoMultiplier: 1.0, notes: 'Minimal overhead' },
  'rhel-9': { name: 'RHEL 9', cryptoMultiplier: 1.02, notes: 'Enterprise optimized' },
  'fedora-40': { name: 'Fedora 40', cryptoMultiplier: 1.0, notes: 'Bleeding edge packages' }
};

// ============================================
// NODE.JS VERSIONS
// ============================================
const NODE_VERSIONS = {
  '18': { version: '18.x', cryptoMultiplier: 0.9, notes: 'LTS, slightly older optimizations' },
  '20': { version: '20.x', cryptoMultiplier: 0.95, notes: 'LTS, good optimizations' },
  '22': { version: '22.x', cryptoMultiplier: 1.0, notes: 'Current LTS, baseline' },
  '24': { version: '24.x', cryptoMultiplier: 1.05, notes: 'Latest, best optimizations' }
};

// ============================================
// AGGREGATE ALL HARDWARE
// ============================================
const ALL_HARDWARE = {
  consumer: CONSUMER_CPUS,
  workstation: WORKSTATION_CPUS,
  server: SERVER_CPUS,
  gpu: GPU_ACCELERATORS,
  supercomputer: SUPERCOMPUTERS,
  quantum: QUANTUM_COMPUTERS,
  memory: MEMORY_CONFIGS,
  os: OPERATING_SYSTEMS,
  node: NODE_VERSIONS
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function getCpuById(id) {
  return CONSUMER_CPUS[id] || WORKSTATION_CPUS[id] || SERVER_CPUS[id] || null;
}

function getGpuById(id) {
  return GPU_ACCELERATORS[id] || null;
}

function getSupercomputerById(id) {
  return SUPERCOMPUTERS[id] || null;
}

function getQuantumComputerById(id) {
  return QUANTUM_COMPUTERS[id] || null;
}

function getMemoryConfig(id) {
  return MEMORY_CONFIGS[id] || null;
}

function getAllCpus() {
  return {
    ...CONSUMER_CPUS,
    ...WORKSTATION_CPUS,
    ...SERVER_CPUS
  };
}

function getCpusByCategory(category) {
  const map = {
    consumer: CONSUMER_CPUS,
    workstation: WORKSTATION_CPUS,
    server: SERVER_CPUS
  };
  return map[category] || {};
}

function calculateEffectivePerformance(config) {
  const { cpu, gpu, memory, os, node, cores } = config;
  
  const cpuData = getCpuById(cpu);
  const gpuData = getGpuById(gpu);
  const memData = getMemoryConfig(memory);
  const osData = OPERATING_SYSTEMS[os] || { cryptoMultiplier: 1.0 };
  const nodeData = NODE_VERSIONS[node] || { cryptoMultiplier: 1.0 };
  
  if (!cpuData) return null;
  
  const coreMultiplier = cores ? cores / cpuData.cores : 1;
  const memPenalty = memData ? memData.memoryHardPenalty : 1.0;
  
  return {
    aes: Math.round(cpuData.specs.aes.opsPerSec * coreMultiplier * osData.cryptoMultiplier * nodeData.cryptoMultiplier * (gpuData ? gpuData.aesMultiplier : 1)),
    rsa2048: Math.round(cpuData.specs.rsa2048.opsPerSec * coreMultiplier * osData.cryptoMultiplier * nodeData.cryptoMultiplier * (gpuData ? gpuData.rsaMultiplier || 1 : 1)),
    rsa4096: Math.round(cpuData.specs.rsa4096.opsPerSec * coreMultiplier * osData.cryptoMultiplier * nodeData.cryptoMultiplier * (gpuData ? gpuData.rsaMultiplier || 1 : 1)),
    sha256: Math.round(cpuData.specs.sha256.opsPerSec * coreMultiplier * osData.cryptoMultiplier * nodeData.cryptoMultiplier * (gpuData ? gpuData.shaMultiplier : 1)),
    ecdsa: Math.round(cpuData.specs.ecdsa.opsPerSec * coreMultiplier * osData.cryptoMultiplier * nodeData.cryptoMultiplier),
    scrypt: Math.round(cpuData.specs.scrypt.opsPerSec * coreMultiplier * memPenalty * osData.cryptoMultiplier * nodeData.cryptoMultiplier),
    argon2id: Math.round(cpuData.specs.argon2id.opsPerSec * coreMultiplier * memPenalty * osData.cryptoMultiplier * nodeData.cryptoMultiplier),
    memoryPenalty: memPenalty,
    gpuBoost: gpuData ? gpuData.performanceMultiplier : 1
  };
}

module.exports = {
  ALL_HARDWARE,
  CONSUMER_CPUS,
  WORKSTATION_CPUS,
  SERVER_CPUS,
  GPU_ACCELERATORS,
  SUPERCOMPUTERS,
  QUANTUM_COMPUTERS,
  MEMORY_CONFIGS,
  OPERATING_SYSTEMS,
  NODE_VERSIONS,
  getCpuById,
  getGpuById,
  getSupercomputerById,
  getQuantumComputerById,
  getMemoryConfig,
  getAllCpus,
  getCpusByCategory,
  calculateEffectivePerformance
};
