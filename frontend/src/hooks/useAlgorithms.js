import { useState, useEffect } from 'react';

export function useAlgorithms() {
  const [algorithms, setAlgorithms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlgorithms = async () => {
    try {
      setLoading(true);
      const [algorithmsRes, categoriesRes] = await Promise.all([
        fetch('/api/algorithms'),
        fetch('/api/algorithms/categories')
      ]);
      
      const algorithmsData = await algorithmsRes.json();
      const categoriesData = await categoriesRes.json();
      
      setAlgorithms(Array.isArray(algorithmsData) ? algorithmsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlgorithms();
  }, []);

  return {
    algorithms,
    categories,
    loading,
    error,
    refetch: fetchAlgorithms
  };
}

export function useAlgorithm(algorithmId) {
  const [algorithm, setAlgorithm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!algorithmId) return;

    const fetchAlgorithm = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/algorithms/${algorithmId}`);
        const data = await response.json();
        
        if (data.id) {
          setAlgorithm(data);
        } else {
          setError('Algorithm not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlgorithm();
  }, [algorithmId]);

  return { algorithm, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/algorithms/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}

export default useAlgorithms;
