import { useState, useEffect } from 'react';
import { getSecurityColor, getSecurityIcon, getSecurityLabel } from './AlgorithmCard';

export default function AlgorithmDetail({ algorithm, onBack }) {
  const [benchmark, setBenchmark] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const runBenchmark = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ algorithmId: algorithm.id })
      });
      const data = await response.json();
      setBenchmark(data);
    } catch (err) {
      setError('Failed to run benchmark: ' + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    runBenchmark();
  }, [algorithm.id]);

  const securityColor = getSecurityColor(algorithm.securityLevel);
  const securityLabel = getSecurityLabel(algorithm.securityLevel);
  const securityIcon = getSecurityIcon(algorithm.securityLevel);

  return (
    <div className="algorithm-detail">
      <div className="detail-header">
        <button className="back-button" onClick={onBack}>
          ← Back to {algorithm.categoryDisplay}
        </button>
      </div>

      <div className="detail-title-section">
        <div className="title-row">
          <h1>{algorithm.name}</h1>
          <span 
            className="security-badge large"
            style={{ backgroundColor: securityColor }}
          >
            {securityIcon} {securityLabel}
          </span>
        </div>
        <span className="category-badge">{algorithm.categoryDisplay}</span>
        <span className="type-badge">{algorithm.type?.replace(/_/g, ' ')}</span>
      </div>

      <div className="detail-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'complexity' ? 'active' : ''}`}
          onClick={() => setActiveTab('complexity')}
        >
          Complexity
        </button>
        <button 
          className={`tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button 
          className={`tab ${activeTab === 'benchmark' ? 'active' : ''}`}
          onClick={() => setActiveTab('benchmark')}
        >
          Benchmark
        </button>
        <button 
          className={`tab ${activeTab === 'educational' ? 'active' : ''}`}
          onClick={() => setActiveTab('educational')}
        >
          Educational
        </button>
      </div>

      <div className="detail-content">
        {activeTab === 'overview' && (
          <div className="tab-panel">
            <section className="detail-section">
              <h2>Description</h2>
              <p>{algorithm.educational?.description}</p>
            </section>

            <section className="detail-section">
              <h2>Security Parameters</h2>
              <div className="params-grid">
                {Object.entries(algorithm.securityParams || {}).map(([key, value]) => (
                  <div key={key} className="param-item">
                    <span className="param-key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                    <span className="param-value">
                      {typeof value === 'object' ? JSON.stringify(value) : value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="detail-section">
              <h2>Use Cases</h2>
              <ul className="use-cases-list">
                {algorithm.educational?.useCases?.map((useCase, i) => (
                  <li key={i}>{useCase}</li>
                ))}
              </ul>
            </section>

            <section className="detail-section">
              <h2>Pros & Cons</h2>
              <div className="pros-cons-grid">
                <div className="pros">
                  <h3>✓ Pros</h3>
                  <ul>
                    {algorithm.educational?.pros?.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h3>✗ Cons</h3>
                  <ul>
                    {algorithm.educational?.cons?.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'complexity' && (
          <div className="tab-panel">
            <section className="detail-section">
              <h2>Algorithm Complexity</h2>
              <div className="complexity-table">
                <table>
                  <thead>
                    <tr>
                      <th>Operation</th>
                      <th>Time</th>
                      <th>Space</th>
                      <th>Memory</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(algorithm.complexity || {}).map(([op, metrics]) => (
                      <tr key={op}>
                        <td>{op.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</td>
                        <td><code>{metrics.time}</code></td>
                        <td><code>{metrics.space}</code></td>
                        <td><code>{metrics.memory}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="detail-section">
              <h2>Communication Complexity</h2>
              {algorithm.communicationComplexity ? (
                <div className="comm-params">
                  {Object.entries(algorithm.communicationComplexity).map(([party, complexity]) => (
                    <div key={party} className="comm-item">
                      <span className="party">{party}</span>
                      <code>{complexity}</code>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">Not applicable for this algorithm type.</p>
              )}
            </section>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="tab-panel">
            <section className="detail-section">
              <h2>Cracking Complexity</h2>
              <div className="cracking-info">
                {Object.entries(algorithm.crackingComplexity || {}).map(([attackType, info]) => (
                  <div key={attackType} className="cracking-card">
                    <h3>{attackType.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</h3>
                    <div className="cracking-details">
                      <div className="crack-item">
                        <span className="label">Operations:</span>
                        <code>{info.operations}</code>
                      </div>
                      <div className="crack-item">
                        <span className="label">Type:</span>
                        <code>{info.type}</code>
                      </div>
                      <div className="crack-item">
                        <span className="label">Time to crack:</span>
                        <span className={`time-badge ${info.years === 'Infinity' || info.years?.includes('billions') ? 'safe' : 'warning'}`}>
                          {info.years}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="detail-section">
              <h2>Security Assessment</h2>
              <div className="security-assessment" style={{ borderLeftColor: securityColor }}>
                <div className="assessment-header">
                  <span className="level" style={{ color: securityColor }}>
                    {securityIcon} {securityLabel}
                  </span>
                </div>
                <p>
                  {algorithm.securityLevel?.label === 'DEPRECATED' && 
                    'This algorithm is deprecated and should not be used for new systems.'}
                  {algorithm.securityLevel?.label === 'WEAK' && 
                    'This algorithm has known weaknesses and is not recommended.'}
                  {algorithm.securityLevel?.label === 'LEGACY' && 
                    'This algorithm is legacy but may still be in use for compatibility.'}
                  {algorithm.securityLevel?.label === 'STANDARD' && 
                    'This algorithm meets current security standards.'}
                  {algorithm.securityLevel?.label === 'STRONG' && 
                    'This algorithm provides strong security for current applications.'}
                  {algorithm.securityLevel?.label === 'QUANTUM_RESISTANT' && 
                    'This algorithm is designed to resist quantum computer attacks.'}
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'benchmark' && (
          <div className="tab-panel">
            <section className="detail-section">
              <h2>Performance Benchmark</h2>
              {loading ? (
                <div className="loading">Running benchmark...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : benchmark ? (
                <div className="benchmark-results">
                  <div className="benchmark-stats">
                    <div className="stat-card">
                      <span className="stat-label">Operations/sec</span>
                      <span className="stat-value">{benchmark.operationsPerSecond?.toLocaleString()}</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Avg Time</span>
                      <span className="stat-value">{benchmark.averageTimeMs?.toFixed(4)} ms</span>
                    </div>
                    <div className="stat-card">
                      <span className="stat-label">Throughput</span>
                      <span className="stat-value">{benchmark.throughputMBps?.toFixed(2)} MB/s</span>
                    </div>
                  </div>

                  {benchmark.breakdown && (
                    <div className="benchmark-breakdown">
                      <h3>Operation Breakdown</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Operation</th>
                            <th>Ops/sec</th>
                            <th>Avg Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(benchmark.breakdown).map(([op, data]) => (
                            <tr key={op}>
                              <td>{op}</td>
                              <td>{data.operationsPerSecond?.toLocaleString()}</td>
                              <td>{data.averageTimeMs?.toFixed(4)} ms</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="benchmark-meta">
                    <span>Benchmark ID: {benchmark.algorithmId}</span>
                    <span>Iterations: {benchmark.iterations}</span>
                  </div>
                </div>
              ) : (
                <div className="no-data">No benchmark data available</div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'educational' && (
          <div className="tab-panel">
            <section className="detail-section">
              <h2>Historical Context</h2>
              <div className="history-grid">
                <div className="history-item">
                  <span className="history-label">Invented</span>
                  <span className="history-value">{algorithm.educational?.invented}</span>
                </div>
                <div className="history-item">
                  <span className="history-label">Standardized</span>
                  <span className="history-value">{algorithm.educational?.standardized}</span>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <h2>Implementation</h2>
              <div className="impl-grid">
                <div className="impl-item">
                  <span className="impl-label">Node.js Crypto</span>
                  <code>{algorithm.implementation?.nodeCrypto || 'Not available'}</code>
                </div>
                <div className="impl-item">
                  <span className="impl-label">Web Crypto API</span>
                  <code>{algorithm.implementation?.webCrypto || 'Not available'}</code>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <h2>Complexity Notation Reference</h2>
              <div className="complexity-reference">
                <div className="ref-item">
                  <code>O(1)</code>
                  <span>Constant - independent of input size</span>
                </div>
                <div className="ref-item">
                  <code>O(n)</code>
                  <span>Linear - proportional to input size</span>
                </div>
                <div className="ref-item">
                  <code>O(n²)</code>
                  <span>Quadratic - proportional to square of input</span>
                </div>
                <div className="ref-item">
                  <code>O(log n)</code>
                  <span>Logarithmic - logarithmic scale</span>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
