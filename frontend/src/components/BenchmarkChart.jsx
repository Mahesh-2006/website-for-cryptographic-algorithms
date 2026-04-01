import React from 'react';

const BenchmarkChart = ({ data, title = 'Performance' }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="benchmark-chart-empty">
        <p>No benchmark data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...Object.values(data).map(v => typeof v === 'number' ? v : 0));

  const formatValue = (value) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}G`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(0);
  };

  return (
    <div className="benchmark-chart">
      <h4>{title}</h4>
      <div className="benchmark-bars">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="benchmark-bar-item">
            <div className="benchmark-bar-label">{key}</div>
            <div className="benchmark-bar-container">
              <div
                className="benchmark-bar-fill"
                style={{ width: `${(value / maxValue) * 100}%` }}
              />
            </div>
            <div className="benchmark-bar-value">{formatValue(value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenchmarkChart;
