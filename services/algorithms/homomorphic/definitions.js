const HOMOMORPHIC_DEFINITIONS = {
  paillier: {
    id: 'paillier',
    name: 'Paillier Cryptosystem',
    type: 'Additive Homomorphic',
    securityAssumption: 'Composite Residuosity',
    keySize: '2048 bits typical',
    operations: {
      add: true,
      multiplyCiphertexts: false,
      addPlaintext: true,
      multiplyByPlaintext: true
    },
    standard: 'None (Paillier 1999)',
    notes: 'Additive HE. E-voting, privacy-preserving stats.'
  },
  elgamal_homomorphic: {
    id: 'elgamal-homomorphic',
    name: 'ElGamal (Homomorphic)',
    type: 'Multiplicative Homomorphic',
    securityAssumption: 'DDH',
    keySize: '2048 bits typical',
    operations: {
      add: false,
      multiplyCiphertexts: true,
      addPlaintext: false,
      multiplyByPlaintext: true
    },
    standard: 'None (ElGamal 1985)',
    notes: 'Multiplicative HE. E-voting (multiplication).'
  },
  ckks: {
    id: 'ckks',
    name: 'CKKS (Cheon-Kim-Kim-Song)',
    type: 'Approximate Fully Homomorphic',
    securityAssumption: 'RLWE',
    parameters: 'N=16384, slots=4096',
    operations: {
      add: true,
      multiply: true,
      rotate: true,
      bootstrap: true
    },
    standard: 'None (CKKS 2017)',
    notes: 'Approximate arithmetic. ML on encrypted data.'
  },
  bfv: {
    id: 'bfv',
    name: 'BFV (Brakerski/Fan-Vercauteren)',
    type: 'Exact Integer Fully Homomorphic',
    securityAssumption: 'RLWE',
    parameters: 'N=10204, plaintext modulus ~20-60 bits',
    operations: {
      add: true,
      multiply: true,
      rotate: false,
      bootstrap: false
    },
    standard: 'None (BFV 2012)',
    notes: 'Exact integer arithmetic. Lower noise than CKKS.'
  },
  tfhe: {
    id: 'tfhe',
    name: 'TFHE (Torus FHE)',
    type: 'Boolean Circuit Fully Homomorphic',
    securityAssumption: 'LWE',
    parameters: 'LWE key ~600 bits, GLWE N=1024',
    operations: {
      arbitraryCircuits: true,
      gateBootstrap: true,
      programmableBootstrap: true
    },
    standard: 'None (TFHE 2016)',
    notes: 'Most flexible FHE. Arbitrary boolean circuits.'
  }
};

module.exports = {
  HOMOMORPHIC_DEFINITIONS
};
