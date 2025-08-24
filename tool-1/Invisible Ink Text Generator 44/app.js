/**
 * Invisible Ink Text Generator
 * Pure Vanilla JS – No frameworks
 */

// === Utilities ===
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function updateCount(el, counterId) {
  const text = el.value;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  document.getElementById(counterId).textContent = `${chars} characters, ${words} words`;
}

function decodeZW(text) {
  const ZW_MAP = { '​': '0', '‍': '1' }; // U+200B, U+200D
  let binStr = '';
  for (const char of text) {
    if (char in ZW_MAP) binStr += ZW_MAP[char];
  }
  let result = '';
  for (let i = 0; i < binStr.length; i += 8) {
    const byte = binStr.slice(i, i + 8);
    if (byte.length === 8) {
      result += String.fromCharCode(parseInt(byte, 2));
    }
  }
  return result;
}

function stripInvisibles(text) {
  return text.replace(/[\u200B-\u200D\u2060]/g, '');
}

function countZeroWidth(text) {
  return (text.match(/[\u200B-\u200D\u2060]/g) || []).length;
}

// === Encoder ===
function encodeToZeroWidth(str) {
  let result = '';
  for (const char of str) {
    const bin = char.charCodeAt(0).toString(2).padStart(8, '0');
    for (const bit of bin) {
      result += bit === '0' ? '\u200B' : '\u200D'; // ZWSP or ZWJ
    }
  }
  return result;
}

// === DOM Elements ===
const inputEl = document.getElementById('input-text');
const outputEl = document.getElementById('output-text');
const previewEl = document.getElementById('preview');
const charCountEl = document.getElementById('char-count');
const counterEl = document.getElementById('counter');
const modeEls = document.querySelectorAll('input[name="mode"]');
const themeToggle = document.getElementById('theme-toggle');
const faqToggle = document.getElementById('faq-toggle');
const faqSection = document.getElementById('faq');
const trySampleBtn = document.getElementById('try-sample');

// Buttons
const generateBtn = document.getElementById('generate');
const revealBtn = document.getElementById('reveal');
const copyBtn = document.getElementById('copy');
const clearBtn = document.getElementById('clear');
const downloadBtn = document.getElementById('download');
const stripBtn = document.getElementById('strip');

// === State ===
let isRevealed = false;

// === Event Handlers ===
inputEl.addEventListener('input', () => updateCount(inputEl, 'char-count'));

generateBtn.addEventListener('click', () => {
  const input = inputEl.value;
  if (!input) return;

  let output = input;
  let previewContent = '';
  let zeroWidthCount = 0;

  const mode = document.querySelector('input[name="mode"]:checked').value;

  if (mode === 'zero-width') {
    output = encodeToZeroWidth(input);
    previewContent = ''; // invisible
    zeroWidthCount = output.length;
  } else if (mode === 'css-hidden') {
    output = input;
    previewContent = input;
    previewEl.classList.add('css-hidden');
  } else if (mode === 'combined') {
    output = encodeToZeroWidth(input);
    previewContent = input;
    previewEl.classList.add('css-hidden');
    zeroWidthCount = output.length;
  }

  outputEl.value = output;
  if (mode !== 'zero-width') {
    previewEl.textContent = previewContent;
    previewEl.classList.toggle('blank', !isRevealed);
    previewEl.classList.toggle('revealed', isRevealed);
  } else {
    previewEl.textContent = '';
    previewEl.className = 'preview blank';
  }

  counterEl.textContent = `Zero-width chars: ${zeroWidthCount} | Payload size: ${new Blob([output]).size} B`;

  // Enable buttons
  [revealBtn, copyBtn, downloadBtn].forEach(b => b.disabled = false);
  revealBtn.textContent = isRevealed ? 'Hide' : 'Reveal';
});

revealBtn.addEventListener('click', () => {
  isRevealed = !isRevealed;
  const mode = document.querySelector('input[name="mode"]:checked').value;
  if (mode === 'zero-width') {
    previewEl.textContent = decodeZW(outputEl.value) || '(No valid hidden text)';
  } else {
    previewEl.textContent = outputEl.value;
  }
  previewEl.classList.toggle('blank', !isRevealed);
  previewEl.classList.toggle('revealed', isRevealed);
  revealBtn.textContent = isRevealed ? 'Hide' : 'Reveal';
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(outputEl.value);
    showToast('Copied!');
  } catch (err) {
    showToast('Copy failed. Use Ctrl+C.');
  }
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([outputEl.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), {
    href: url,
    download: 'invisible-ink.txt'
  });
  a.click();
  URL.revokeObjectURL(url);
  showToast('Downloaded!');
});

clearBtn.addEventListener('click', () => {
  inputEl.value = '';
  outputEl.value = '';
  previewEl.textContent = '';
  previewEl.className = 'preview blank';
  counterEl.textContent = 'Zero-width chars: 0 | Payload size: 0 B';
  [revealBtn, copyBtn, downloadBtn].forEach(b => b.disabled = true);
  revealBtn.textContent = 'Reveal';
  isRevealed = false;
  updateCount(inputEl, 'char-count');
  showToast('Cleared!');
});

stripBtn.addEventListener('click', () => {
  const cleaned = stripInvisibles(inputEl.value);
  inputEl.value = cleaned;
  updateCount(inputEl, 'char-count');
  showToast('Invisibles stripped!');
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');
  document.body.className = isDark ? 'dark-theme' : 'light-theme';
  themeToggle.textContent = isDark
    ? 'Switch to Light Theme'
    : 'Switch to Dark Theme';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// FAQ Toggle
faqToggle.addEventListener('click', () => {
  const expanded = faqToggle.getAttribute('aria-expanded') === 'true';
  faqToggle.setAttribute('aria-expanded', String(!expanded));
  faqSection.hidden = expanded;
});

// Try Sample
trySampleBtn.addEventListener('click', () => {
  inputEl.value = "Hello, this is secret!";
  updateCount(inputEl, 'char-count');
  generateBtn.click();
  faqSection.hidden = true;
  faqToggle.setAttribute('aria-expanded', 'false');
});

// === On Load ===
(function init() {
  // Restore theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  if (isDark) {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = 'Switch to Light Theme';
  }

  // Initial counts
  updateCount(inputEl, 'char-count');

  // Bind keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      clearBtn.click();
    }
  });

  // Auto-focus input
  inputEl.focus();
})();

// === Test Suite (in comments) ===
/*
console.log('🧪 Running encode/decode test...');
const testStr = "Hi";
const encoded = encodeToZeroWidth(testStr);
const decoded = decodeZW(encoded);
console.assert(decoded === testStr, `Expected "${testStr}", got "${decoded}"`);
console.log(decoded === testStr ? '✅ Test passed' : '❌ Test failed');
*/