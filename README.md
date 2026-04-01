# Cryptographic Algorithms Simulator

A comprehensive web application for exploring, comparing, and understanding cryptographic algorithms. This project demonstrates various encryption techniques, their security properties, performance characteristics, and real-world applications.

## 🌐 Live Demo

The application is deployed on GitHub Pages: [https://mahesh-2006.github.io/website-for-cryptographic-algorithms](https://mahesh-2006.github.io/website-for-cryptographic-algorithms)

*Last updated: April 2026*

## Features

### 🔍 Algorithm Explorer
- Browse algorithms by category (Symmetric, Hash, MAC, Asymmetric, etc.)
- Detailed security parameters and complexity analysis
- Educational content explaining how each algorithm works
- Security level indicators and quantum resistance status

### 📊 Performance Benchmarking
- Mock performance benchmarks for algorithm comparison
- Operations per second, throughput, and timing metrics
- Breakdown by operation type (encryption, decryption, signing, etc.)

### ⚡ Attack Time Calculator
- Estimate cracking times using different hardware configurations
- Compare algorithms against various computing platforms
- Universe age comparisons for astronomical time scales

### 📱 Mobile Responsive
- Touch-friendly interfaces optimized for mobile devices
- Responsive design that works on all screen sizes
- Progressive enhancement for better performance

## Architecture

### Frontend (GitHub Pages)
- **React 19** with modern hooks and functional components
- **Vite** for fast development and optimized builds
- **Static Data** - pre-built algorithm database for GitHub Pages compatibility
- **Responsive CSS** with mobile-first design principles

### Backend (Local Development)
- **Node.js/Express** API server
- **Cryptographic Libraries** - Noble curves, crypto-js, etc.
- **Performance Benchmarking** with real cryptographic operations
- **Hardware Simulation** for attack time calculations

## Algorithm Categories

- 🔐 **Symmetric Encryption**: AES-128/256, ChaCha20
- #️⃣ **Hash Functions**: SHA-256, SHA-3, BLAKE2b, MD5
- 🔏 **Message Authentication Codes**: HMAC-SHA256
- 🛡️ **Authenticated Encryption**: AEAD schemes
- 🔑 **Asymmetric Encryption**: RSA-2048, ECC-256
- 📝 **Digital Signatures**: ECDSA, EdDSA
- 🤝 **Key Exchange**: ECDH, X25519
- 🔒 **Password Hashing**: Argon2id, scrypt
- ⚛️ **Post-Quantum Cryptography**: Kyber-512
- 🎭 **Zero-Knowledge Proofs**: ZKP systems
- 🧮 **Homomorphic Encryption**: FHE schemes

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development (Full Stack)
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Start backend server
npm start

# In another terminal, start frontend dev server
cd frontend && npm run dev
```

### GitHub Pages Deployment
The frontend is automatically deployed to GitHub Pages when changes are pushed to the `master` branch.

```bash
# Build and deploy manually
cd frontend
npm run build
# Files in dist/ are deployed to GitHub Pages
```

## Project Structure

```
├── frontend/                 # React frontend (GitHub Pages)
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── data/            # Static algorithm data
│   │   └── ...
│   ├── dist/                # Built static files
│   └── package.json
├── services/                # Backend services
│   ├── algorithms/          # Algorithm definitions
│   ├── routes/              # API endpoints
│   └── utils/               # Utilities
├── .github/workflows/       # GitHub Actions
└── server.js               # Express server
```

## Technologies

### Frontend
- React 19
- Vite
- CSS3 with CSS Variables
- GitHub Pages

### Backend
- Node.js
- Express.js
- Noble Curves (ECC)
- Crypto-js
- Blake3
- SnarkJS

## Security Notice

This application is for educational purposes. The benchmark results are simulated for demonstration. In production cryptographic applications, always use established, peer-reviewed implementations and follow security best practices.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
