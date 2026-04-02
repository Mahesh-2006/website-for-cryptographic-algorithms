import { useDeferredValue, useState } from 'react';
import {
  ATTACK_METHODS,
  CRYPTO_ALGORITHMS,
  CRYPTO_CATEGORIES,
  HARDWARE_CATALOG
} from './data/cryptoWorkbenchData';
import {
  ENCODER_DEFAULTS,
  SEPARATOR_OPTIONS,
  buildEncodingPreview,
  createHardwareState,
  formatCompactNumber,
  getEffectiveHardwareMetrics,
  getHardwareType,
  simulateAttack
} from './utils/cryptoWorkbench';
import './index.css';
import './workbench.css';

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}

export default function WorkbenchApp() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('symmetric');
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState('aes-256');
  const [searchTerm, setSearchTerm] = useState('');
  const [encoderState, setEncoderState] = useState(ENCODER_DEFAULTS);
  const [manualOverrides, setManualOverrides] = useState({});
  const [attackMethodId, setAttackMethodId] = useState('bruteforce');
  const [hardwareState, setHardwareState] = useState(createHardwareState('normal'));
  const [secretEntropyBits, setSecretEntropyBits] = useState(40);

  const deferredSearch = useDeferredValue(searchTerm);
  const selectedCategory = CRYPTO_CATEGORIES.find((item) => item.id === selectedCategoryId) || CRYPTO_CATEGORIES[0];
  const selectedAlgorithm =
    CRYPTO_ALGORITHMS.find((item) => item.id === selectedAlgorithmId) || CRYPTO_ALGORITHMS[0];

  const categoryCounts = CRYPTO_CATEGORIES.reduce((accumulator, category) => {
    accumulator[category.id] = CRYPTO_ALGORITHMS.filter((algorithm) =>
      algorithm.categories.includes(category.id)
    ).length;
    return accumulator;
  }, {});

  const filteredAlgorithms = CRYPTO_ALGORITHMS.filter((algorithm) => {
    const matchesCategory = algorithm.categories.includes(selectedCategoryId);
    const searchValue = deferredSearch.trim().toLowerCase();
    const matchesSearch =
      !searchValue ||
      algorithm.name.toLowerCase().includes(searchValue) ||
      algorithm.summary.toLowerCase().includes(searchValue) ||
      algorithm.artifactType.toLowerCase().includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  const encodingPreview = buildEncodingPreview({
    input: encoderState.input,
    caseSensitive: encoderState.caseSensitive,
    rules: encoderState.rules,
    overrides: manualOverrides,
    separator: encoderState.separator
  });

  const hardwareType = getHardwareType(hardwareState.typeId);
  const hardwareMetrics = getEffectiveHardwareMetrics(hardwareState);
  const attackResult = simulateAttack({
    algorithm: selectedAlgorithm,
    attackMethodId,
    hardwareState,
    secretEntropyBits
  });

  function handleCategoryChange(categoryId) {
    setSelectedCategoryId(categoryId);
    const firstAlgorithm = CRYPTO_ALGORITHMS.find((algorithm) => algorithm.categories.includes(categoryId));
    if (firstAlgorithm) {
      setSelectedAlgorithmId(firstAlgorithm.id);
    }
  }

  function updateRule(group, field, value) {
    setEncoderState((current) => ({
      ...current,
      rules: {
        ...current.rules,
        [group]: {
          ...current.rules[group],
          [field]: Number(value)
        }
      }
    }));
  }

  function handleCaseSensitivityChange(checked) {
    setManualOverrides({});
    setEncoderState((current) => ({
      ...current,
      caseSensitive: checked
    }));
  }

  function handleHardwareTypeChange(typeId) {
    setHardwareState(createHardwareState(typeId));
    if (typeId !== 'quantum' && (attackMethodId === 'grover' || attackMethodId === 'shor')) {
      setAttackMethodId('bruteforce');
    }
  }

  function handleHardwarePresetChange(presetId) {
    setHardwareState(createHardwareState(hardwareState.typeId, presetId));
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Cryptography security laboratory</p>
          <h1>Build, compare, and stress-test cryptographic systems from one interface.</h1>
          <p className="hero-text">
            This website combines a custom numeric encryption studio, a category-driven algorithm
            explorer, and a hardware attack simulator so users can study how cryptography behaves
            in realistic security scenarios.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#encoder">
              Open encoder
            </a>
            <a className="secondary-action" href="#lab">
              Run attack simulation
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <article className="stat-card">
            <span>Categories</span>
            <strong>{CRYPTO_CATEGORIES.length}</strong>
          </article>
          <article className="stat-card">
            <span>Algorithms and protocols</span>
            <strong>{CRYPTO_ALGORITHMS.length}</strong>
          </article>
          <article className="stat-card">
            <span>Attack modes</span>
            <strong>{ATTACK_METHODS.length}</strong>
          </article>
          <article className="stat-card">
            <span>Hardware families</span>
            <strong>{HARDWARE_CATALOG.length}</strong>
          </article>
        </div>
      </header>

      <main className="page">
        <section id="encoder" className="panel section-panel">
          <SectionHeading
            eyebrow="1. Custom numeric encryption"
            title="Turn text into user-defined numeric encryption"
            description="Users can type letters, words, special characters, or numbers, choose case-sensitive behavior, and control the numbering scheme for lowercase letters, uppercase letters, digits, and symbols."
          />

          <div className="encoder-layout">
            <div className="encoder-controls">
              <label className="field">
                <span>Input text</span>
                <textarea
                  value={encoderState.input}
                  onChange={(event) =>
                    setEncoderState((current) => ({ ...current, input: event.target.value }))
                  }
                  rows={5}
                  placeholder="Type text, numbers, or symbols"
                />
              </label>

              <div className="toggle-row">
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={encoderState.caseSensitive}
                    onChange={(event) => handleCaseSensitivityChange(event.target.checked)}
                  />
                  <span>Case sensitive mapping</span>
                </label>

                <div className="segmented">
                  {SEPARATOR_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      className={encoderState.separator === option.id ? 'chip active' : 'chip'}
                      onClick={() =>
                        setEncoderState((current) => ({ ...current, separator: option.id }))
                      }
                      type="button"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rule-grid">
                {['lowercase', 'digits', 'symbols'].map((group) => (
                  <article key={group} className="rule-card">
                    <h3>{group}</h3>
                    <div className="inline-fields">
                      <label className="field compact-field">
                        <span>Start</span>
                        <input
                          type="number"
                          value={encoderState.rules[group].start}
                          onChange={(event) => updateRule(group, 'start', event.target.value)}
                        />
                      </label>
                      <label className="field compact-field">
                        <span>Step</span>
                        <input
                          type="number"
                          value={encoderState.rules[group].step}
                          onChange={(event) => updateRule(group, 'step', event.target.value)}
                        />
                      </label>
                    </div>
                  </article>
                ))}

                <article className="rule-card">
                  <h3>{encoderState.caseSensitive ? 'uppercase' : 'uppercase note'}</h3>
                  {encoderState.caseSensitive ? (
                    <div className="inline-fields">
                      <label className="field compact-field">
                        <span>Start</span>
                        <input
                          type="number"
                          value={encoderState.rules.uppercase.start}
                          onChange={(event) => updateRule('uppercase', 'start', event.target.value)}
                        />
                      </label>
                      <label className="field compact-field">
                        <span>Step</span>
                        <input
                          type="number"
                          value={encoderState.rules.uppercase.step}
                          onChange={(event) => updateRule('uppercase', 'step', event.target.value)}
                        />
                      </label>
                    </div>
                  ) : (
                    <p className="note">Uppercase letters share lowercase numbering while case sensitivity is off.</p>
                  )}
                </article>

                <article className="rule-card">
                  <h3>space</h3>
                  <label className="field compact-field">
                    <span>Value</span>
                    <input
                      type="number"
                      value={encoderState.rules.whitespace.value}
                      onChange={(event) => updateRule('whitespace', 'value', event.target.value)}
                    />
                  </label>
                </article>
              </div>
            </div>

            <div className="encoder-output">
              <article className="output-card">
                <p className="eyebrow">Generated output</p>
                <h3>{encodingPreview.selectedOutput || 'Type input to generate encryption'}</h3>
                <p className="note">Readable sequence: {encodingPreview.readableOutput || 'n/a'}</p>
                <p className="note">Compact sequence: {encodingPreview.compactOutput || 'n/a'}</p>
                <p className="note">
                  Example target from your plan: with lowercase start `1` and step `1`, `rishitha`
                  becomes `18919892081`.
                </p>
              </article>

              <article className="mapping-card">
                <div className="mapping-header">
                  <div>
                    <p className="eyebrow">Character mapping</p>
                    <h3>Unique characters in the current input</h3>
                  </div>
                  <button className="chip" type="button" onClick={() => setManualOverrides({})}>
                    Clear overrides
                  </button>
                </div>

                <div className="mapping-table">
                  {encodingPreview.entries.map((entry) => (
                    <div key={entry.key} className="mapping-row">
                      <div>
                        <strong>{entry.label}</strong>
                        <span>{entry.group}</span>
                      </div>
                      <label className="field compact-field">
                        <span>Value</span>
                        <input
                          type="number"
                          value={manualOverrides[entry.key] ?? entry.value}
                          onChange={(event) =>
                            setManualOverrides((current) => ({
                              ...current,
                              [entry.key]: event.target.value
                            }))
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="atlas" className="panel section-panel">
          <SectionHeading
            eyebrow="2. Algorithm atlas"
            title="Browse the cryptography categories from your plan"
            description="Select a category to reveal the algorithms, protocols, and constructions under it. Each detail panel explains the history, security purpose, workflow, mathematical basis, and the type of hacker threat it is designed to resist."
          />

          <div className="category-grid">
            {CRYPTO_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                className={selectedCategoryId === category.id ? 'category-tile active' : 'category-tile'}
                onClick={() => handleCategoryChange(category.id)}
              >
                <strong>{category.name}</strong>
                <span>{category.description}</span>
                <em>{categoryCounts[category.id]} items</em>
              </button>
            ))}
          </div>

          <div className="atlas-layout">
            <aside className="algorithm-list-panel">
              <label className="field">
                <span>Search inside {selectedCategory.name}</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by name, summary, or type"
                />
              </label>

              <div className="algorithm-list">
                {filteredAlgorithms.map((algorithm) => (
                  <button
                    key={algorithm.id}
                    type="button"
                    className={selectedAlgorithmId === algorithm.id ? 'algorithm-row active' : 'algorithm-row'}
                    onClick={() => setSelectedAlgorithmId(algorithm.id)}
                  >
                    <strong>{algorithm.name}</strong>
                    <span>{algorithm.artifactType}</span>
                    <p>{algorithm.summary}</p>
                  </button>
                ))}
                {filteredAlgorithms.length === 0 && (
                  <div className="empty-state">No algorithms matched the current search for this category.</div>
                )}
              </div>
            </aside>

            <article className="algorithm-detail-card">
              <div className="detail-header">
                <div>
                  <p className="eyebrow">{selectedAlgorithm.artifactType}</p>
                  <h3>{selectedAlgorithm.name}</h3>
                </div>
                <div className="tag-list">
                  {selectedAlgorithm.categories.map((categoryId) => (
                    <span key={categoryId} className="tag">
                      {CRYPTO_CATEGORIES.find((category) => category.id === categoryId)?.name}
                    </span>
                  ))}
                </div>
              </div>

              <p className="lead">{selectedAlgorithm.summary}</p>

              <div className="detail-section-grid">
                <article className="detail-block">
                  <h4>History</h4>
                  <p>{selectedAlgorithm.history}</p>
                </article>
                <article className="detail-block">
                  <h4>What it protects</h4>
                  <p>{selectedAlgorithm.protection}</p>
                </article>
                <article className="detail-block">
                  <h4>How it protects from hackers</h4>
                  <p>{selectedAlgorithm.hackerDefense}</p>
                </article>
                <article className="detail-block">
                  <h4>Simulation basis</h4>
                  <p>{selectedAlgorithm.estimateBasis}</p>
                </article>
              </div>

              <div className="detail-block">
                <h4>Encryption, decryption, or verification flow</h4>
                <ul className="detail-list">
                  {selectedAlgorithm.workflow.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-block math-block">
                <h4>Mathematical notes</h4>
                <ul className="detail-list">
                  {selectedAlgorithm.math.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="lab" className="panel section-panel">
          <SectionHeading
            eyebrow="3. Attack simulation lab"
            title="Estimate how long an attack could take on selected hardware"
            description="Choose the computer type, hardware model, processor details, RAM, and attack method. The simulator then estimates a break time and gives a simple safe-or-not verdict based on that scenario."
          />

          <div className="lab-layout">
            <aside className="lab-controls">
              <label className="field">
                <span>Selected algorithm or protocol</span>
                <select
                  value={selectedAlgorithmId}
                  onChange={(event) => setSelectedAlgorithmId(event.target.value)}
                >
                  {CRYPTO_ALGORITHMS.map((algorithm) => (
                    <option key={algorithm.id} value={algorithm.id}>
                      {algorithm.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="field">
                <span>Attack method</span>
                <div className="attack-grid">
                  {ATTACK_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      className={attackMethodId === method.id ? 'attack-card active' : 'attack-card'}
                      onClick={() => setAttackMethodId(method.id)}
                    >
                      <strong>{method.name}</strong>
                      <p>{method.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <span>Computer type</span>
                <div className="segmented type-segmented">
                  {HARDWARE_CATALOG.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={hardwareState.typeId === type.id ? 'chip active' : 'chip'}
                      onClick={() => handleHardwareTypeChange(type.id)}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <label className="field">
                <span>Preset model</span>
                <select
                  value={hardwareState.presetId}
                  onChange={(event) => handleHardwarePresetChange(event.target.value)}
                >
                  {hardwareType.presets.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                      {preset.model}
                    </option>
                  ))}
                </select>
              </label>

              <div className="detail-section-grid compact-grid">
                <label className="field">
                  <span>Model label</span>
                  <input
                    type="text"
                    value={hardwareState.model}
                    onChange={(event) =>
                      setHardwareState((current) => ({ ...current, model: event.target.value }))
                    }
                  />
                </label>
                <label className="field">
                  <span>Processor</span>
                  <input
                    type="text"
                    value={hardwareState.processor}
                    onChange={(event) =>
                      setHardwareState((current) => ({ ...current, processor: event.target.value }))
                    }
                  />
                </label>
                <label className="field">
                  <span>CPU</span>
                  <input
                    type="text"
                    value={hardwareState.cpu}
                    onChange={(event) =>
                      setHardwareState((current) => ({ ...current, cpu: event.target.value }))
                    }
                  />
                </label>
                <label className="field">
                  <span>Cores</span>
                  <input
                    type="number"
                    min="1"
                    value={hardwareState.cores}
                    onChange={(event) =>
                      setHardwareState((current) => ({
                        ...current,
                        cores: Number(event.target.value) || 1
                      }))
                    }
                  />
                </label>
                <label className="field">
                  <span>RAM (GB)</span>
                  <input
                    type="number"
                    min="1"
                    value={hardwareState.ram}
                    onChange={(event) =>
                      setHardwareState((current) => ({
                        ...current,
                        ram: Number(event.target.value) || 1
                      }))
                    }
                  />
                </label>
                {hardwareState.typeId === 'quantum' && (
                  <label className="field">
                    <span>Qubits</span>
                    <input
                      type="number"
                      min="1"
                      value={hardwareState.qubits}
                      onChange={(event) =>
                        setHardwareState((current) => ({
                          ...current,
                          qubits: Number(event.target.value) || 1
                        }))
                      }
                    />
                  </label>
                )}
              </div>

              {attackMethodId === 'dictionary' && (
                <label className="field">
                  <span>Assumed password or passphrase entropy: {secretEntropyBits} bits</span>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    step="1"
                    value={secretEntropyBits}
                    onChange={(event) => setSecretEntropyBits(Number(event.target.value))}
                  />
                </label>
              )}
            </aside>

            <article className="lab-results">
              <div className={`verdict-card ${attackResult?.verdict?.tone || 'neutral'}`}>
                <p className="eyebrow">Modeled break time</p>
                <h3>{attackResult?.durationLabel || 'Select a scenario'}</h3>
                <strong>{attackResult?.verdict?.label}</strong>
                <p>{attackResult?.verdict?.summary}</p>
              </div>

              <div className="detail-section-grid">
                <article className="detail-block">
                  <h4>Attack basis</h4>
                  <p>{selectedAlgorithm.estimateBasis}</p>
                </article>
                <article className="detail-block">
                  <h4>Work factor</h4>
                  <p>{attackResult?.workFactorLabel || 'Not available'}</p>
                </article>
                <article className="detail-block">
                  <h4>Hardware throughput</h4>
                  <p>Classical rate: {formatCompactNumber(hardwareMetrics.classicalRate)} ops/sec</p>
                  <p>Quantum rate: {formatCompactNumber(hardwareMetrics.quantumRate)} iterations/sec</p>
                </article>
                <article className="detail-block">
                  <h4>Hardware profile</h4>
                  <p>{hardwareState.model}</p>
                  <p>{hardwareState.processor}</p>
                  <p>
                    {hardwareState.cores} cores, {hardwareState.ram} GB RAM
                    {hardwareState.typeId === 'quantum' ? `, ${hardwareState.qubits} qubits` : ''}
                  </p>
                </article>
              </div>

              <div className="detail-block">
                <h4>Simulation note</h4>
                <p>{attackResult?.details}</p>
                <p className="note">
                  These numbers are educational estimates, not guaranteed real-world cracking times.
                  Actual security also depends on implementation bugs, key management, side channels,
                  protocol misuse, and attacker budget.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
