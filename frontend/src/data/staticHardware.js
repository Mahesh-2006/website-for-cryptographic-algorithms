// Static hardware and utility data for GitHub Pages deployment

export const HARDWARE_DATA = [
  {
    id: 'gpu-nvidia-a100',
    name: 'NVIDIA A100 GPU',
    type: 'gpu',
    specs: {
      processorFPS: 312000000000,  // 312 GFLOPS
      hashRate: 1000000000,         // 1 GH/s
      memory: 80
    },
    relativeSpeed: 1000,
    category: 'Professional GPU'
  },
  {
    id: 'gpu-rtx-4090',
    name: 'NVIDIA RTX 4090 GPU',
    type: 'gpu',
    specs: {
      processorFPS: 82000000000,   // 82 GFLOPS
      hashRate: 500000000,          // 500 MH/s
      memory: 24
    },
    relativeSpeed: 500,
    category: 'Consumer GPU'
  },
  {
    id: 'cpu-ryzen-9',
    name: 'AMD Ryzen 9 7950X',
    type: 'cpu',
    specs: {
      processorFPS: 1000000000,    // 1 GFLOPS
      hashRate: 50000000,           // 50 MH/s
      cores: 16,
      memory: 0.032
    },
    relativeSpeed: 50,
    category: 'High-End CPU'
  },
  {
    id: 'laptop-cpu',
    name: 'Intel i7-13700K',
    type: 'cpu',
    specs: {
      processorFPS: 600000000,     // 600 MFLOPS
      hashRate: 30000000,           // 30 MH/s
      cores: 16,
      memory: 0.030
    },
    relativeSpeed: 30,
    category: 'Laptop CPU'
  },
  {
    id: 'quantum-1000',
    name: 'Quantum Computer (1000 qubits)',
    type: 'quantum',
    specs: {
      qubits: 1000,
      errorRate: 0.001,
      memory: 8
    },
    relativeSpeed: 1000000,
    category: 'Quantum'
  },
  {
    id: 'classic-cluster',
    name: 'Botnet/Cloud Cluster (1000 CPUs)',
    type: 'cluster',
    specs: {
      cpuCount: 1000,
      hashRate: 50000000000,        // 50 GH/s
      memory: 32
    },
    relativeSpeed: 50000,
    category: 'Distributed'
  }
];

// Mock benchmark data
export const MOCK_BENCHMARKS = {
  'aes-128': { throughput: 3000, opsPerSecond: 1000000, latency: 0.001 },
  'aes-256': { throughput: 2500, opsPerSecond: 800000, latency: 0.0015 },
  'sha256': { throughput: 5000, opsPerSecond: 1500000, latency: 0.0008 },
  'sha512': { throughput: 4000, opsPerSecond: 1200000, latency: 0.001 },
  'rsa-2048': { throughput: 100, opsPerSecond: 50, latency: 0.1 },
  'ecc-p256': { throughput: 500, opsPerSecond: 200, latency: 0.05 },
  'chacha20': { throughput: 4500, opsPerSecond: 1400000, latency: 0.0009 },
  'bcrypt': { throughput: 10, opsPerSecond: 5, latency: 1.0 }
};

// Calculate attack time estimates
export function calculateAttackTime(algorithm, hardware, keySize = null) {
  if (!algorithm || !hardware) {
    return { years: Infinity, operations: '∞', complexity: 'Unknown' };
  }

  const securityLevel = algorithm.securityLevel?.label || 'Unknown';
  let bits = keySize || algorithm.securityParams?.keySize || 128;

  // Brute force operations needed: 2^bits in average case (half key space)
  const operations = Math.pow(2, bits - 1);
  
  // Benchmark throughput (hashes/second) for the hardware
  const hashRate = hardware.specs?.hashRate || 1000000;
  const secondsNeeded = operations / hashRate;
  
  // Convert to years
  const SECONDS_PER_YEAR = 31536000;
  const years = secondsNeeded / SECONDS_PER_YEAR;

  return {
    years: years === Infinity ? Infinity : Math.max(years, 0.00001),
    operations: operations.toExponential(2),
    complexity: getComplexityLabel(years),
    universeAgeMult: years / 13.8e9
  };
}

function getComplexityLabel(years) {
  if (years === Infinity) return 'Computationally Infeasible';
  if (years > 13.8e9) return 'Longer than Universe Lifetime (13.8B years)';
  if (years > 1e9) return 'Billions of Years';
  if (years > 1e6) return 'Millions of Years';
  if (years > 1000) return 'Thousands of Years';
  if (years > 1) return `${years.toFixed(1)} Years`;
  if (years > 1/365) return `${(years * 365).toFixed(1)} Days`;
  if (years > 1/(365*24)) return `${(years * 365 * 24).toFixed(1)} Hours`;
  return 'Minutes or Less (BROKEN)';
}

// Get mock benchmark data for an algorithm
export function getBenchmarkData(algorithmId) {
  const benchmark = MOCK_BENCHMARKS[algorithmId] || {
    throughput: 1000 + Math.random() * 9000,
    opsPerSecond: 100000 + Math.random() * 900000,
    latency: 0.001 + Math.random() * 0.01
  };
  return benchmark;
}
