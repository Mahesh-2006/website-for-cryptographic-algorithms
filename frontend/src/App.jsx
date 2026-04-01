import { useState, useEffect } from 'react';
import { ALGORITHM_DATA, CATEGORY_DATA } from './data/staticAlgorithms';
import CategoryView from './components/CategoryView';
import AlgorithmDetail from './components/AlgorithmDetail';
import HardwareSelector from './components/HardwareSelector';
import AttackTimeCalculator from './components/AttackTimeCalculator';
import './index.css';
import './App.css';

const CATEGORY_DISPLAY_NAMES = {
  symmetric: 'Symmetric Encryption',
  hash: 'Hash Functions',
  mac: 'Message Authentication Codes',
  authenticatedEncryption: 'Authenticated Encryption',
  asymmetric: 'Asymmetric Encryption',
  digitalSignatures: 'Digital Signatures',
  keyExchange: 'Key Exchange',
  passwordHashing: 'Password Hashing',
  postQuantum: 'Post-Quantum Cryptography',
  zeroKnowledge: 'Zero-Knowledge Proofs',
  homomorphic: 'Homomorphic Encryption'
};

const CATEGORY_ICONS = {
  symmetric: '🔐',
  hash: '#️⃣',
  mac: '🔏',
  authenticatedEncryption: '🛡️',
  asymmetric: '🔑',
  digitalSignatures: '📝',
  keyExchange: '🤝',
  passwordHashing: '🔒',
  postQuantum: '⚛️',
  zeroKnowledge: '🎭',
  homomorphic: '🧮'
};

const SECURITY_ORDER = ['QUANTUM_RESISTANT', 'STRONG', 'STANDARD', 'LEGACY', 'WEAK', 'DEPRECATED'];

export default function App() {
  const [categories, setCategories] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [view, setView] = useState('home'); // 'home', 'calculator', 'hardware'
  const [hardwareConfig, setHardwareConfig] = useState(null);

  useEffect(() => {
    loadStaticData();
  }, []);

  const loadStaticData = () => {
    try {
      setLoading(true);
      // Format categories for display with counts
      const categoryMap = {};
      CATEGORY_DATA.forEach(cat => {
        categoryMap[cat.id] = { ...cat, count: 0 };
      });
      
      // Count algorithms per category
      ALGORITHM_DATA.forEach(algo => {
        if (categoryMap[algo.category]) {
          categoryMap[algo.category].count++;
        }
      });
      
      setCategories(Object.values(categoryMap));
      setAlgorithms(ALGORITHM_DATA);
    } catch (err) {
      setError('Failed to load algorithm data.');
    }
    setLoading(false);
  };

  const getCategoryStats = (categoryId) => {
    const algos = getAlgorithmsForCategory(categoryId);
    const stats = { total: algos.length };
    SECURITY_ORDER.forEach(level => {
      stats[level] = algos.filter(a => a.securityLevel?.label === level).length;
    });
    return stats;
  };

  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeAlgorithms = Array.isArray(algorithms) ? algorithms : [];

  const getAlgorithmsForCategory = (categoryId) => {
    return safeAlgorithms.filter(a => a.category === categoryId);
  };

  const filteredAlgorithms = selectedCategory 
    ? getAlgorithmsForCategory(selectedCategory.id)
    : safeAlgorithms;

  const getDisplayAlgorithms = () => {
    let result = filteredAlgorithms;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(term) ||
        a.educational?.description?.toLowerCase().includes(term)
      );
    }
    
    if (filterLevel) {
      result = result.filter(a => a.securityLevel?.label === filterLevel);
    }
    
    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'security') {
      result = [...result].sort((a, b) => 
        (b.securityLevel?.severity || 0) - (a.securityLevel?.severity || 0)
      );
    }
    
    return result;
  };

  const handleHardwareChange = (config) => {
    setHardwareConfig(config);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading cryptographic algorithms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h1>Connection Error</h1>
        <p>{error}</p>
        <button onClick={loadStaticData}>Retry</button>
      </div>
    );
  }

  // Attack Time Calculator View
  if (view === 'calculator') {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🔐 Cryptography Simulator</h1>
          <nav className="nav-tabs">
            <button onClick={() => setView('home')} className="nav-tab">Algorithms</button>
            <button onClick={() => setView('calculator')} className="nav-tab active">Attack Time Calculator</button>
          </nav>
        </header>
        <main className="app-main calculator-view">
          <div className="calculator-layout">
            <div className="calculator-sidebar">
              <HardwareSelector onHardwareChange={handleHardwareChange} />
            </div>
            <div className="calculator-content">
              <AttackTimeCalculator hardwareConfig={hardwareConfig} algorithms={algorithms} />
            </div>
          </div>
        </main>
        <footer className="app-footer">
          <p>Crypto Simulator - Accurate Attack Time Estimates Based on Selected Hardware</p>
        </footer>
      </div>
    );
  }

  if (selectedAlgorithm) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Cryptography Simulator</h1>
          <nav className="nav-tabs">
            <button onClick={() => { setSelectedAlgorithm(null); setView('home'); }} className="nav-tab">Back to List</button>
            <button onClick={() => setView('calculator')} className="nav-tab">Attack Time Calculator</button>
          </nav>
        </header>
        <main className="app-main">
          <AlgorithmDetail 
            algorithm={selectedAlgorithm}
            onBack={() => setSelectedAlgorithm(null)}
            hardwareConfig={hardwareConfig}
            onHardwareChange={handleHardwareChange}
          />
        </main>
      </div>
    );
  }

  if (selectedCategory) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Cryptography Simulator</h1>
          <nav className="nav-tabs">
            <button onClick={() => setSelectedCategory(null)} className="nav-tab">All Categories</button>
            <button onClick={() => setView('calculator')} className="nav-tab">Attack Time Calculator</button>
          </nav>
        </header>
        <main className="app-main">
          <CategoryView
            category={selectedCategory}
            algorithms={getDisplayAlgorithms()}
            onAlgorithmSelect={setSelectedAlgorithm}
            onBackToCategories={() => setSelectedCategory(null)}
            hardwareConfig={hardwareConfig}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔐 Cryptography Simulator</h1>
        <p className="subtitle">71 Algorithms Across 11 Categories</p>
        <nav className="nav-tabs">
          <button onClick={() => setView('home')} className="nav-tab active">Algorithms</button>
          <button onClick={() => setView('calculator')} className="nav-tab">⚡ Attack Time Calculator</button>
        </nav>
      </header>

      <main className="app-main">
        {/* Hardware Quick Select Banner */}
        <div className="hardware-banner">
          <span className="banner-icon">💻</span>
          <span className="banner-text">
            {hardwareConfig 
              ? `Using: ${hardwareConfig.cpuName || hardwareConfig.config?.cpu || 'Custom Hardware'}`
              : 'Configure hardware for accurate time estimates'
            }
          </span>
          <button onClick={() => setView('calculator')} className="banner-button">
            {hardwareConfig ? 'Change Hardware' : 'Select Hardware'}
          </button>
        </div>

        <div className="filters-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search algorithms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="filter-group">
            <label>Security Level:</label>
            <select 
              value={filterLevel || ''} 
              onChange={(e) => setFilterLevel(e.target.value || null)}
            >
              <option value="">All Levels</option>
              {SECURITY_ORDER.map(level => (
                <option key={level} value={level}>{level.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name</option>
              <option value="security">Security Level</option>
            </select>
          </div>
        </div>

        <div className="category-grid">
          {safeCategories.map(category => {
            const stats = getCategoryStats(category.id);
            return (
              <div 
                key={category.id}
                className="category-card"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="category-icon">
                  {CATEGORY_ICONS[category.id] || '📦'}
                </div>
                <h2>{category.name}</h2>
                <p className="category-desc">
                  {category.count} algorithm{category.count !== 1 ? 's' : ''}
                </p>
                
                <div className="category-stats">
                  {stats[SECURITY_ORDER[0]] > 0 && (
                    <span className="stat quantum-resistant">
                      {stats[SECURITY_ORDER[0]]} quantum-resistant
                    </span>
                  )}
                  {stats[SECURITY_ORDER[1]] > 0 && (
                    <span className="stat strong">
                      {stats[SECURITY_ORDER[1]]} strong
                    </span>
                  )}
                  {(stats[SECURITY_ORDER[4]] > 0 || stats[SECURITY_ORDER[5]] > 0) && (
                    <span className="stat warning">
                      {stats[SECURITY_ORDER[4]] + stats[SECURITY_ORDER[5]]} weak/deprecated
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="algorithm-preview">
          <h2>All Algorithms ({algorithms.length})</h2>
          <div className="algorithm-list">
            {getDisplayAlgorithms().slice(0, 20).map(algo => (
              <div 
                key={algo.id} 
                className="algo-row"
                onClick={() => setSelectedAlgorithm(algo)}
              >
                <span className="algo-name">{algo.name}</span>
                <span className="algo-category">{algo.categoryDisplay}</span>
                <span 
                  className="algo-security"
                  style={{ 
                    color: algo.securityLevel?.color,
                    backgroundColor: algo.securityLevel?.color + '20'
                  }}
                >
                  {algo.securityLevel?.label}
                </span>
              </div>
            ))}
            {getDisplayAlgorithms().length > 20 && (
              <div className="more-indicator">
                + {getDisplayAlgorithms().length - 20} more algorithms
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Crypto Simulator - Educational Tool for Cryptographic Algorithms</p>
        <p className="footer-note">
          Hardware-calibrated benchmarks for accurate time estimates
        </p>
      </footer>
    </div>
  );
}