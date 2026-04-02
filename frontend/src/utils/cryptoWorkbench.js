import { HARDWARE_CATALOG } from '../data/cryptoWorkbenchData';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SYMBOLS = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;
const LOG10_2 = Math.log10(2);
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = 86400;
const SECONDS_PER_MONTH = 2629800;
const SECONDS_PER_YEAR = 31557600;

export const ENCODER_DEFAULTS = {
  input: 'rishitha',
  caseSensitive: false,
  separator: 'none',
  rules: {
    lowercase: { start: 1, step: 1 },
    uppercase: { start: 101, step: 1 },
    digits: { start: 300, step: 1 },
    symbols: { start: 500, step: 5 },
    whitespace: { value: 0 }
  }
};

export const SEPARATOR_OPTIONS = [
  { id: 'none', label: 'Compact' },
  { id: 'space', label: 'Spaces' },
  { id: 'hyphen', label: 'Hyphen' }
];

function isAlphabetic(char) {
  return /^[A-Za-z]$/.test(char);
}

function isLowercase(char) {
  return /^[a-z]$/.test(char);
}

function isUppercase(char) {
  return /^[A-Z]$/.test(char);
}

function normalizeCharacter(char, caseSensitive) {
  if (isAlphabetic(char) && !caseSensitive) {
    return char.toLowerCase();
  }
  return char;
}

function getCharacterGroup(char, caseSensitive) {
  if (char === ' ') {
    return 'whitespace';
  }
  if (isLowercase(char)) {
    return 'lowercase';
  }
  if (isUppercase(char)) {
    return caseSensitive ? 'uppercase' : 'lowercase';
  }
  if (/^[0-9]$/.test(char)) {
    return 'digits';
  }
  return 'symbols';
}

function toSeparatorValue(separatorId) {
  if (separatorId === 'space') {
    return ' ';
  }
  if (separatorId === 'hyphen') {
    return '-';
  }
  return '';
}

function getDisplayLabel(entry) {
  if (entry.group === 'whitespace') {
    return 'space';
  }
  if (entry.samples.length > 1) {
    return entry.samples.join(' / ');
  }
  return entry.samples[0];
}

function getSymbolIndex(char, fallbackIndex) {
  const foundIndex = SYMBOLS.indexOf(char);
  return foundIndex >= 0 ? foundIndex : fallbackIndex;
}

function getDefaultValue(entry, rules) {
  if (entry.group === 'whitespace') {
    return rules.whitespace.value;
  }

  if (entry.group === 'lowercase') {
    return rules.lowercase.start + rules.lowercase.step * LOWERCASE.indexOf(entry.key.toLowerCase());
  }

  if (entry.group === 'uppercase') {
    return rules.uppercase.start + rules.uppercase.step * UPPERCASE.indexOf(entry.key.toUpperCase());
  }

  if (entry.group === 'digits') {
    return rules.digits.start + rules.digits.step * Number(entry.key);
  }

  return rules.symbols.start + rules.symbols.step * getSymbolIndex(entry.key, entry.order);
}

export function buildCharacterEntries(input, caseSensitive) {
  const seen = new Map();
  let order = 0;

  Array.from(input).forEach((char) => {
    const key = normalizeCharacter(char, caseSensitive);
    const group = getCharacterGroup(char, caseSensitive);

    if (!seen.has(key)) {
      seen.set(key, {
        key,
        group,
        samples: [char],
        order
      });
      order += 1;
      return;
    }

    const existing = seen.get(key);
    if (!existing.samples.includes(char)) {
      existing.samples.push(char);
    }
  });

  return Array.from(seen.values()).map((entry) => ({
    ...entry,
    label: getDisplayLabel(entry)
  }));
}

export function buildEncodingPreview({ input, caseSensitive, rules, overrides, separator }) {
  const entries = buildCharacterEntries(input, caseSensitive);
  const mapping = {};

  entries.forEach((entry) => {
    const overrideValue = overrides?.[entry.key];
    mapping[entry.key] =
      overrideValue !== '' && overrideValue !== undefined && Number.isFinite(Number(overrideValue))
      ? Number(overrideValue)
      : getDefaultValue(entry, rules);
  });

  const tokens = Array.from(input).map((char) => {
    const key = normalizeCharacter(char, caseSensitive);
    return mapping[key];
  });

  const separatorValue = toSeparatorValue(separator);

  return {
    entries: entries.map((entry) => ({
      ...entry,
      value: mapping[entry.key]
    })),
    compactOutput: tokens.join(''),
    readableOutput: tokens.join(' '),
    selectedOutput: tokens.join(separatorValue),
    tokenCount: tokens.length
  };
}

export function getHardwareType(typeId) {
  return HARDWARE_CATALOG.find((type) => type.id === typeId) || HARDWARE_CATALOG[0];
}

export function getHardwarePreset(typeId, presetId) {
  const type = getHardwareType(typeId);
  return type.presets.find((preset) => preset.id === presetId) || type.presets[0];
}

export function createHardwareState(typeId = HARDWARE_CATALOG[0].id, presetId) {
  const type = getHardwareType(typeId);
  const preset = getHardwarePreset(type.id, presetId || type.presets[0].id);

  return {
    typeId: type.id,
    presetId: preset.id,
    model: preset.model,
    processor: preset.processor,
    cpu: preset.cpu,
    cores: preset.cores,
    ram: preset.ram,
    qubits: preset.qubits || 0
  };
}

export function formatCompactNumber(value) {
  if (!Number.isFinite(value)) {
    return 'infinite';
  }
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: value >= 100 ? 0 : 1
  }).format(value);
}

export function getEffectiveHardwareMetrics(hardwareState) {
  const type = getHardwareType(hardwareState.typeId);
  const preset = getHardwarePreset(type.id, hardwareState.presetId);

  const coreScale = Math.pow(Math.max(hardwareState.cores, 1) / Math.max(preset.cores || 1, 1), 0.9);
  const ramRatio = Math.max(hardwareState.ram, 1) / Math.max(preset.ram || 1, 1);
  const ramScale = Math.max(0.4, 1 + Math.log2(ramRatio) * 0.12);
  const classicalRate = (preset.classicalRate || 1) * coreScale * ramScale;

  const baseQubits = Math.max(preset.qubits || 1, 1);
  const qubitRatio = Math.max(hardwareState.qubits || 0, 0) / baseQubits;
  const quantumRate = preset.quantumRate
    ? preset.quantumRate * Math.max(0, Math.pow(Math.max(qubitRatio, 0.05), 1.15))
    : 0;

  return {
    type,
    preset,
    classicalRate,
    quantumRate
  };
}

function log10AverageSearch(bits) {
  return (bits - 1) * LOG10_2;
}

function formatDurationFromSeconds(seconds) {
  if (seconds < 1) {
    return '< 1 second';
  }

  if (seconds < SECONDS_PER_MINUTE) {
    return `${seconds.toFixed(seconds < 10 ? 1 : 0)} seconds`;
  }

  if (seconds < SECONDS_PER_HOUR) {
    return `${(seconds / SECONDS_PER_MINUTE).toFixed(1)} minutes`;
  }

  if (seconds < SECONDS_PER_DAY) {
    return `${(seconds / SECONDS_PER_HOUR).toFixed(1)} hours`;
  }

  if (seconds < SECONDS_PER_MONTH) {
    return `${(seconds / SECONDS_PER_DAY).toFixed(1)} days`;
  }

  if (seconds < SECONDS_PER_YEAR) {
    return `${(seconds / SECONDS_PER_MONTH).toFixed(1)} months`;
  }

  return `${(seconds / SECONDS_PER_YEAR).toFixed(1)} years`;
}

export function formatDuration(log10Seconds) {
  if (!Number.isFinite(log10Seconds)) {
    return 'Not feasible in this model';
  }

  if (log10Seconds < 0) {
    return '< 1 second';
  }

  if (log10Seconds < 14) {
    return formatDurationFromSeconds(Math.pow(10, log10Seconds));
  }

  const log10Years = log10Seconds - Math.log10(SECONDS_PER_YEAR);
  return `~10^${log10Years.toFixed(1)} years`;
}

export function getSafetyVerdict(log10Seconds, supported) {
  if (!supported) {
    return {
      label: 'Not applicable',
      tone: 'neutral',
      summary: 'This attack model does not line up with the selected algorithm or hardware.'
    };
  }

  if (!Number.isFinite(log10Seconds)) {
    return {
      label: 'Safe in this model',
      tone: 'good',
      summary: 'The chosen hardware cannot realistically mount the selected attack path.'
    };
  }

  if (log10Seconds < Math.log10(SECONDS_PER_DAY)) {
    return {
      label: 'Not safe',
      tone: 'critical',
      summary: 'The modeled attack completes in less than a day.'
    };
  }

  if (log10Seconds < Math.log10(SECONDS_PER_YEAR)) {
    return {
      label: 'High risk',
      tone: 'critical',
      summary: 'The modeled attack is feasible within a year on the chosen hardware.'
    };
  }

  if (log10Seconds < Math.log10(SECONDS_PER_YEAR * 1000)) {
    return {
      label: 'Moderate margin',
      tone: 'warn',
      summary: 'The model shows some resistance, but the long-term margin is not especially comfortable.'
    };
  }

  return {
    label: 'Strong margin',
    tone: 'good',
    summary: 'The modeled attack remains computationally expensive for the chosen hardware.'
  };
}

export function simulateAttack({
  algorithm,
  attackMethodId,
  hardwareState,
  secretEntropyBits = 40
}) {
  if (!algorithm) {
    return null;
  }

  const metrics = getEffectiveHardwareMetrics(hardwareState);
  const attackProfile = algorithm.attackProfiles?.[attackMethodId];

  if (!attackProfile) {
    const verdict = getSafetyVerdict(null, false);
    return {
      supported: false,
      verdict,
      durationLabel: verdict.label,
      hardwareMetrics: metrics,
      details:
        'This attack style is not a good model for the selected algorithm. Try a different attack method.'
    };
  }

  if ((attackMethodId === 'grover' || attackMethodId === 'shor') && metrics.type.id !== 'quantum') {
    const verdict = getSafetyVerdict(null, false);
    return {
      supported: false,
      verdict,
      durationLabel: 'Quantum hardware required',
      hardwareMetrics: metrics,
      details: 'The selected attack method requires a quantum computer profile.'
    };
  }

  let log10Seconds;
  let workFactorLabel;
  let details;

  if (attackMethodId === 'dictionary') {
    const guessesPerSecond = Math.max(metrics.classicalRate / attackProfile.guessPenalty, 0.000001);
    log10Seconds = log10AverageSearch(secretEntropyBits) - Math.log10(guessesPerSecond);
    workFactorLabel = `Average guesses: 2^${Math.max(secretEntropyBits - 1, 0).toFixed(0)}`;
    details = `The model assumes about ${secretEntropyBits} bits of human-secret entropy and about ${formatCompactNumber(
      guessesPerSecond
    )} guesses per second on the selected hardware.`;
  }

  if (attackMethodId === 'bruteforce') {
    const trialsPerSecond = Math.max(metrics.classicalRate, 1);
    log10Seconds = log10AverageSearch(attackProfile.bits) - Math.log10(trialsPerSecond);
    workFactorLabel = `Average search: 2^${Math.max(attackProfile.bits - 1, 0).toFixed(0)}`;
    details = `The model treats the break as generic exhaustive search at about ${formatCompactNumber(
      trialsPerSecond
    )} trials per second.`;
  }

  if (attackMethodId === 'grover') {
    const iterationsPerSecond = Math.max(metrics.quantumRate, 1);
    log10Seconds = log10AverageSearch(attackProfile.bits) - Math.log10(iterationsPerSecond);
    workFactorLabel = `Average quantum search: 2^${Math.max(attackProfile.bits - 1, 0).toFixed(0)}`;
    details = `The model treats the break as Grover-style search at about ${formatCompactNumber(
      iterationsPerSecond
    )} quantum iterations per second.`;
  }

  if (attackMethodId === 'shor') {
    const availableQubits = Math.max(hardwareState.qubits || 0, 0);
    if (availableQubits < attackProfile.requiredQubits) {
      const verdict = getSafetyVerdict(Number.POSITIVE_INFINITY, true);
      return {
        supported: true,
        verdict,
        durationLabel: 'Not feasible on selected quantum hardware',
        hardwareMetrics: metrics,
        workFactorLabel: `Needs about ${formatCompactNumber(attackProfile.requiredQubits)} logical qubits`,
        details: `The selected machine models ${formatCompactNumber(
          availableQubits
        )} qubits, which is below the ${formatCompactNumber(
          attackProfile.requiredQubits
        )} qubit threshold used in this simplified Shor estimate.`
      };
    }

    const quantumScale = Math.max(metrics.quantumRate / 8e6, 0.1);
    const hourEstimate =
      attackProfile.baseHours *
      Math.pow(attackProfile.requiredQubits / availableQubits, 1.25) /
      quantumScale;
    log10Seconds = Math.log10(Math.max(hourEstimate * SECONDS_PER_HOUR, 0.1));
    workFactorLabel = `Quantum threshold: about ${formatCompactNumber(attackProfile.requiredQubits)} logical qubits`;
    details = `The model assumes a fault-tolerant Shor-style attack and scales runtime by qubit count and quantum iteration throughput.`;
  }

  const verdict = getSafetyVerdict(log10Seconds, true);

  return {
    supported: true,
    verdict,
    log10Seconds,
    durationLabel: formatDuration(log10Seconds),
    workFactorLabel,
    details,
    hardwareMetrics: metrics
  };
}
