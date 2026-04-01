import React from 'react';

const SecurityBadge = ({ level, large = false }) => {
  if (!level) return null;

  const getColor = (label) => {
    switch (label) {
      case 'QUANTUM_RESISTANT': return '#22c55e';
      case 'STRONG': return '#3b82f6';
      case 'STANDARD': return '#14b8a6';
      case 'LEGACY': return '#f59e0b';
      case 'WEAK': return '#ef4444';
      case 'DEPRECATED': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const color = level.color || getColor(level.label);
  const label = level.label?.replace(/_/g, ' ') || 'UNKNOWN';

  return (
    <span
      className={`security-badge ${large ? 'large' : ''}`}
      style={{
        backgroundColor: color + '20',
        color: color,
        borderColor: color
      }}
    >
      {label}
    </span>
  );
};

export default SecurityBadge;
