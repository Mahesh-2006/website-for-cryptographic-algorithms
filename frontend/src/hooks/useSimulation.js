import { useState } from 'react';

export function useSimulation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const simulate = async (params) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Simulation failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const simulateAlgorithm = async (algorithmId, guessesPerSecond = 1e12, attackType = 'classical') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/simulate-algorithm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          algorithmId,
          guessesPerSecond,
          cores: 1,
          attackType
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Simulation failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    loading,
    result,
    error,
    simulate,
    simulateAlgorithm,
    reset
  };
}

export default useSimulation;
