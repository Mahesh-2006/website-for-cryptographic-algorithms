import React, { useState, useEffect } from 'react';

const HardwareSelector = ({ onHardwareChange, initialConfig = {} }) => {
  const [hardware, setHardware] = useState(null);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    type: initialConfig.type || 'consumer',
    cpu: initialConfig.cpu || '',
    gpu: initialConfig.gpu || 'none',
    memory: initialConfig.memory || '16gb',
    os: initialConfig.os || 'windows-11',
    node: initialConfig.node || '22',
    cores: initialConfig.cores || null,
    customCores: initialConfig.customCores || false
  });

  useEffect(() => {
    fetchHardware();
  }, []);

  useEffect(() => {
    if (hardware && config.cpu) {
      calculatePerformance();
    }
  }, [config]);

  const fetchHardware = async () => {
    try {
      const response = await fetch('/api/hardware');
      const data = await response.json();
      if (data.success) {
        setHardware(data.categories);
        // Set default CPU if none selected
        if (!config.cpu) {
          setConfig(prev => ({ ...prev, cpu: 'intel-i5-12400' }));
        }
      }
    } catch (error) {
      console.error('Failed to fetch hardware:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePerformance = async () => {
    try {
      const response = await fetch('/api/hardware/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await response.json();
      if (data.success && onHardwareChange) {
        onHardwareChange({
          config,
          performance: data.performance,
          cpuName: data.cpuName
        });
      }
    } catch (error) {
      console.error('Failed to calculate performance:', error);
    }
  };

  const handleChange = (field, value) => {
    const newConfig = { ...config, [field]: value };
    
    // Reset CPU when type changes
    if (field === 'type') {
      if (value === 'consumer') newConfig.cpu = 'intel-i5-12400';
      else if (value === 'workstation') newConfig.cpu = 'intel-xeon-w-2295';
      else if (value === 'server') newConfig.cpu = 'intel-xeon-gold-6348';
      else if (value === 'supercomputer') newConfig.cpu = 'frontier';
      else if (value === 'quantum') newConfig.cpu = 'ibm-heron';
      newConfig.gpu = 'none';
    }
    
    setConfig(newConfig);
  };

  const getCpusByType = () => {
    if (!hardware) return [];
    switch (config.type) {
      case 'consumer': return hardware.consumer || [];
      case 'workstation': return hardware.workstation || [];
      case 'server': return hardware.server || [];
      case 'supercomputer': return hardware.supercomputer || [];
      case 'quantum': return hardware.quantum || [];
      default: return [];
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'consumer': return '💻';
      case 'workstation': return '🖥️';
      case 'server': return '🖧';
      case 'supercomputer': return '🏗️';
      case 'quantum': return '⚛️';
      default: return '🔌';
    }
  };

  const getTypeDescription = (type) => {
    switch (type) {
      case 'consumer': return 'Desktop/Laptop - Everyday computing';
      case 'workstation': return 'Professional - CAD, Rendering, Development';
      case 'server': return 'Data Center - Enterprise workloads';
      case 'supercomputer': return 'HPC - Scientific computing, Code breaking';
      case 'quantum': return 'Quantum - Specialized algorithms';
      default: return '';
    }
  };

  if (loading) {
    return <div className="hardware-loading">Loading hardware database...</div>;
  }

  return (
    <div className="hardware-selector">
      <h3>Hardware Configuration</h3>
      <p className="subtitle">Select hardware for accurate time estimates</p>

      {/* Computer Type Selection */}
      <div className="hardware-section">
        <label>Computer Type</label>
        <div className="type-selector">
          {['consumer', 'workstation', 'server', 'supercomputer', 'quantum'].map(type => (
            <button
              key={type}
              className={`type-button ${config.type === type ? 'active' : ''}`}
              onClick={() => handleChange('type', type)}
            >
              <span className="type-icon">{getTypeIcon(type)}</span>
              <span className="type-name">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </button>
          ))}
        </div>
        <p className="type-description">{getTypeDescription(config.type)}</p>
      </div>

      {/* CPU Selection */}
      <div className="hardware-section">
        <label>CPU / Processor</label>
        <select
          value={config.cpu}
          onChange={(e) => handleChange('cpu', e.target.value)}
          className="hardware-select"
        >
          <option value="">Select CPU...</option>
          {getCpusByType().map(cpu => (
            <option key={cpu.id} value={cpu.id}>
              {cpu.name} ({cpu.cores} cores{cpu.performanceScore ? `, Score: ${cpu.performanceScore}x` : ''})
            </option>
          ))}
        </select>
      </div>

      {/* GPU Selection (not for Quantum) */}
      {config.type !== 'quantum' && (
        <div className="hardware-section">
          <label>GPU (Graphics Card)</label>
          <select
            value={config.gpu}
            onChange={(e) => handleChange('gpu', e.target.value)}
            className="hardware-select"
          >
            {hardware.gpu?.map(gpu => (
              <option key={gpu.id} value={gpu.id}>
                {gpu.name} {gpu.performanceMultiplier > 1 ? `(Boost: ${gpu.performanceMultiplier}x)` : ''}
              </option>
            ))}
          </select>
          <p className="hint">GPU accelerates parallel operations like hash cracking</p>
        </div>
      )}

      {/* Memory Selection */}
      <div className="hardware-section">
        <label>RAM (Memory)</label>
        <div className="memory-selector">
          {hardware.memory?.map(mem => (
            <button
              key={mem.id}
              className={`memory-button ${config.memory === mem.id ? 'active' : ''}`}
              onClick={() => handleChange('memory', mem.id)}
            >
              {mem.label}
            </button>
          ))}
        </div>
        <p className="hint">Memory affects memory-hard algorithms (scrypt, Argon2)</p>
      </div>

      {/* CPU Cores Selection */}
      <div className="hardware-section">
        <label>CPU Cores to Use</label>
        <div className="cores-selector">
          <button
            className={`cores-button ${!config.customCores ? 'active' : ''}`}
            onClick={() => handleChange('customCores', false)}
          >
            All Cores
          </button>
          <button
            className={`cores-button ${config.customCores ? 'active' : ''}`}
            onClick={() => handleChange('customCores', true)}
          >
            Custom
          </button>
        </div>
        {config.customCores && (
          <input
            type="number"
            min="1"
            max="1000"
            value={config.cores || ''}
            onChange={(e) => handleChange('cores', parseInt(e.target.value) || null)}
            placeholder="Number of cores"
            className="cores-input"
          />
        )}
      </div>

      {/* OS Selection */}
      <div className="hardware-section">
        <label>Operating System</label>
        <select
          value={config.os}
          onChange={(e) => handleChange('os', e.target.value)}
          className="hardware-select"
        >
          {hardware.os?.map(os => (
            <option key={os.id} value={os.id}>{os.name}</option>
          ))}
        </select>
      </div>

      {/* Node.js Version */}
      <div className="hardware-section">
        <label>Node.js Version</label>
        <select
          value={config.node}
          onChange={(e) => handleChange('node', e.target.value)}
          className="hardware-select"
        >
          {hardware.node?.map(node => (
            <option key={node.id} value={node.id}>Node.js {node.version}</option>
          ))}
        </select>
      </div>

      {/* Presets */}
      <div className="hardware-section">
        <label>Quick Presets</label>
        <div className="preset-buttons">
          <button
            className="preset-button"
            onClick={() => setConfig({
              type: 'consumer',
              cpu: 'intel-i5-12400',
              gpu: 'none',
              memory: '16gb',
              os: 'windows-11',
              node: '22',
              cores: null,
              customCores: false
            })}
          >
            🏠 Home PC
          </button>
          <button
            className="preset-button"
            onClick={() => setConfig({
              type: 'server',
              cpu: 'amd-epyc-9654',
              gpu: 'nvidia-h100',
              memory: '256gb',
              os: 'ubuntu-24-04',
              node: '24',
              cores: null,
              customCores: false
            })}
          >
            🏢 Data Center
          </button>
          <button
            className="preset-button"
            onClick={() => setConfig({
              type: 'supercomputer',
              cpu: 'aurora',
              gpu: 'none',
              memory: '8tb',
              os: 'rhel-9',
              node: '24',
              cores: null,
              customCores: false
            })}
          >
            🚀 Supercomputer
          </button>
          <button
            className="preset-button"
            onClick={() => setConfig({
              type: 'quantum',
              cpu: 'ibm-starling',
              gpu: 'none',
              memory: '256gb',
              os: 'ubuntu-24-04',
              node: '24',
              cores: null,
              customCores: false
            })}
          >
            ⚛️ Quantum
          </button>
        </div>
      </div>
    </div>
  );
};

export default HardwareSelector;
