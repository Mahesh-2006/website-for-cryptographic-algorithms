import AlgorithmCard from './AlgorithmCard';

const CATEGORY_DESCRIPTIONS = {
  symmetric: 'Symmetric key algorithms use the same key for encryption and decryption.',
  hash: 'Cryptographic hash functions map arbitrary data to fixed-size outputs.',
  mac: 'Message Authentication Codes provide integrity and authenticity verification.',
  authenticatedEncryption: 'AEAD schemes provide both confidentiality and authentication.',
  asymmetric: 'Public key cryptography uses key pairs for encryption and signatures.',
  digitalSignatures: 'Digital signatures provide authentication and non-repudiation.',
  keyExchange: 'Key exchange protocols establish shared secrets between parties.',
  passwordHashing: 'Password hashing functions secure password storage against attacks.',
  postQuantum: 'Post-quantum algorithms resist attacks from quantum computers.',
  zeroKnowledge: 'Zero-knowledge proofs verify knowledge without revealing it.',
  homomorphic: 'Homomorphic encryption allows computation on encrypted data.'
};

export default function CategoryView({ 
  category, 
  algorithms, 
  onAlgorithmSelect,
  onBackToCategories
}) {
  const description = CATEGORY_DESCRIPTIONS[category?.id];
  const safeAlgorithms = Array.isArray(algorithms) ? algorithms : [];

  return (
    <div className="category-view">
      <div className="view-header">
        <button className="back-button" onClick={onBackToCategories}>
          ← Back to Categories
        </button>
        <div className="category-header-content">
          <h2>{category?.name || 'All Algorithms'}</h2>
          {description && <p className="category-description">{description}</p>}
          <span className="algorithm-count">{safeAlgorithms.length} algorithms</span>
        </div>
      </div>
      
      <div className="algorithm-grid">
        {safeAlgorithms.map(algo => (
          <AlgorithmCard
            key={algo.id}
            algorithm={algo}
            onClick={() => onAlgorithmSelect(algo)}
          />
        ))}
      </div>
    </div>
  );
}
