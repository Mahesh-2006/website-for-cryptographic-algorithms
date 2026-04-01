const express = require('express');
const router = express.Router();

const { getAlgorithmById, getAlgorithmsByCategory, CATEGORY_ORDER } = require('../algorithms/registry');
const { formatTime, calculateBruteForceTime, calculateGroverTime, calculateShorTime } = require('../utils/complexityCalculator');

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const algorithm = getAlgorithmById(id);
    
    if (!algorithm) {
      return res.status(404).json({
        success: false,
        error: `Algorithm with id '${id}' not found`
      });
    }
    
    const educational = algorithm.educational || {};
    const securityParams = algorithm.securityParams || {};
    const crackingComplexity = algorithm.crackingComplexity || {};
    
    const result = {
      id: algorithm.id,
      name: algorithm.name,
      category: algorithm.category,
      categoryDisplay: algorithm.categoryDisplay,
      securityLevel: algorithm.securityLevel,
      
      description: educational.description || 'No description available.',
      
      overview: {
        description: educational.description,
        invented: educational.invented,
        standardized: educational.standardized,
        type: algorithm.type
      },
      
      useCases: educational.useCases || [],
      pros: educational.pros || [],
      cons: educational.cons || [],
      
      securityParameters: {
        keySize: securityParams.keySize || null,
        blockSize: securityParams.blockSize || null,
        outputSize: securityParams.outputSize || null,
        ivSize: securityParams.ivSize || null,
        tagSize: securityParams.tagSize || null,
        nonceSize: securityParams.nonceSize || null,
        rounds: securityParams.rounds || null
      },
      
      crackingMetrics: {
        classical: crackingComplexity.classical || null,
        quantumGrover: crackingComplexity.quantumGrover || null,
        quantumShor: crackingComplexity.quantumShor || null,
        collision: crackingComplexity.collision || null,
        preimage: crackingComplexity.preimage || null
      },
      
      complexity: algorithm.complexity || {},
      
      implementation: algorithm.implementation || {}
    };
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    
    if (!CATEGORY_ORDER.includes(category)) {
      return res.status(400).json({
        success: false,
        error: `Invalid category. Valid categories: ${CATEGORY_ORDER.join(', ')}`
      });
    }
    
    const algorithms = getAlgorithmsByCategory(category);
    
    const educationalSummaries = algorithms.map(algo => ({
      id: algo.id,
      name: algo.name,
      description: algo.educational?.description || '',
      securityLevel: algo.securityLevel,
      keyPoints: {
        pros: algo.educational?.pros || [],
        cons: algo.educational?.cons || []
      }
    }));
    
    res.json({
      success: true,
      category,
      count: educationalSummaries.length,
      data: educationalSummaries
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/simulate-crack', (req, res) => {
  try {
    const { id, guessesPerSecond = 1e12, cores = 1, attackType = 'classical' } = req.body;
    
    const algorithm = getAlgorithmById(id);
    
    if (!algorithm) {
      return res.status(404).json({
        success: false,
        error: `Algorithm with id '${id}' not found`
      });
    }
    
    const securityParams = algorithm.securityParams || {};
    let keySize;
    
    if (securityParams.keySize) {
      if (typeof securityParams.keySize === 'number') {
        keySize = securityParams.keySize;
      } else if (typeof securityParams.keySize === 'object' && securityParams.keySize.typical) {
        keySize = securityParams.keySize.typical;
      } else if (typeof securityParams.keySize === 'object' && securityParams.keySize.default) {
        keySize = securityParams.keySize.default;
      } else if (typeof securityParams.keySize === 'object' && Array.isArray(securityParams.keySize.options)) {
        keySize = securityParams.keySize.options[securityParams.keySize.options.length - 1];
      }
    } else if (securityParams.outputSize) {
      keySize = securityParams.outputSize;
    } else if (securityParams.hashFunction === 'sha256') {
      keySize = 256;
    }
    
    if (!keySize) {
      return res.status(400).json({
        success: false,
        error: 'Cannot determine key size for simulation'
      });
    }
    
    let result;
    
    if (attackType === 'quantum') {
      result = calculateGroverTime(keySize, guessesPerSecond, cores);
      result.model = 'Quantum (Grover)';
    } else if (attackType === 'shor') {
      result = calculateShorTime(keySize);
      result.model = 'Quantum (Shor)';
    } else {
      result = calculateBruteForceTime(keySize, guessesPerSecond, cores);
      result.model = 'Classical';
    }
    
    res.json({
      success: true,
      algorithm: {
        id: algorithm.id,
        name: algorithm.name,
        category: algorithm.category
      },
      simulationParams: {
        keySize,
        guessesPerSecond,
        cores,
        attackType
      },
      result: {
        ...result,
        humanReadable: formatTime(result.seconds)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
