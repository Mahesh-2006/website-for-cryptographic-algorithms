const PASSWORD_HASHING_DEFINITIONS = {
  pbkdf2_sha256: {
    id: 'pbkdf2-sha256',
    name: 'PBKDF2-SHA256',
    memoryHard: false,
    recommendedIterations: 600000,
    outputSize: 256,
    standard: 'RFC 2898, SP 800-132',
    notes: 'Not memory-hard. Use for compatibility only.'
  },
  pbkdf2_sha512: {
    id: 'pbkdf2-sha512',
    name: 'PBKDF2-SHA512',
    memoryHard: false,
    recommendedIterations: 210000,
    outputSize: 512,
    standard: 'RFC 2898, SP 800-132',
    notes: 'Higher security PBKDF2. Not memory-hard.'
  },
  bcrypt: {
    id: 'bcrypt',
    name: 'bcrypt',
    memoryHard: true,
    costFactor: '4-31 (default 10)',
    outputSize: 184,
    standard: 'None (de facto)',
    notes: 'First memory-hard. Password hashing standard.'
  },
  scrypt: {
    id: 'scrypt',
    name: 'scrypt',
    memoryHard: true,
    parameters: 'N, r, p (CPU/memory cost, block size, parallelism)',
    outputSize: 256,
    standard: 'RFC 7914',
    notes: 'Maximum memory-hard. GPU resistant.'
  },
  argon2id: {
    id: 'argon2id',
    name: 'Argon2id',
    memoryHard: true,
    parameters: 'time, memory, parallelism (t, m, p)',
    outputSize: 256,
    standard: 'RFC 9106',
    notes: 'Winner of Password Hashing Competition. Recommended.'
  },
  yescrypt: {
    id: 'yescrypt',
    name: 'yescrypt',
    memoryHard: true,
    outputSize: 256,
    standard: 'None (open standard)',
    notes: 'Memory-hard. Used in OpenBSD.'
  }
};

module.exports = {
  PASSWORD_HASHING_DEFINITIONS
};
