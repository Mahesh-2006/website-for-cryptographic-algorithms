const express = require('express');
const router = express.Router();

const {
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
} = require('../hardware/database');

// Get all hardware options organized by category
router.get('/', (req, res) => {
  res.json({
    success: true,
    categories: {
      consumer: Object.entries(CONSUMER_CPUS).map(([id, cpu]) => ({
        id,
        name: cpu.name,
        category: cpu.category,
        cores: cpu.cores,
        threads: cpu.threads,
        aesNi: cpu.aesNi,
        performanceScore: cpu.performanceScore
      })),
      workstation: Object.entries(WORKSTATION_CPUS).map(([id, cpu]) => ({
        id,
        name: cpu.name,
        category: cpu.category,
        cores: cpu.cores,
        threads: cpu.threads,
        aesNi: cpu.aesNi,
        performanceScore: cpu.performanceScore
      })),
      server: Object.entries(SERVER_CPUS).map(([id, cpu]) => ({
        id,
        name: cpu.name,
        category: cpu.category,
        cores: cpu.cores,
        threads: cpu.threads,
        aesNi: cpu.aesNi,
        performanceScore: cpu.performanceScore
      })),
      gpu: Object.entries(GPU_ACCELERATORS).map(([id, gpu]) => ({
        id,
        name: gpu.name,
        category: gpu.category,
        performanceMultiplier: gpu.performanceMultiplier,
        notes: gpu.notes
      })),
      supercomputer: Object.entries(SUPERCOMPUTERS).map(([id, sc]) => ({
        id,
        name: sc.name,
        category: sc.category,
        cores: sc.cores,
        theoreticalPeakTFlops: sc.theoreticalPeakTFlops,
        notes: sc.notes
      })),
      quantum: Object.entries(QUANTUM_COMPUTERS).map(([id, qc]) => ({
        id,
        name: qc.name,
        category: qc.category,
        qubits: qc.qubits,
        quantumVolume: qc.quantumVolume,
        practicalForRSA: qc.practicalForRSA,
        notes: qc.notes
      })),
      memory: Object.entries(MEMORY_CONFIGS).map(([id, mem]) => ({
        id,
        label: mem.label,
        ramGB: mem.ramGB,
        notes: mem.notes
      })),
      os: Object.entries(OPERATING_SYSTEMS).map(([id, os]) => ({
        id,
        name: os.name,
        notes: os.notes
      })),
      node: Object.entries(NODE_VERSIONS).map(([id, node]) => ({
        id,
        version: node.version,
        notes: node.notes
      }))
    }
  });
});

// Get detailed info for a specific CPU
router.get('/cpu/:id', (req, res) => {
  const cpu = getCpuById(req.params.id);
  if (cpu) {
    res.json({ success: true, cpu });
  } else {
    res.status(404).json({ success: false, error: 'CPU not found' });
  }
});

// Get detailed info for a specific GPU
router.get('/gpu/:id', (req, res) => {
  const gpu = getGpuById(req.params.id);
  if (gpu) {
    res.json({ success: true, gpu });
  } else {
    res.status(404).json({ success: false, error: 'GPU not found' });
  }
});

// Get detailed info for a supercomputer
router.get('/supercomputer/:id', (req, res) => {
  const sc = getSupercomputerById(req.params.id);
  if (sc) {
    res.json({ success: true, supercomputer: sc });
  } else {
    res.status(404).json({ success: false, error: 'Supercomputer not found' });
  }
});

// Get detailed info for a quantum computer
router.get('/quantum/:id', (req, res) => {
  const qc = getQuantumComputerById(req.params.id);
  if (qc) {
    res.json({ success: true, quantum: qc });
  } else {
    res.status(404).json({ success: false, error: 'Quantum computer not found' });
  }
});

// Calculate effective performance for a hardware configuration
router.post('/calculate', (req, res) => {
  const { cpu, gpu, memory, os, node, cores } = req.body;
  
  if (!cpu) {
    return res.status(400).json({ success: false, error: 'CPU is required' });
  }
  
  // Check if it's a quantum computer
  const quantumData = getQuantumComputerById(cpu);
  const supercomputerData = getSupercomputerById(cpu);
  const cpuData = getCpuById(cpu);
  
  if (quantumData) {
    // Quantum computer performance
    return res.json({
      success: true,
      config: { cpu, gpu, memory, os, node, cores },
      cpuName: quantumData.name,
      isQuantum: true,
      quantumInfo: {
        qubits: quantumData.qubits,
        quantumVolume: quantumData.quantumVolume,
        practicalForRSA: quantumData.practicalForRSA,
        rsaSpeedup: quantumData.rsaSpeedup,
        eccSpeedup: quantumData.eccSpeedup,
        gateError: quantumData.gateError,
        coherenceTimeMs: quantumData.coherenceTimeMs
      },
      performance: {
        note: 'Quantum computers use different algorithms (Shor\'s, Grover\'s) for breaking cryptography',
        shorRSA: quantumData.practicalForRSA ? 'RSA broken in polynomial time' : 'Requires more qubits',
        shorECC: quantumData.practicalForRSA ? 'ECC broken in polynomial time' : 'Requires more qubits',
        groverSpeedup: 'Quadratic speedup for symmetric algorithms'
      }
    });
  }
  
  if (supercomputerData) {
    // Supercomputer performance
    return res.json({
      success: true,
      config: { cpu, gpu, memory, os, node, cores },
      cpuName: supercomputerData.name,
      isSupercomputer: true,
      supercomputerInfo: {
        cores: supercomputerData.cores,
        theoreticalPeakTFlops: supercomputerData.theoreticalPeakTFlops,
        powerMW: supercomputerData.powerMW
      },
      performance: {
        aes: Math.round(1e12 * supercomputerData.aesMultiplier),
        sha256: Math.round(1e12 * supercomputerData.shaMultiplier),
        rsa2048: Math.round(1e6 * supercomputerData.rsaMultiplier),
        note: 'Supercomputer estimates based on distributed computing across all cores'
      }
    });
  }
  
  if (!cpuData) {
    return res.status(404).json({ success: false, error: 'CPU not found' });
  }
  
  const performance = calculateEffectivePerformance({ cpu, gpu, memory, os, node, cores });
  
  if (!performance) {
    return res.status(500).json({ success: false, error: 'Failed to calculate performance' });
  }
  
  res.json({
    success: true,
    config: { cpu, gpu, memory, os, node, cores },
    cpuName: cpuData.name,
    isQuantum: false,
    performance,
    notes: {
      aes: 'Operations per second for AES encryption/decryption',
      rsa2048: 'Operations per second for RSA-2048 key operations',
      rsa4096: 'Operations per second for RSA-4096 key operations',
      sha256: 'SHA-256 hash computations per second',
      ecdsa: 'ECDSA signature operations per second',
      scrypt: 'Scrypt password hashes per second (memory-hard)',
      argon2id: 'Argon2id password hashes per second (memory-hard)',
      memoryPenalty: 'Multiplier for memory-hard algorithms (1.0 = no penalty)',
      gpuBoost: 'GPU acceleration multiplier (1.0 = no GPU)'
    }
  });
});

// Get time estimates for brute-force attacks
router.post('/attack-time', (req, res) => {
  try {
    const { cpu, gpu, memory, os, node, algorithm, keySize } = req.body;
    
    if (!cpu || !algorithm) {
      return res.status(400).json({ success: false, error: 'CPU and algorithm are required' });
    }
    
    // Check if it's a quantum computer
    const quantumData = getQuantumComputerById(cpu);
    
    if (quantumData) {
      // Quantum computer attack time calculation
      const attackTime = calculateQuantumAttackTime(algorithm, keySize, quantumData);
      return res.json({
        success: true,
        algorithm,
        keySize,
        isQuantum: true,
        attackTime
      });
    }
    
    // Check if it's a supercomputer
    const supercomputerData = getSupercomputerById(cpu);
    
    if (supercomputerData) {
      const attackTime = calculateSupercomputerAttackTime(algorithm, keySize, supercomputerData);
      return res.json({
        success: true,
        algorithm,
        keySize,
        isSupercomputer: true,
        attackTime
      });
    }
    
    const performance = calculateEffectivePerformance({ cpu, gpu, memory, os, node });
    
    if (!performance) {
      return res.status(500).json({ success: false, error: 'Failed to calculate performance' });
    }
    
    // Calculate brute-force time based on algorithm
    const attackTime = calculateAttackTime(algorithm, keySize, performance);
    
    res.json({
      success: true,
      algorithm,
      keySize,
      isQuantum: false,
      attackTime
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

function calculateQuantumAttackTime(algorithm, keySize, quantumData) {
  let totalOperations;
  let algorithmUsed;
  let timeDescription;
  
  // Shor's algorithm complexity for RSA/ECC: O(n³) where n is key size in bits
  // Grover's algorithm for symmetric: O(2^(n/2)) instead of O(2^n)
  
  switch (algorithm) {
    case 'rsa-2048':
      if (quantumData.practicalForRSA) {
        // Shor's algorithm: polynomial time
        const n = 2048;
        const logicalQubits = Math.ceil(n * 2.5); // Approximate
        const gateCount = Math.pow(n, 3);
        const timeSeconds = gateCount / (quantumData.quantumVolume * 1000);
        totalOperations = gateCount;
        algorithmUsed = "Shor's Algorithm";
        timeDescription = {
          seconds: timeSeconds,
          humanReadable: formatTime(timeSeconds),
          method: 'Shor\'s algorithm - polynomial time factorization',
          logicalQubitsNeeded: logicalQubits
        };
      } else {
        totalOperations = Math.pow(2, 112);
        algorithmUsed = "Shor's Algorithm (insufficient qubits)";
        timeDescription = {
          seconds: Infinity,
          humanReadable: `Requires ~${Math.ceil(2048 * 2.5)} logical qubits (current: ${quantumData.qubits})`,
          method: 'Insufficient quantum capacity',
          logicalQubitsNeeded: Math.ceil(2048 * 2.5)
        };
      }
      break;
      
    case 'rsa-4096':
      if (quantumData.practicalForRSA) {
        const n = 4096;
        const gateCount = Math.pow(n, 3);
        const timeSeconds = gateCount / (quantumData.quantumVolume * 1000);
        totalOperations = gateCount;
        algorithmUsed = "Shor's Algorithm";
        timeDescription = {
          seconds: timeSeconds,
          humanReadable: formatTime(timeSeconds),
          method: 'Shor\'s algorithm - polynomial time factorization',
          logicalQubitsNeeded: Math.ceil(4096 * 2.5)
        };
      } else {
        totalOperations = Math.pow(2, 150);
        algorithmUsed = "Shor's Algorithm (insufficient qubits)";
        timeDescription = {
          seconds: Infinity,
          humanReadable: `Requires ~${Math.ceil(4096 * 2.5)} logical qubits (current: ${quantumData.qubits})`,
          method: 'Insufficient quantum capacity',
          logicalQubitsNeeded: Math.ceil(4096 * 2.5)
        };
      }
      break;
      
    case 'ecc-256':
    case 'ecc-384':
      if (quantumData.practicalForRSA) {
        const n = algorithm === 'ecc-256' ? 256 : 384;
        const gateCount = Math.pow(n, 3);
        const timeSeconds = gateCount / (quantumData.quantumVolume * 1000);
        totalOperations = gateCount;
        algorithmUsed = "Shor's Algorithm (ECDLP)";
        timeDescription = {
          seconds: timeSeconds,
          humanReadable: formatTime(timeSeconds),
          method: 'Shor\'s algorithm - breaks discrete log problem',
          logicalQubitsNeeded: Math.ceil(n * 3)
        };
      } else {
        totalOperations = Math.pow(2, 128);
        algorithmUsed = "Shor's Algorithm (insufficient qubits)";
        timeDescription = {
          seconds: Infinity,
          humanReadable: `Requires ~${Math.ceil(384 * 3)} logical qubits (current: ${quantumData.qubits})`,
          method: 'Insufficient quantum capacity'
        };
      }
      break;
      
    case 'aes-128':
    case 'aes-256':
      // Grover's algorithm provides quadratic speedup
      const symmetricKeySize = algorithm === 'aes-128' ? 128 : 256;
      const groverOps = Math.pow(2, symmetricKeySize / 2); // Quadratic speedup
      const classicalOps = Math.pow(2, symmetricKeySize);
      totalOperations = groverOps;
      algorithmUsed = "Grover's Algorithm";
      timeDescription = {
        seconds: groverOps / (quantumData.quantumVolume * 1e6),
        humanReadable: `${formatLargeNumber(groverOps)} operations (${symmetricKeySize / 2}-bit security equivalent)`,
        method: 'Grover\'s algorithm - quadratic speedup for symmetric crypto',
        classicalSecurity: `${symmetricKeySize}-bit`,
        quantumSecurity: `${symmetricKeySize / 2}-bit`
      };
      break;
      
    case 'sha256':
      // Grover's algorithm for preimage attack
      const shaOps = Math.pow(2, 128); // Quadratic speedup
      totalOperations = shaOps;
      algorithmUsed = "Grover's Algorithm";
      timeDescription = {
        seconds: shaOps / (quantumData.quantumVolume * 1e6),
        humanReadable: `${formatLargeNumber(shaOps)} operations (128-bit security equivalent)`,
        method: 'Grover\'s algorithm - preimage attack with quadratic speedup',
        classicalSecurity: '256-bit',
        quantumSecurity: '128-bit'
      };
      break;
      
    default:
      totalOperations = Math.pow(2, 256);
      algorithmUsed = "Grover's Algorithm";
      timeDescription = {
        seconds: Infinity,
        humanReadable: 'Unknown algorithm for quantum',
        method: 'Grover\'s algorithm (assumed)'
      };
  }
  
  return {
    totalOperations: formatLargeNumber(totalOperations),
    algorithmUsed,
    timeDescription,
    quantumInfo: {
      qubits: quantumData.qubits,
      quantumVolume: quantumData.quantumVolume,
      gateError: quantumData.gateError
    },
    notes: 'Quantum attack times depend on error correction overhead and gate fidelity'
  };
}

function calculateSupercomputerAttackTime(algorithm, keySize, supercomputerData) {
  let totalOperations;
  let opsPerSecond;
  
  switch (algorithm) {
    case 'aes-128':
      totalOperations = Math.pow(2, 128);
      opsPerSecond = 1e12 * supercomputerData.aesMultiplier;
      break;
    case 'aes-256':
      totalOperations = Math.pow(2, 256);
      opsPerSecond = 1e12 * supercomputerData.aesMultiplier;
      break;
    case 'rsa-2048':
      totalOperations = Math.pow(2, 112);
      opsPerSecond = 1e6 * supercomputerData.rsaMultiplier;
      break;
    case 'rsa-4096':
      totalOperations = Math.pow(2, 150);
      opsPerSecond = 1e6 * supercomputerData.rsaMultiplier * 0.1;
      break;
    case 'ecc-256':
      totalOperations = Math.pow(2, 128);
      opsPerSecond = 1e6 * supercomputerData.rsaMultiplier;
      break;
    case 'ecc-384':
      totalOperations = Math.pow(2, 192);
      opsPerSecond = 1e6 * supercomputerData.rsaMultiplier * 0.5;
      break;
    case 'sha256':
      totalOperations = Math.pow(2, 256);
      opsPerSecond = 1e12 * supercomputerData.shaMultiplier;
      break;
    default:
      totalOperations = Math.pow(2, 256);
      opsPerSecond = 1e12 * supercomputerData.aesMultiplier;
  }
  
  const secondsToComplete = totalOperations / opsPerSecond;
  
  return {
    totalOperations: formatLargeNumber(totalOperations),
    opsPerSecond: formatLargeNumber(opsPerSecond),
    unit: 'operations',
    seconds: secondsToComplete,
    humanReadable: formatTime(secondsToComplete),
    percentageOfUniverseAge: (secondsToComplete / 4.35e17) * 100,
    supercomputerName: supercomputerData.name,
    cores: supercomputerData.cores
  };
}

function calculateAttackTime(algorithm, keySize, performance) {
  let totalOperations;
  let opsPerSecond;
  let unit;
  
  switch (algorithm) {
    case 'aes-128':
      totalOperations = Math.pow(2, 128);
      opsPerSecond = performance.aes;
      unit = 'AES operations';
      break;
    case 'aes-256':
      totalOperations = Math.pow(2, 256);
      opsPerSecond = performance.aes;
      unit = 'AES operations';
      break;
    case 'rsa-2048':
      totalOperations = Math.pow(2, 112); // Approximate security level
      opsPerSecond = performance.rsa2048;
      unit = 'RSA operations';
      break;
    case 'rsa-4096':
      totalOperations = Math.pow(2, 150);
      opsPerSecond = performance.rsa4096;
      unit = 'RSA operations';
      break;
    case 'ecc-256':
      totalOperations = Math.pow(2, 128); // Pohlig-Hellman + Pollard's rho
      opsPerSecond = performance.ecdsa;
      unit = 'ECC operations';
      break;
    case 'ecc-384':
      totalOperations = Math.pow(2, 192);
      opsPerSecond = performance.ecdsa;
      unit = 'ECC operations';
      break;
    case 'sha256':
      totalOperations = Math.pow(2, 256);
      opsPerSecond = performance.sha256;
      unit = 'hash operations';
      break;
    case 'scrypt':
      totalOperations = Math.pow(2, 256);
      opsPerSecond = performance.scrypt;
      unit = 'scrypt operations';
      break;
    case 'argon2id':
      totalOperations = Math.pow(2, 256);
      opsPerSecond = performance.argon2id;
      unit = 'argon2id operations';
      break;
    default:
      return { error: 'Unknown algorithm' };
  }
  
  const secondsToComplete = totalOperations / opsPerSecond;
  
  return {
    totalOperations: formatLargeNumber(totalOperations),
    opsPerSecond: formatLargeNumber(opsPerSecond),
    unit,
    seconds: secondsToComplete,
    humanReadable: formatTime(secondsToComplete),
    percentageOfUniverseAge: (secondsToComplete / 4.35e17) * 100
  };
}

function formatLargeNumber(num) {
  if (!isFinite(num) || num === 0) return '0';
  const exp = Math.floor(Math.log10(Math.abs(num)));
  if (exp >= 30) return `10^${exp}`;
  if (exp >= 27) return `${(num / 1e27).toFixed(2)} × 10²⁷`;
  if (exp >= 24) return `${(num / 1e24).toFixed(2)} × 10²⁴`;
  if (exp >= 21) return `${(num / 1e21).toFixed(2)} × 10²¹`;
  if (exp >= 18) return `${(num / 1e18).toFixed(2)} × 10¹⁸`;
  if (exp >= 15) return `${(num / 1e15).toFixed(2)} × 10¹⁵`;
  if (exp >= 12) return `${(num / 1e12).toFixed(2)} × 10¹²`;
  if (exp >= 9) return `${(num / 1e9).toFixed(2)} × 10⁹`;
  if (exp >= 6) return `${(num / 1e6).toFixed(2)} × 10⁶`;
  if (exp >= 3) return `${(num / 1e3).toFixed(2)} × 10³`;
  return num.toFixed(0);
}

function formatTime(seconds) {
  if (seconds < 1) return `${(seconds * 1000).toFixed(2)} milliseconds`;
  if (seconds < 60) return `${seconds.toFixed(2)} seconds`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(2)} minutes`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(2)} hours`;
  if (seconds < 31536000) return `${(seconds / 86400).toFixed(2)} days`;
  if (seconds < 31536000 * 1000) return `${(seconds / 31536000).toFixed(2)} years`;
  if (seconds < 31536000 * 1e6) return `${(seconds / 31536000 / 1000).toFixed(2)} thousand years`;
  if (seconds < 31536000 * 1e9) return `${(seconds / 31536000 / 1e6).toFixed(2)} million years`;
  if (seconds < 31536000 * 1e12) return `${(seconds / 31536000 / 1e9).toFixed(2)} billion years`;
  if (seconds < 31536000 * 1e15) return `${(seconds / 31536000 / 1e12).toFixed(2)} trillion years`;
  if (seconds < 4.35e17) return `${(seconds / 31536000 / 1e15).toFixed(2)} quadrillion years`;
  if (seconds < 4.35e17 * 1000) return `${(seconds / 4.35e17).toFixed(2)}x universe age`;
  return `${formatLargeNumber(seconds / 31536000)} years`;
}

module.exports = router;
