import React, { useState, useEffect } from 'react';

const AttackTimeCalculator = ({ hardwareConfig, algorithms }) => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([
    { algorithm: 'aes-128', name: 'AES-128', category: 'symmetric' },
    { algorithm: 'aes-256', name: 'AES-256', category: 'symmetric' },
    { algorithm: 'rsa-2048', name: 'RSA-2048', category: 'asymmetric' },
    { algorithm: 'ecc-256', name: 'ECC-256 (secp256k1)', category: 'asymmetric' }
  ]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customAlgorithm, setCustomAlgorithm] = useState('');

  const algorithmOptions = [
    { algorithm: 'aes-128', name: 'AES-128', category: 'Symmetric', type: 'aes' },
    { algorithm: 'aes-256', name: 'AES-256', category: 'Symmetric', type: 'aes' },
    { algorithm: 'rsa-2048', name: 'RSA-2048', category: 'Asymmetric', type: 'rsa' },
    { algorithm: 'rsa-4096', name: 'RSA-4096', category: 'Asymmetric', type: 'rsa' },
    { algorithm: 'ecc-256', name: 'ECC-256 (secp256k1)', category: 'Asymmetric', type: 'ecc' },
    { algorithm: 'ecc-384', name: 'ECC-384 (secp384r1)', category: 'Asymmetric', type: 'ecc' },
    { algorithm: 'sha256', name: 'SHA-256 (Preimage)', category: 'Hash', type: 'sha' },
    { algorithm: 'scrypt', name: 'scrypt', category: 'Password Hashing', type: 'password' },
    { algorithm: 'argon2id', name: 'Argon2id', category: 'Password Hashing', type: 'password' }
  ];

  const calculateAttackTimes = async () => {
    if (!hardwareConfig) return;
    
    setLoading(true);
    const newResults = [];

    for (const algo of selectedAlgorithms) {
      try {
        const response = await fetch('/api/hardware/attack-time', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...hardwareConfig.config,
            algorithm: algo.algorithm
          })
        });
        
        const data = await response.json();
        if (data.success) {
          newResults.push({
            ...algo,
            ...data.attackTime
          });
        }
      } catch (error) {
        console.error(`Failed to calculate attack time for ${algo.algorithm}:`, error);
      }
    }

    setResults(newResults);
    setLoading(false);
  };

  useEffect(() => {
    if (hardwareConfig) {
      calculateAttackTimes();
    }
  }, [hardwareConfig, selectedAlgorithms]);

  const addAlgorithm = (algo) => {
    if (!selectedAlgorithms.find(a => a.algorithm === algo.algorithm)) {
      setSelectedAlgorithms([...selectedAlgorithms, algo]);
    }
  };

  const removeAlgorithm = (algoId) => {
    setSelectedAlgorithms(selectedAlgorithms.filter(a => a.algorithm !== algoId));
  };

  const formatOpsPerSecond = (ops) => {
    if (ops >= 1e15) return `${(ops / 1e15).toFixed(2)} P`;
    if (ops >= 1e12) return `${(ops / 1e12).toFixed(2)} T`;
    if (ops >= 1e9) return `${(ops / 1e9).toFixed(2)} G`;
    if (ops >= 1e6) return `${(ops / 1e6).toFixed(2)} M`;
    if (ops >= 1e3) return `${(ops / 1e3).toFixed(2)} K`;
    return ops.toFixed(0);
  };

  const getSecurityColor = (seconds) => {
    if (seconds < 1) return '#ff4444'; // Red - instant
    if (seconds < 3600) return '#ff8800'; // Orange - hours
    if (seconds < 31536000) return '#ffcc00'; // Yellow - years
    if (seconds < 31536000 * 1000000) return '#88cc00'; // Light green - million years
    if (seconds < 4.35e17) return '#00cc44'; // Green - up to universe age
    return '#00ff88'; // Bright green - beyond universe age
  };

  const getSecurityLabel = (seconds) => {
    if (seconds < 1) return 'VULNERABLE';
    if (seconds < 3600) return 'WEAK';
    if (seconds < 31536000) return 'MODERATE';
    if (seconds < 31536000 * 1000000) return 'STRONG';
    if (seconds < 4.35e17) return 'VERY STRONG';
    return 'QUANTUM-RESISTANT';
  };

  return (
    <div className="attack-time-calculator">
      <h2>⚡ Attack Time Calculator</h2>
      <p className="calculator-description">
        Calculate how long it would take to break encryption on your selected hardware.
        Times are calculated based on brute-force attacks.
      </p>

      {!hardwareConfig ? (
        <div className="no-hardware-warning">
          <h3>⚠️ No Hardware Selected</h3>
          <p>Please select your hardware configuration in the sidebar to get accurate time estimates.</p>
        </div>
      ) : (
        <>
          <div className="calculator-info">
            <div className="info-card">
              <span className="info-icon">💻</span>
              <div>
                <strong>Hardware:</strong> {hardwareConfig.cpuName || hardwareConfig.config?.cpu}
              </div>
            </div>
            {hardwareConfig.config?.gpu !== 'none' && (
              <div className="info-card">
                <span className="info-icon">🎮</span>
                <div>
                  <strong>GPU Acceleration:</strong> Active
                </div>
              </div>
            )}
            <div className="info-card">
              <span className="info-icon">💾</span>
              <div>
                <strong>Memory:</strong> {hardwareConfig.config?.memory || '16gb'}
              </div>
            </div>
          </div>

          {/* Add Algorithm Section */}
          <div className="add-algorithm-section">
            <h3>Add Algorithm to Compare</h3>
            <div className="algorithm-chips">
              {algorithmOptions.map(algo => (
                <button
                  key={algo.algorithm}
                  className={`algo-chip ${selectedAlgorithms.find(a => a.algorithm === algo.algorithm) ? 'selected' : ''}`}
                  onClick={() => addAlgorithm(algo)}
                  disabled={selectedAlgorithms.find(a => a.algorithm === algo.algorithm)}
                >
                  {algo.name}
                  <span className="chip-category">{algo.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Table */}
          <div className="results-section">
            <h3>Attack Time Estimates</h3>
            {loading ? (
              <div className="loading-results">Calculating attack times...</div>
            ) : (
              <div className="results-table">
                <div className="results-header">
                  <span className="col-algorithm">Algorithm</span>
                  <span className="col-operations">Operations Required</span>
                  <span className="col-speed">Your Speed</span>
                  <span className="col-time">Time to Break</span>
                  <span className="col-security">Security</span>
                  <span className="col-actions"></span>
                </div>
                {results.map((result, index) => (
                  <div key={index} className="results-row">
                    <span className="col-algorithm">
                      <strong>{result.name}</strong>
                      <span className="algo-type">{result.category || result.algorithm}</span>
                    </span>
                    <span className="col-operations">{result.totalOperations}</span>
                    <span className="col-speed">{formatOpsPerSecond(result.opsPerSecond)} {result.unit}/s</span>
                    <span className="col-time">
                      <span 
                        className="time-value"
                        style={{ color: getSecurityColor(result.seconds) }}
                      >
                        {result.humanReadable}
                      </span>
                    </span>
                    <span className="col-security">
                      <span 
                        className="security-badge"
                        style={{ backgroundColor: getSecurityColor(result.seconds) + '30', color: getSecurityColor(result.seconds) }}
                      >
                        {getSecurityLabel(result.seconds)}
                      </span>
                    </span>
                    <span className="col-actions">
                      <button 
                        className="remove-btn"
                        onClick={() => removeAlgorithm(result.algorithm)}
                        title="Remove"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Universe Age Comparison */}
          {results.length > 0 && (
            <div className="universe-comparison">
              <h3>📅 Comparison to Universe Age</h3>
              <p className="universe-note">
                Age of Universe: ~13.8 billion years (4.35 × 10¹⁷ seconds)
              </p>
              <div className="comparison-bars">
                {results.map((result, index) => {
                  const universeAge = 4.35e17;
                  const percentage = Math.min((result.seconds / universeAge) * 100, 100);
                  const multiUniverse = result.seconds / universeAge;
                  return (
                    <div key={index} className="comparison-bar">
                      <span className="bar-label">{result.name}</span>
                      <div className="bar-container">
                        <div 
                          className="bar-fill"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: getSecurityColor(result.seconds)
                          }}
                        ></div>
                      </div>
                      <span className="bar-value">
                        {multiUniverse > 1 
                          ? `${multiUniverse.toFixed(0)}x universe ages`
                          : result.seconds < 1 
                            ? 'Instant'
                            : `${(result.seconds / universeAge * 100).toFixed(6)}%`
                        }
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="calculator-disclaimer">
            <h4>⚠️ Disclaimer</h4>
            <p>
              These estimates are based on theoretical brute-force attacks on YOUR selected hardware.
              Real-world security may be affected by:
            </p>
            <ul>
              <li>Implementation vulnerabilities</li>
              <li>Side-channel attacks</li>
              <li>Future algorithmic improvements</li>
              <li>Quantum computing advances</li>
              <li>Distributed attacks across multiple machines</li>
            </ul>
            <p className="accuracy-note">
              <strong>Accuracy:</strong> ±50% for symmetric algorithms, ±100% for asymmetric algorithms.
              Estimates assume optimal attack conditions.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AttackTimeCalculator;
