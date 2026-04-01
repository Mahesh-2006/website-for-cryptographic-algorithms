const express = require('express');
const router = express.Router();

const {
  getAllAlgorithms,
  getAlgorithmsByCategory,
  getAlgorithmById,
  getCategories,
  CATEGORY_ORDER,
  CATEGORY_DISPLAY_NAMES
} = require('../algorithms/registry');

router.get('/', (req, res) => {
  try {
    const { category, search, securityLevel, sort } = req.query;
    
    let algorithms;
    
    if (category && CATEGORY_ORDER.includes(category)) {
      algorithms = getAlgorithmsByCategory(category);
    } else {
      algorithms = getAllAlgorithms();
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      algorithms = algorithms.filter(algo => 
        algo.name.toLowerCase().includes(searchLower) ||
        algo.id.toLowerCase().includes(searchLower) ||
        algo.educational?.useCases?.some(use => use.toLowerCase().includes(searchLower))
      );
    }
    
    if (securityLevel) {
      algorithms = algorithms.filter(algo => 
        algo.securityLevel?.label?.toLowerCase() === securityLevel.toLowerCase()
      );
    }
    
    if (sort) {
      switch (sort) {
        case 'name':
          algorithms.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'security':
          algorithms.sort((a, b) => 
            (b.securityLevel?.severity || 0) - (a.securityLevel?.severity || 0)
          );
          break;
        case 'category':
          algorithms.sort((a, b) => a.categoryDisplay.localeCompare(b.categoryDisplay));
          break;
        default:
          break;
      }
    }
    
    res.json({
      success: true,
      count: algorithms.length,
      data: algorithms
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/categories', (req, res) => {
  try {
    const categories = getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:identifier', (req, res) => {
  try {
    const { identifier } = req.params;
    
    if (CATEGORY_ORDER.includes(identifier)) {
      const algorithms = getAlgorithmsByCategory(identifier);
      return res.json({
        success: true,
        category: identifier,
        categoryDisplay: CATEGORY_DISPLAY_NAMES[identifier] || identifier,
        count: algorithms.length,
        data: algorithms
      });
    }
    
    const algorithm = getAlgorithmById(identifier);
    
    if (!algorithm) {
      return res.status(404).json({
        success: false,
        error: `Algorithm with id '${identifier}' not found`
      });
    }
    
    res.json({
      success: true,
      data: algorithm
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
