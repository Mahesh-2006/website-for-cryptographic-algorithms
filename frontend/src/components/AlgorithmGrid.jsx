import React from 'react';
import AlgorithmCard from './AlgorithmCard';

const AlgorithmGrid = ({ algorithms, onSelectAlgorithm, columns = 3 }) => {
  if (!algorithms || algorithms.length === 0) {
    return (
      <div className="algorithm-grid-empty">
        <p>No algorithms found</p>
      </div>
    );
  }

  return (
    <div className={`algorithm-grid algorithm-grid-${columns}`}>
      {algorithms.map(algorithm => (
        <AlgorithmCard
          key={algorithm.id}
          algorithm={algorithm}
          onClick={() => onSelectAlgorithm(algorithm)}
        />
      ))}
    </div>
  );
};

export default AlgorithmGrid;
