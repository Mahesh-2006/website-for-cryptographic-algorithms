import { useState } from 'react';
import { getBenchmarkData } from '../data/staticHardware';

export default function AlgorithmDetail({ algorithm, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const benchmark = getBenchmarkData(algorithm.id);
  const securityLabel = algorithm.securityLevel?.label || 'Unknown';
  const useCases = Array.isArray(algorithm.educational?.useCases) ? algorithm.educational.useCases : [];
  const pros = Array.isArray(algorithm.educational?.pros) ? algorithm.educational.pros : [];
  const cons = Array.isArray(algorithm.educational?.cons) ? algorithm.educational.cons : [];

  return (
    <div className="algorithm-detail">
      <div className="detail-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <div className="detail-title-section">
        <h1>{algorithm.name}</h1>
        <div className="badges">
          <span className={`security-badge ${securityLabel.toLowerCase()}`}>
            {securityLabel}
          </span>
          <span className="category-badge">{algorithm.category}</span>
        </div>
      </div>

      <div className="detail-tabs">
        {['overview', 'complexity', 'security', 'benchmark', 'educational'].map(tab => (
          <button 
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="detail-content">
        {activeTab === 'overview' && (
          <div className="tab-panel">
            <section>
              <h2>Description</h2>
              <p>{algorithm.educational?.description}</p>
            </section>

            <section>
              <h2>Use Cases</h2>
              <ul>
                {useCases.map((useCase, i) => (
                  <li key={i}>{useCase}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2>Pros & Cons</h2>
              <div className="pros-cons">
                <div>
                  <h3>✓ Strengths</h3>
                  <ul>
                    {pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>✗ Weaknesses</h3>
                  <ul>
                    {cons.map((con, i) => (
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
            <section>
              <h2>Algorithm Complexity </h2>
              {algorithm.complexity && (
                <table className="complexity-table">
                  <thead>
                    <tr>
                      <th>Operation</th>
                      <th>Time</th>
                      <th>Space</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(algorithm.complexity).map(([op, metrics]) => (
                      <tr key={op}>
                        <td>{op}</td>
                        <td><code>{metrics.time || 'N/A'}</code></td>
                        <td><code>{metrics.space || 'N/A'}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="tab-panel">
            <section>
              <h2>Security Level</h2>
              <div className="security-info">
                <p><strong>Status:</strong> {securityLabel}</p>
                <p className="security-description">
                  {securityLabel === 'QUANTUM_RESISTANT' && 'Resistant to quantum computer attacks.'}
                  {securityLabel === 'STRONG' && 'Strong security for current applications.'}
                  {securityLabel === 'STANDARD' && 'Meets current security standards.'}
                  {securityLabel === 'LEGACY' && 'Legacy algorithm, may have alternatives.'}
                  {securityLabel === 'WEAK' && 'Has known weaknesses, not recommended.'}
                  {securityLabel === 'DEPRECATED' && 'Deprecated, do not use.'}
                </p>
              </div>
            </section>

            <section>
              <h2>Security Parameters</h2>
              {algorithm.securityParams && (
                <div className="params-list">
                  {Object.entries(algorithm.securityParams).map(([key, value]) => (
                    <div key={key} className="param">
                      <span className="param-key">{key}:</span>
                      <span className="param-value">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'benchmark' && (
          <div className="tab-panel">
            <section>
              <h2>Performance Metrics</h2>
              <div className="benchmark-stats">
                <div className="stat">
                  <span className="stat-label">Throughput</span>
                  <span className="stat-value">{benchmark.throughput} MB/s</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Operations/sec</span>
                  <span className="stat-value">{benchmark.opsPerSecond.toLocaleString()}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Latency</span>
                  <span className="stat-value">{benchmark.latency.toFixed(4)}ms</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'educational' && (
          <div className="tab-panel">
            <section>
              <h2>Historical Context</h2>
              <div className="history">
                <div className="history-item">
                  <span>Invented:</span>
                  <span>{algorithm.educational?.invented || 'Unknown'}</span>
                </div>
                <div className="history-item">
                  <span>Standardized:</span>
                  <span>{algorithm.educational?.standardized || 'Unknown'}</span>
                </div>
              </div>
            </section>

            <section>
              <h2>Implementation</h2>
              <div className="implementation">
                <div className="impl-item">
                  <span>Node.js:</span>
                  <code>{algorithm.implementation?.nodeCrypto || 'N/A'}</code>
                </div>
                <div className="impl-item">
                  <span>Web Crypto:</span>
                  <code>{algorithm.implementation?.webCrypto || 'N/A'}</code>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
