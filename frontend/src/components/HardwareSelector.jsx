import React, { useState, useEffect } from 'react';
import { HARDWARE_DATA } from '../data/staticHardware';

const HardwareSelector = ({ onHardwareChange, initialConfig = {} }) => {
  const [config, setConfig] = useState({
    hardwareId: initialConfig.hardwareId || 'gpu-nvidia-a100',
    ...initialConfig
  });

  useEffect(() => {
    handleHardwareSelection(config.hardwareId);
  }, []);

  const handleHardwareSelection = (hardwareId) => {
    const selected = HARDWARE_DATA.find(h => h.id === hardwareId);
    if (selected && onHardwareChange) {
      onHardwareChange({
        config: { hardwareId },
        hardware: selected,
        performance: {
          hashRate: selected.specs?.hashRate || 0,
          cores: selected.specs?.cores || 1
        }
      });
    }
    setConfig(prev => ({ ...prev, hardwareId }));
  };

  const selectedHardware = HARDWARE_DATA.find(h => h.id === config.hardwareId);

  return (
    <div className="hardware-selector">
      <h3>💻 Select Hardware</h3>
      <div className="hardware-options">
        {HARDWARE_DATA.map(hardware => (
          <button
            key={hardware.id}
            className={`hardware-option ${config.hardwareId === hardware.id ? 'selected' : ''}`}
            onClick={() => handleHardwareSelection(hardware.id)}
          >
            <div className="hw-name">{hardware.name}</div>
            <div className="hw-category">{hardware.category}</div>
            <div className="hw-speed">Relative: {hardware.relativeSpeed}x</div>
          </button>
        ))}
      </div>
      
      {selectedHardware && (
        <div className="hardware-details">
          <h4>{selectedHardware.name}</h4>
          <ul>
            {selectedHardware.specs.cores && (
              <li>Cores: {selectedHardware.specs.cores}</li>
            )}
            {selectedHardware.specs.qubits && (
              <li>Qubits: {selectedHardware.specs.qubits}</li>
            )}
            {selectedHardware.specs.hashRate && (
              <li>Hash Rate: {(selectedHardware.specs.hashRate / 1e9).toFixed(1)} GH/s</li>
            )}
            {selectedHardware.specs.memory && (
              <li>Memory: {selectedHardware.specs.memory}GB</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HardwareSelector;
