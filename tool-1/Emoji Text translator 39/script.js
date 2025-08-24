// script.js

class TrieNode {
  constructor() {
    this.children = {};
    this.emoji = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(phrase, emoji) {
    let node = this.root;
    const words = phrase.toLowerCase().split(' ');
    for (const word of words) {
      if (!node.children[word]) node.children[word] = new TrieNode();
      node = node.children[word];
    }
    node.emoji = emoji;
  }

  searchLongestMatch(words, start) {
    let node = this.root;
    let lastMatch = null;
    let lastMatchIndex = start;

    for (let i = start; i < words.length; i++) {
      const word = words[i].toLowerCase();
      if (!node.children[word]) break;
      node = node.children[word];
      if (node.emoji !== null) {
        lastMatch = node.emoji;
        lastMatchIndex = i;
      }
    }

    return { emoji: lastMatch, endIndex: lastMatchIndex };
  }
}

// DOM Elements
const inputEl = document.getElementById('input-text');
const outputEl = document.getElementById('output-text');
const suggestionsEl = document.getElementById('suggestions');
const languageSelect = document.getElementById('language-select');
const modeSelect = document.getElementById('mode-select');
const preservePunctuation = document.getElementById('preserve-punctuation');
const copyBtn = document.getElementById('copy-output');
const downloadBtn = document.getElementById('download-output');
const editMappingsBtn = document.getElementById('edit-mappings');
const modal = document.getElementById('mapping-modal');
const closeModal = document.getElementById('close-modal');
const customPhrase = document.getElementById('custom-phrase');
const customEmoji = document.getElementById('custom-emoji');
const addCustomBtn = document.getElementById('add-custom');
const customList = document.getElementById('custom-list');
const exportMappings = document.getElementById('export-mappings');
const importMappings = document.getElementById('import-mappings');
const clearCustom = document.getElementById('clear-custom');
const favoritesEl = document.getElementById('favorites');
const recentsEl = document.getElementById('recents');
const themeToggle = document.getElementById('theme-toggle');

// State
let currentLang = 'en';
let currentMode = 'text-to-emoji';
let trie = new Trie();
let reverseMap = new Map(); // emoji → text
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let recents = JSON.parse(localStorage.getItem('recents')) || [];
let customMappings = JSON.parse(localStorage.getItem('customMappings')) || {};

// XSS Escape
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Debounce
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Load Data
function loadData() {
  Object.entries(EMOJI_DATA[currentLang]).forEach(([phrase, emoji]) => {
    trie.insert(phrase, emoji);
    reverseMap.set(emoji, phrase);
  });

  Object.entries(customMappings).forEach(([phrase, emoji]) => {
    trie.insert(phrase, emoji);
    reverseMap.set(emoji, phrase);
  });
}

// Translate
function translate() {
  const text = inputEl.value;
  if (!text.trim()) {
    outputEl.textContent = '';
    return;
  }

  if (currentMode === 'text-to-emoji') {
    const words = text.split(/(\s+)/);
    let result = '';
    let i = 0;

    while (i < words.length) {
      const word = words[i];
      if (!word.trim() || /^\s+$/.test(word)) {
        result += preservePunctuation.checked ? word : '';
        i++;
        continue;
      }

      const match = trie.searchLongestMatch(words, i);
      if (match.emoji) {
        result += match.emoji;
        for (let j = i; j <= match.endIndex; j++) {
          if (j > i) recents.unshift(words[j].trim());
        }
        i = match.endIndex + 1;
      } else {
        result += preservePunctuation.checked ? word : '';
        i++;
      }
    }

    outputEl.innerHTML = escapeHtml(result).replace(/\n/g, '<br>');
  } else {
    // Emoji → Text
    let result = '';
    for (let char of text) {
      if (reverseMap.has(char)) {
        result += reverseMap.get(char) + ' ';
        recents.unshift(reverseMap.get(char));
      } else {
        result += preservePunctuation.checked ? char : '';
      }
    }
    outputEl.textContent = result.trim();
  }

  saveRecents();
  renderRecents();
}

// Suggestions
function showSuggestions(prefix) {
  suggestionsEl.classList.add('hidden');
  if (!prefix || currentMode !== 'text-to-emoji') return;

  const words = prefix.toLowerCase().split(' ');
  let node = trie.root;
  for (const word of words) {
    if (!node.children[word]) return;
    node = node.children[word];
  }

  const suggestions = [];
  collectSuggestions(node, words.join(' '), suggestions);
  suggestions.sort();

  if (suggestions.length > 0) {
    suggestionsEl.innerHTML = '';
    suggestions.slice(0, 10).forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      li.addEventListener('click', () => {
        insertAtCursor(s);
        suggestionsEl.classList.add('hidden');
      });
      suggestionsEl.appendChild(li);
    });
    suggestionsEl.classList.remove('hidden');
  }
}

function collectSuggestions(node, prefix, list) {
  if (node.emoji) list.push(prefix);
  for (const [word, child] of Object.entries(node.children)) {
    collectSuggestions(child, prefix + ' ' + word, list);
  }
}

function insertAtCursor(text) {
  const start = inputEl.selectionStart;
  const end = inputEl.selectionEnd;
  inputEl.value = inputEl.value.substring(0, start) + text + inputEl.value.substring(end);
  inputEl.selectionStart = inputEl.selectionEnd = start + text.length;
  inputEl.focus();
  translate();
}

// Event Listeners
inputEl.addEventListener('input', debounce(() => {
  translate();
  const prefix = inputEl.value.substring(0, inputEl.selectionStart).split(/\s+/).pop();
  showSuggestions(prefix);
}, 300));

inputEl.addEventListener('keydown', (e) => {
  const items = suggestionsEl.querySelectorAll('li');
  let index = Array.from(items).findIndex(el => el.classList.contains('selected'));

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (index < items.length - 1) {
      if (index >= 0) items[index].classList.remove('selected');
      items[index + 1].classList.add('selected');
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (index > 0) {
      items[index].classList.remove('selected');
      items[index - 1].classList.add('selected');
    }
  } else if (e.key === 'Enter' && index >= 0) {
    e.preventDefault();
    items[index].click();
  } else if (e.key === 'Escape') {
    suggestionsEl.classList.add('hidden');
  }
});

languageSelect.addEventListener('change', () => {
  currentLang = languageSelect.value;
  trie = new Trie();
  reverseMap = new Map();
  loadData();
  translate();
});

modeSelect.addEventListener('change', () => {
  currentMode = modeSelect.value;
  translate();
});

preservePunctuation.addEventListener('change', translate);

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputEl.textContent).then(() => {
    alert('Copied to clipboard!');
  });
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([outputEl.textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'emoji-output.txt';
  a.click();
});

editMappingsBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  setTimeout(() => modal.querySelector('.modal-show').classList.add('modal-show'), 10);
  renderCustomList();
});

closeModal.addEventListener('click', () => {
  modal.querySelector('.modal-show').classList.remove('modal-show');
  setTimeout(() => modal.classList.add('hidden'), 300);
});

addCustomBtn.addEventListener('click', () => {
  const phrase = customPhrase.value.trim();
  const emoji = customEmoji.value.trim();
  if (phrase && emoji) {
    customMappings[phrase] = emoji;
    localStorage.setItem('customMappings', JSON.stringify(customMappings));
    trie.insert(phrase, emoji);
    reverseMap.set(emoji, phrase);
    customPhrase.value = '';
    customEmoji.value = '';
    renderCustomList();
    translate();
  }
});

function renderCustomList() {
  customList.innerHTML = '';
  Object.entries(customMappings).forEach(([phrase, emoji]) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between p-2 border-b';
    li.innerHTML = `<span>${escapeHtml(phrase)} → ${emoji}</span>
                    <button data-phrase="${escapeHtml(phrase)}" class="text-red-500 text-sm">Remove</button>`;
    customList.appendChild(li);
  });

  customList.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const phrase = e.target.dataset.phrase;
      delete customMappings[phrase];
      localStorage.setItem('customMappings', JSON.stringify(customMappings));
      // Rebuild trie
      trie = new Trie();
      reverseMap = new Map();
      loadData();
      renderCustomList();
      translate();
    });
  });
}

exportMappings.addEventListener('click', () => {
  const dataStr = JSON.stringify(customMappings, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'custom-emoji-mappings.json';
  a.click();
});

importMappings.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const imported = JSON.parse(ev.target.result);
      Object.assign(customMappings, imported);
      localStorage.setItem('customMappings', JSON.stringify(customMappings));
      trie = new Trie();
      reverseMap = new Map();
      loadData();
      renderCustomList();
      translate();
      alert('Mappings imported!');
    } catch (err) {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
});

clearCustom.addEventListener('click', () => {
  if (confirm('Clear all custom mappings?')) {
    customMappings = {};
    localStorage.removeItem('customMappings');
    trie = new Trie();
    reverseMap = new Map();
    loadData();
    renderCustomList();
    translate();
  }
});

// Favorites & Recents
function toggleFavorite(emoji) {
  const index = favorites.indexOf(emoji);
  if (index === -1) {
    favorites.push(emoji);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
}

function saveRecents() {
  recents = [...new Set(recents)].slice(0, 10);
  localStorage.setItem('recents', JSON.stringify(recents));
}

function renderFavorites() {
  favoritesEl.innerHTML = '';
  favorites.forEach(emoji => {
    const span = document.createElement('span');
    span.className = 'text-2xl cursor-pointer hover:scale-125 transition';
    span.textContent = emoji;
    span.addEventListener('click', () => insertAtCursor(emoji));
    span.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      toggleFavorite(emoji);
    });
    favoritesEl.appendChild(span);
  });
}

function renderRecents() {
  recentsEl.innerHTML = '';
  [...new Set(recents)].slice(0, 10).forEach(phrase => {
    const span = document.createElement('span');
    span.className = 'text-sm bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded cursor-pointer';
    span.textContent = phrase;
    span.addEventListener('click', () => insertAtCursor(phrase));
    recentsEl.appendChild(span);
  });
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  themeToggle.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
});

// Initialize
window.onload = () => {
  loadData();
  renderFavorites();
  renderRecents();
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
};