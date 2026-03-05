import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KANADOJO_ROOT = path.resolve(__dirname, '..');
const MONKEYTYPE_SOUND_ROOT = path.resolve(KANADOJO_ROOT, '..', 'monkeytype', 'frontend', 'static', 'sound');
const TARGET_ROOT = path.join(KANADOJO_ROOT, 'public', 'sounds', 'monkeytype-pack');
const MANIFEST_PATH = path.join(TARGET_ROOT, 'manifest.json');

const fileBackedMap = [
  { id: '1', source: 'click1', slug: 'click', label: 'click' },
  { id: '2', source: 'click2', slug: 'beep', label: 'beep' },
  { id: '3', source: 'click3', slug: 'pop', label: 'pop' },
  { id: '4', source: 'click4', slug: 'nk-creams', label: 'nk creams' },
  { id: '5', source: 'click5', slug: 'typewriter', label: 'typewriter' },
  { id: '6', source: 'click6', slug: 'osu', label: 'osu' },
  { id: '7', source: 'click7', slug: 'hitmarker', label: 'hitmarker' },
  { id: '14', source: 'click14', slug: 'fist-fight', label: 'fist fight' },
  { id: '15', source: 'click15', slug: 'rubber-keys', label: 'rubber keys' },
  { id: '16', source: 'click16', slug: 'fart', label: 'fart' },
];

const syntheticMap = [
  { id: '8', slug: 'sine', label: 'sine' },
  { id: '9', slug: 'sawtooth', label: 'sawtooth' },
  { id: '10', slug: 'square', label: 'square' },
  { id: '11', slug: 'triangle', label: 'triangle' },
  { id: '12', slug: 'pentatonic', label: 'pentatonic' },
  { id: '13', slug: 'wholetone', label: 'wholetone' },
];

const sampleRate = 44100;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function removeDirIfExists(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function writeWavMono16(filePath, samples, sampleRateHz = sampleRate) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRateHz * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = samples.length * 2;

  const buffer = Buffer.alloc(44 + dataSize);
  let offset = 0;

  buffer.write('RIFF', offset); offset += 4;
  buffer.writeUInt32LE(36 + dataSize, offset); offset += 4;
  buffer.write('WAVE', offset); offset += 4;

  buffer.write('fmt ', offset); offset += 4;
  buffer.writeUInt32LE(16, offset); offset += 4;
  buffer.writeUInt16LE(1, offset); offset += 2;
  buffer.writeUInt16LE(numChannels, offset); offset += 2;
  buffer.writeUInt32LE(sampleRateHz, offset); offset += 4;
  buffer.writeUInt32LE(byteRate, offset); offset += 4;
  buffer.writeUInt16LE(blockAlign, offset); offset += 2;
  buffer.writeUInt16LE(bitsPerSample, offset); offset += 2;

  buffer.write('data', offset); offset += 4;
  buffer.writeUInt32LE(dataSize, offset); offset += 4;

  for (let i = 0; i < samples.length; i++) {
    const v = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(v * 32767), offset);
    offset += 2;
  }

  fs.writeFileSync(filePath, buffer);
}

function envelope(t, duration) {
  const attack = 0.003;
  const release = Math.max(0.02, duration * 0.4);
  if (t < attack) return t / attack;
  if (t > duration - release) return Math.max(0, (duration - t) / release);
  return 1;
}

function waveformSample(type, phase) {
  const twoPi = Math.PI * 2;
  const wrapped = ((phase % twoPi) + twoPi) % twoPi;

  if (type === 'sine') return Math.sin(wrapped);
  if (type === 'sawtooth') return (wrapped / Math.PI) - 1;
  if (type === 'square') return wrapped < Math.PI ? 1 : -1;
  if (type === 'triangle') return 1 - 4 * Math.abs(Math.round(wrapped / (2 * Math.PI)) - wrapped / (2 * Math.PI));
  return Math.sin(wrapped);
}

function makeTone({ freq, durationSec, type, amp = 0.5 }) {
  const total = Math.floor(sampleRate * durationSec);
  const out = new Float32Array(total);
  const inc = (2 * Math.PI * freq) / sampleRate;
  let phase = 0;
  for (let i = 0; i < total; i++) {
    const t = i / sampleRate;
    out[i] = waveformSample(type, phase) * envelope(t, durationSec) * amp;
    phase += inc;
  }
  return out;
}

function makeScaleClip({ freqs, noteDuration = 0.08, gap = 0.008, type = 'sine' }) {
  const clips = [];
  freqs.forEach(freq => {
    clips.push(makeTone({ freq, durationSec: noteDuration, type, amp: 0.42 }));
    clips.push(new Float32Array(Math.floor(sampleRate * gap)));
  });
  const total = clips.reduce((acc, arr) => acc + arr.length, 0);
  const out = new Float32Array(total);
  let offset = 0;
  clips.forEach(arr => {
    out.set(arr, offset);
    offset += arr.length;
  });
  return out;
}

function copyFileBacked() {
  const entries = [];

  for (const map of fileBackedMap) {
    const sourceDir = path.join(MONKEYTYPE_SOUND_ROOT, map.source);
    const targetDir = path.join(TARGET_ROOT, map.slug);
    ensureDir(targetDir);

    const files = fs
      .readdirSync(sourceDir)
      .filter(name => name.toLowerCase().endsWith('.wav'))
      .sort((a, b) => a.localeCompare(b, 'en'));

    files.forEach(name => {
      fs.copyFileSync(path.join(sourceDir, name), path.join(targetDir, name));
    });

    entries.push({
      id: map.id,
      label: map.label,
      slug: map.slug,
      sourceType: 'file',
      monkeytypeSourceFolder: map.source,
      variants: files.map(name => name.replace(/\.wav$/i, '')),
    });
  }

  return entries;
}

function generateSynthetic() {
  const entries = [];

  const simpleFreqs = [220, 246.94, 261.63, 293.66, 329.63, 392, 440, 493.88, 523.25, 587.33];
  const pentatonic = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 659.26, 783.99];
  const wholetone = [261.63, 293.66, 329.63, 369.99, 415.3, 466.16, 523.25, 587.33];

  for (const map of syntheticMap) {
    const targetDir = path.join(TARGET_ROOT, map.slug);
    ensureDir(targetDir);

    const variants = [];

    if (['sine', 'sawtooth', 'square', 'triangle'].includes(map.slug)) {
      for (let i = 0; i < simpleFreqs.length; i++) {
        const freq = simpleFreqs[i];
        const duration = 0.045 + (i % 3) * 0.008;
        const samples = makeTone({ freq, durationSec: duration, type: map.slug, amp: 0.48 });
        const fileName = `${map.slug}_${String(i + 1).padStart(2, '0')}.wav`;
        writeWavMono16(path.join(targetDir, fileName), samples);
        variants.push(fileName.replace(/\.wav$/i, ''));
      }
    } else {
      const scale = map.slug === 'pentatonic' ? pentatonic : wholetone;
      for (let i = 0; i < 8; i++) {
        const rotated = scale.slice(i).concat(scale.slice(0, i));
        const samples = makeScaleClip({ freqs: rotated.slice(0, 6), noteDuration: 0.06, gap: 0.006, type: 'sine' });
        const fileName = `${map.slug}_${String(i + 1).padStart(2, '0')}.wav`;
        writeWavMono16(path.join(targetDir, fileName), samples);
        variants.push(fileName.replace(/\.wav$/i, ''));
      }
    }

    entries.push({
      id: map.id,
      label: map.label,
      slug: map.slug,
      sourceType: 'synthetic-generated',
      monkeytypeSourceFolder: null,
      variants,
    });
  }

  return entries;
}

function main() {
  if (!fs.existsSync(MONKEYTYPE_SOUND_ROOT)) {
    throw new Error(`Monkeytype sound directory not found: ${MONKEYTYPE_SOUND_ROOT}`);
  }

  removeDirIfExists(TARGET_ROOT);
  ensureDir(TARGET_ROOT);

  const fileBacked = copyFileBacked();
  const synthetic = generateSynthetic();

  const order = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  const all = [...fileBacked, ...synthetic].sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: {
      monkeytypeSoundRoot: MONKEYTYPE_SOUND_ROOT,
      notes: 'Names follow Monkeytype click sound labels.',
    },
    sounds: all,
  };

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const summary = all.map(s => `${s.id.padStart(2, '0')} ${s.label}: ${s.variants.length} variants (${s.sourceType})`);
  console.warn('Created monkeytype sound pack at:', TARGET_ROOT);
  summary.forEach(line => console.warn(line));
}

main();
