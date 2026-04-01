import { useState, useCallback } from 'react';

export function useBenchmarks() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const runBenchmark = useCallback(async (category, algorithm, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, algorithm, options })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || 'Benchmark failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const runAllBenchmarks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/benchmark/run-all', {
        method: 'GET'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || 'Benchmark failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSupportedBenchmarks = useCallback(async () => {
    try {
      const response = await fetch('/api/benchmark/supported');
      const data = await response.json();
      return data;
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const reset = () => {
    setResults(null);
    setError(null);
  };

  return {
    loading,
    results,
    error,
    runBenchmark,
    runAllBenchmarks,
    getSupportedBenchmarks,
    reset
  };
}

export default useBenchmarks;
