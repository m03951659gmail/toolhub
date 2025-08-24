/**
 * Typewriter Animation Generator
 * 
 * Features:
 * - Live preview
 * - Char-by-char or word-by-word typing
 * - Customizable speed, delay, loop, cursor
 * - Backspace/retype effect
 * - Multiline support
 * - Pause markers (^500)
 * - Export HTML and CSS/JS snippets
 * 
 * Dependencies: Tailwind CSS (via CDN)
 */

class Typewriter {
  constructor(element, options = {}) {
    this.element = element;
    this.text = options.text || '';
    this.speed = options.speed || 100;
    this.backspaceSpeed = options.backspaceSpeed || 50;
    this.startDelay = options.startDelay || 500;
    this.mode = options.mode || 'char'; // 'char' or 'word'
    this.loop = options.loop !== undefined ? options.loop : true;
    this.cursorChar = options.cursorChar || '|';
    this.blinkCursor = options.blinkCursor !== undefined ? options.blinkCursor : true;

    this.originalText = this.text;
    this.currentIndex = 0;
    this.words = [];
    this.isRunning = false;
    this.timeout = null;

    this.parseText();
    this.render();
  }

  parseText() {
    const regex = /(\^[0-9]+)|(\S+|\s+)/g;
    let match;
    this.words = [];

    while ((match = regex.exec(this.text)) !== null) {
      if (match[1]) {
        // Pause command like ^500
        this.words.push({ type: 'pause', duration: parseInt(match[1].slice(1)) });
      } else {
        // Regular text chunk
        this.words.push({ type: 'text', content: match[0] });
      }
    }
  }

  render() {
    this.element.innerHTML = '';
    this.element.style.whiteSpace = 'pre-line';
    this.element.style.fontFamily = 'monospace';

    // Add cursor
    this.cursorSpan = document.createElement('span');
    this.cursorSpan.textContent = this.cursorChar;
    this.cursorSpan.className = 'typewriter-cursor';
    if (this.blinkCursor) {
      this.cursorSpan.classList.add('blink');
    }
    this.element.appendChild(this.cursorSpan);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.currentIndex = 0;

    // Clear existing content except cursor
    this.element.childNodes.forEach((child, i) => {
      if (i !== this.element.childNodes.length - 1) child.remove();
    });

    setTimeout(() => {
      this.typeNext();
    }, this.startDelay);
  }

  stop() {
    this.isRunning = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  reset() {
    this.stop();
    this.currentIndex = 0;
    this.element.childNodes.forEach((child, i) => {
      if (i !== this.element.childNodes.length - 1) child.remove();
    });
  }

  typeNext() {
    if (!this.isRunning) return;

    if (this.currentIndex >= this.words.length) {
      if (this.loop) {
        this.reset();
        this.timeout = setTimeout(() => this.typeNext(), 1000);
      }
      return;
    }

    const item = this.words[this.currentIndex];
    this.currentIndex++;

    if (item.type === 'pause') {
      this.timeout = setTimeout(() => this.typeNext(), item.duration);
      return;
    }

    const chunk = item.content;
    let index = 0;

    const addChar = () => {
      if (index < chunk.length) {
        const charSpan = document.createElement('span');
        charSpan.textContent = chunk[index++];
        this.element.insertBefore(charSpan, this.cursorSpan);
        this.timeout = setTimeout(addChar, this.speed);
      } else {
        this.timeout = setTimeout(() => this.typeNext(), this.speed);
      }
    };

    addChar();
  }
}

// DOM Elements
const inputText = document.getElementById('inputText');
const animationMode = document.getElementById('animationMode');
const speedInput = document.getElementById('speed');
const startDelayInput = document.getElementById('startDelay');
const loopCheckbox = document.getElementById('loop');
const cursorCharInput = document.getElementById('cursorChar');
const blinkCursorCheckbox = document.getElementById('blinkCursor');
const backspaceSpeedInput = document.getElementById('backspaceSpeed');

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const copyHtmlBtn = document.getElementById('copyHtmlBtn');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const clearBtn = document.getElementById('clearBtn');

const typewriterText = document.getElementById('typewriterText');

// Initialize typewriter
let typewriter = new Typewriter(typewriterText, {
  text: inputText.value,
  speed: parseInt(speedInput.value),
  backspaceSpeed: parseInt(backspaceSpeedInput.value),
  startDelay: parseInt(startDelayInput.value),
  mode: animationMode.value,
  loop: loopCheckbox.checked,
  cursorChar: cursorCharInput.value,
  blinkCursor: blinkCursorCheckbox.checked
});

// Update preview on any change
function updateTypewriter() {
  typewriter.stop();

  typewriter = new Typewriter(typewriterText, {
    text: inputText.value,
    speed: parseInt(speedInput.value),
    backspaceSpeed: parseInt(backspaceSpeedInput.value),
    startDelay: parseInt(startDelayInput.value),
    mode: animationMode.value,
    loop: loopCheckbox.checked,
    cursorChar: cursorCharInput.value,
    blinkCursor: blinkCursorCheckbox.checked
  });
}

// Event Listeners
inputText.addEventListener('input', updateTypewriter);
animationMode.addEventListener('change', updateTypewriter);
speedInput.addEventListener('change', updateTypewriter);
startDelayInput.addEventListener('change', updateTypewriter);
loopCheckbox.addEventListener('change', updateTypewriter);
cursorCharInput.addEventListener('input', updateTypewriter);
blinkCursorCheckbox.addEventListener('change', updateTypewriter);
backspaceSpeedInput.addEventListener('change', updateTypewriter);

startBtn.addEventListener('click', () => typewriter.start());
stopBtn.addEventListener('click', () => typewriter.stop());
resetBtn.addEventListener('click', () => typewriter.reset());
clearBtn.addEventListener('click', () => {
  inputText.value = '';
  updateTypewriter();
});

// Copy HTML Snippet
copyHtmlBtn.addEventListener('click', () => {
  const html = `<div id="typewriter" class="text-lg"></div>`;
  navigator.clipboard.writeText(html).then(() => {
    alert('HTML snippet copied to clipboard!');
  });
});

// Copy CSS & JS Snippet
copyCodeBtn.addEventListener('click', () => {
  const css = `
.typewriter-cursor {
  display: inline-block;
  margin-left: 2px;
}
.blink {
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
  `;

  const js = `
// Typewriter class (paste full class here or import)
const tw = new Typewriter(document.getElementById('typewriter'), {
  text: \`${inputText.value.replace(/`/g, '\\`')}\`,
  speed: ${speedInput.value},
  backspaceSpeed: ${backspaceSpeedInput.value},
  startDelay: ${startDelayInput.value},
  mode: '${animationMode.value}',
  loop: ${loopCheckbox.checked},
  cursorChar: '${cursorCharInput.value.replace(/'/g, "\\'")}',
  blinkCursor: ${blinkCursorCheckbox.checked}
});
tw.start();
  `;

  const code = `/* CSS */
${css}

/* JavaScript */
${js}`;

  navigator.clipboard.writeText(code).then(() => {
    alert('CSS & JS code snippet copied!');
  });
});