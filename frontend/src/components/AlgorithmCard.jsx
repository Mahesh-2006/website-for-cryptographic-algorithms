const SECURITY_COLORS = {
  DEPRECATED: '#dc2626',
  WEAK: '#ea580c',
  LEGACY: '#ca8a04',
  STANDARD: '#16a34a',
  STRONG: '#15803d',
  QUANTUM_RESISTANT: '#2563eb'
};

const SECURITY_ICONS = {
  DEPRECATED: '⛔',
  WEAK: '⚠️',
  LEGACY: '📜',
  STANDARD: '✓',
  STRONG: '🔒',
  QUANTUM_RESISTANT: '🛡️'
};

export function getSecurityColor(level) {
  return level ? SECURITY_COLORS[level] || '#6b7280' : '#6b7280';
}

export function getSecurityIcon(level) {
  return level ? SECURITY_ICONS[level] || '?' : '?';
}

export function getSecurityLabel(level) {
  if (!level) return 'Unknown';
  return level.label || level;
}

export default function AlgorithmCard({ algorithm, onClick }) {
  const securityColor = getSecurityColor(algorithm.securityLevel);
  const securityIcon = getSecurityIcon(algorithm.securityLevel);
  const securityLabel = getSecurityLabel(algorithm.securityLevel);

  const getComplexitySummary = () => {
    const complexity = algorithm.complexity;
    if (!complexity) return null;
    
    if (complexity.encryption) {
      return `Enc: ${complexity.encryption.time}`;
    }
    if (complexity.compression) {
      return `Hash: ${complexity.compression.time}`;
    }
    if (complexity.keyGen) {
      return `KeyGen: ${complexity.keyGen.time}`;
    }
    
    const firstOp = Object.values(complexity)[0];
    return firstOp ? `Op: ${firstOp.time}` : null;
  };

  const getCrackingSummary = () => {
    const cracking = algorithm.crackingComplexity;
    if (!cracking) return null;
    
    if (cracking.classical) {
      return `Classical: ${cracking.classical.operations}`;
    }
    if (cracking.collision) {
      return `Collision: ${cracking.collision.operations}`;
    }
    if (cracking.forge) {
      return `Forge: ${cracking.forge.operations}`;
    }
    
    return null;
  };

  const getKeyParams = () => {
    const params = algorithm.securityParams;
    if (!params) return [];
    
    const items = [];
    
    if (params.keySize) {
      const keySize = typeof params.keySize === 'object' 
        ? `${params.keySize.min}-${params.keySize.max}` 
        : params.keySize;
      items.push(`${keySize} bit key`);
    }
    
    if (params.blockSize) {
      items.push(`${params.blockSize} bit block`);
    }
    
    if (params.rounds) {
      const rounds = typeof params.rounds === 'object'
        ? `${params.rounds}`
        : params.rounds;
      items.push(`${rounds} rounds`);
    }
    
    if (params.outputSize) {
      items.push(`${params.outputSize} bit output`);
    }
    
    if (params.curve) {
      items.push(params.curve);
    }
    
    return items;
  };

  const keyParams = getKeyParams();
  const complexitySummary = getComplexitySummary();
  const crackingSummary = getCrackingSummary();

  return (
    <div className="algorithm-card" onClick={onClick}>
      <div className="card-header">
        <div className="card-title-row">
          <h3 className="card-title">{algorithm.name}</h3>
          <span 
            className="security-badge"
            style={{ backgroundColor: securityColor }}
          >
            {securityIcon} {securityLabel}
          </span>
        </div>
        <span className="category-label">{algorithm.categoryDisplay}</span>
      </div>
      
      <div className="card-body">
        <p className="card-description">{algorithm.educational?.description}</p>
        
        <div className="card-params">
          {keyParams.map((param, i) => (
            <span key={i} className="param-tag">{param}</span>
          ))}
        </div>
        
        {complexitySummary && (
          <div className="complexity-summary">
            <span className="complexity-label">Complexity:</span>
            <code>{complexitySummary}</code>
          </div>
        )}
        
        {crackingSummary && (
          <div className="cracking-summary">
            <span className="cracking-label">Cracking:</span>
            <code>{crackingSummary}</code>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <span className="type-label">{algorithm.type?.replace(/_/g, ' ')}</span>
        {algorithm.educational?.standardized && (
          <span className="standard-label" title={algorithm.educational.standardized}>
            📋 {algorithm.educational.standardized.split(' ')[0]}
          </span>
        )}
      </div>
    </div>
  );
}
