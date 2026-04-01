import React from 'react';

const CATEGORY_ICONS = {
  symmetric: '🔐',
  hash: '#️⃣',
  mac: '🔏',
  authenticatedEncryption: '🛡️',
  asymmetric: '🔑',
  digitalSignatures: '📝',
  keyExchange: '🤝',
  passwordHashing: '🔒',
  postQuantum: '⚛️',
  zeroKnowledge: '🎭',
  homomorphic: '🧮'
};

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      <button
        className={`category-filter-btn ${!selectedCategory ? 'active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
          title={category.name}
        >
          <span className="category-icon">{CATEGORY_ICONS[category.id] || '📦'}</span>
          <span className="category-name">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
