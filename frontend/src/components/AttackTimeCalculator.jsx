import React, { useState, useEffect } from 'react';
import { calculateAttackTime } from '../data/staticHardware';

const AttackTimeCalculator = ({ hardwareConfig, algorithms = [] }) => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    calculateTimes();
  }, [hardwareConfig, selectedAlgorithms]);

  const calculateTimes = () => {
    if (!hardwareConfig) return;
    
    const newResults = selectedAlgorithms.map(algoId => {
      const algorithm = algorithms.find(a => a.id === algoId);
      if (!algorithm) return null;
      
      const attackTime = calculateAttackTime(algorithm, hardwareConfig.hardware);
      return {
        ...algorithm,
        ...attackTime
      };
    }).filter(Boolean);

    setResults(newResults);
  };

  const toggleAlgorithm = (algoId) => {
    if (selectedAlgorithms.includes(algoId)) {
      setSelectedAlgorithms(selectedAlgorithms.filter(a => a !== algoId));
    } else {
      setSelectedAlgorithms([...selectedAlgorithms, algoId]);
    }
  };

  return (
    <div className="attack-time-calculator">
      <h3>⏱️ Attack Time Estimator</h3>
      
      <div className="calculator-algorithms">
        <h4>Select Algorithms:</h4>
        <div className="algo-buttons">
          {algorithms.slice(0, 20).map(algo => (
            <button
              key={algo.id}
              className={`algo-button ${selectedAlgorithms.includes(algo.id) ? 'selected' : ''}`}
              onClick={() => toggleAlgorithm(algo.id)}
            >
              {algo.name}
            </button>
          ))}
        </div>
      </div>

      {hardwareConfig && (
        <div className="calculator-results">
          <h4>Hardware: {hardwareConfig.hardware?.name}</h4>
          {results.length > 0 ? (
            <table className="results-table">
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Security</th>
                  <th>Est. Attack Time</th>
                  <th>Complexity</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>
                      <span className={`security-${result.securityLevel?.label?.toLowerCase()}`}>
                        {result.securityLevel?.label || 'Unknown'}
                      </span>
                    </td>
                    <td>
                      {result.years === Infinity ? '∞' :
                       result.years > 1e9 ? `${(result.years / 1e9).toFixed(1)}B years` :
                       result.years > 1e6 ? `${(result.years / 1e6).toFixed(1)}M years` :
                       result.years > 1 ? `${result.years.toFixed(1)} years` :
                       result.years > 1/365 ? `${(result.years * 365).toFixed(1)} days` :
                       'Minutes'}
                    </td>
                    <td>{result.complexity} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Select algorithms to see attack time estimates</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttackTimeCalculator;
