import React from 'react';

const ComplexityTable = ({ complexity }) => {
  if (!complexity) {
    return (
      <div className="complexity-table-empty">
        <p>No complexity data available</p>
      </div>
    );
  }

  const rows = [];

  if (complexity.encryption || complexity.encrypt) {
    rows.push({ name: 'Encryption', ...complexity.encryption || complexity.encrypt });
  }
  if (complexity.decryption || complexity.decrypt) {
    rows.push({ name: 'Decryption', ...complexity.decryption || complexity.decrypt });
  }
  if (complexity.keyGeneration || complexity.keyGen) {
    rows.push({ name: 'Key Generation', ...complexity.keyGeneration || complexity.keyGen });
  }
  if (complexity.signing || complexity.sign) {
    rows.push({ name: 'Signing', ...complexity.signing || complexity.sign });
  }
  if (complexity.verification || complexity.verify) {
    rows.push({ name: 'Verification', ...complexity.verification || complexity.verify });
  }

  return (
    <div className="complexity-table">
      <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Time</th>
            <th>Space</th>
            <th>Memory</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td><code>{row.time || 'O(1)'}</code></td>
              <td><code>{row.space || 'O(1)'}</code></td>
              <td><code>{row.memory || 'O(1)'}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplexityTable;
