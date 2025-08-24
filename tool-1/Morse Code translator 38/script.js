// script.js

// -----------------------------------------------------------------------------
// 1. Morse Code Dictionary and Mappings
// -----------------------------------------------------------------------------
const MORSE_CODE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....',
    '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', '/': '-..-.', '-': '-....-', '(': '-.--.', ')': '-.--.-',
    '@': '.--.-.', '"': '.-..-.',
    'SOS': '...---...', // Prosign for distress
    'AR': '.-.-.', // End of message
    'SK': '...-.-', // End of transmission
    'BT': '-...-', // Break (between sentences)
    'CT': '-.-.-', // Start of message
    'KN': '-.-.-.', // Invitation to transmit (specific station)
    'VE': '...-.' // Understood
    // Note: Other prosigns can be added as needed.
};

// Create a reverse map for Morse to Text translation dynamically
const MORSE_CODE_REVERSE_MAP = {};
for (const char in MORSE_CODE_MAP) {
    MORSE_CODE_REVERSE_MAP[MORSE_CODE_MAP[char]] = char;
}

// -----------------------------------------------------------------------------
// 2. DOM Elements
// -----------------------------------------------------------------------------
const inputTextarea = document.getElementById('inputText');
const outputTextarea = document.getElementById('outputText');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const fileUploadInput = document.getElementById('fileUpload');
const downloadResultBtn = document.getElementById('downloadResultBtn');

const wpmSlider = document.getElementById('wpmSlider');
const wpmValueSpan = document.getElementById('wpmValue');
const farnsworthSlider = document.getElementById('farnsworthSlider');
const farnsworthValueSpan = document.getElementById('farnsworthValue');
const frequencySlider = document.getElementById('frequencySlider');
const frequencyValueSpan = document.getElementById('frequencyValue');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValueSpan = document.getElementById('volumeValue');

const playAudioBtn = document.getElementById('playAudioBtn');
const pauseAudioBtn = document.getElementById('pauseAudioBtn');
const stopAudioBtn = document.getElementById('stopAudioBtn');
const downloadWavBtn = document.getElementById('downloadWavBtn');

// -----------------------------------------------------------------------------
// 3. Audio State Variables
// -----------------------------------------------------------------------------
let audioContext = null;
let oscillator = null;
let gainNode = null;
let audioBufferSource = null; // For playing the full WAV buffer
let audioRecording = []; // Stores audio samples for WAV download
let audioIsPlaying = false;
let audioIsPaused = false;
let currentMorseIndex = 0; // Tracks progress during playback
let currentMorseSequence = []; // Stores the sequence of morse characters to play

// -----------------------------------------------------------------------------
// 4. Utility Functions
// -----------------------------------------------------------------------------

/**
 * Initializes the Web Audio API context.
 */
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = parseFloat(volumeSlider.value); // Set initial volume
    }
}

/**
 * Auto-detects if the input text is likely Morse code or plain text.
 * @param {string} text - The input string.
 * @returns {boolean} - True if likely Morse, false if likely plain text.
 */
function autoDetectInput(text) {
    // Trim whitespace and check for empty string
    const trimmedText = text.trim();
    if (trimmedText === '') {
        return false; // Default to text input mode if empty
    }

    // Count occurrences of Morse-like characters (dots, dashes, spaces)
    const morseCharCount = (trimmedText.match(/[\.\-\s]/g) || []).length;
    // Count occurrences of alphanumeric characters
    const alphaNumCharCount = (trimmedText.match(/[a-zA-Z0-9]/g) || []).length;

    // A simple heuristic: if more than 80% of characters are morse-like
    // and there are almost no alphanumeric characters, it's probably Morse.
    // Also, if it contains ' ' or '/' it suggests Morse.
    const isLikelyMorse = (morseCharCount / trimmedText.length > 0.8) && alphaNumCharCount === 0;

    return isLikelyMorse;
}

/**
 * Updates the translation based on input and auto-detection.
 */
function updateTranslation() {
    const inputText = inputTextarea.value.trim();
    const isMorseInput = autoDetectInput(inputText);
    let translatedText = '';
    let invalidCharacters = [];

    if (isMorseInput) {
        // Morse to Text
        const { translated, invalid } = morseToText(inputText);
        translatedText = translated;
        invalidCharacters = invalid;
    } else {
        // Text to Morse
        const { translated, invalid } = textToMorse(inputText);
        translatedText = translated;
        invalidCharacters = invalid;
    }

    outputTextarea.value = translatedText;

    // Highlight invalid symbols
    if (invalidCharacters.length > 0) {
        inputTextarea.classList.add('invalid-input');
        // Optionally, show a tooltip or message about invalid characters
        // console.warn('Invalid characters found:', invalidCharacters);
    } else {
        inputTextarea.classList.remove('invalid-input');
    }
}

/**
 * Converts plain text to Morse code.
 * @param {string} text - The input plain text.
 * @returns {{translated: string, invalid: string[]}} - Translated Morse and a list of invalid characters.
 */
function textToMorse(text) {
    let morse = [];
    let invalidChars = new Set();
    const words = text.toUpperCase().split(' ');

    words.forEach((word, wordIndex) => {
        const characters = word.split('');
        characters.forEach((char, charIndex) => {
            // Check for known prosigns first
            let isProsign = false;
            for (const prosign in MORSE_CODE_MAP) {
                if (word.startsWith(prosign) && prosign.length > 1) { // Check for multi-char prosigns
                    morse.push(MORSE_CODE_MAP[prosign]);
                    isProsign = true;
                    break;
                }
            }
            if (isProsign && charIndex === 0) { // If it was a prosign, skip the first char of the word
                // This logic needs refinement for proper prosign parsing.
                // For simplicity, we'll treat them as regular words for now if not explicitly separated.
                // A better approach would be to parse the input into tokens (words, prosigns).
                // For this example, we'll just check if the whole word is a known prosign.
                if (MORSE_CODE_MAP[word]) {
                    morse.push(MORSE_CODE_MAP[word]);
                    return; // Skip individual character processing for this word
                }
            }

            if (MORSE_CODE_MAP[char]) {
                morse.push(MORSE_CODE_MAP[char]);
            } else if (char.match(/\s/)) {
                // Ignore extra spaces as they are handled by word splitting
            }
            else {
                invalidChars.add(char);
            }
            // Add space between characters, but not after the last character of a word
            if (charIndex < characters.length - 1) {
                morse.push(' '); // Character space (1 dit)
            }
        });
        // Add word space (7 dits) between words, but not after the last word
        if (wordIndex < words.length - 1) {
            morse.push('   '); // Represents word space for display
        }
    });
    return { translated: morse.join(' ').replace(/\s+/g, ' ').trim(), invalid: Array.from(invalidChars) }; // Collapse multiple spaces
}

/**
 * Converts Morse code to plain text.
 * @param {string} morse - The input Morse code string.
 * @returns {{translated: string, invalid: string[]}} - Translated text and a list of invalid Morse sequences.
 */
function morseToText(morse) {
    let text = [];
    let invalidSequences = new Set();
    // Split by three spaces for word breaks, then by single space for character breaks
    const words = morse.trim().split(/\s{3,}/); // Handles 3 or more spaces as word separators

    words.forEach((wordMorse, wordIndex) => {
        const charactersMorse = wordMorse.split(/\s+/); // Handles one or more spaces as character separators
        charactersMorse.forEach(charMorse => {
            if (charMorse === '') return; // Skip empty strings from multiple spaces

            if (MORSE_CODE_REVERSE_MAP[charMorse]) {
                text.push(MORSE_CODE_REVERSE_MAP[charMorse]);
            } else {
                invalidSequences.add(charMorse);
                text.push('[?]'); // Placeholder for invalid Morse sequences
            }
        });
        if (wordIndex < words.length - 1) {
            text.push(' '); // Add a space between words in the output text
        }
    });
    return { translated: text.join('').trim(), invalid: Array.from(invalidSequences) };
}

/**
 * Calculates Morse code timing parameters based on WPM and Farnsworth speed.
 * @param {number} wpm - Words Per Minute for overall message speed.
 * @param {number} farnsworth - Words Per Minute for individual character speed (Farnsworth).
 * @returns {{dotDuration: number, dashDuration: number, elementSpace: number, charSpace: number, wordSpace: number}} - Durations in milliseconds.
 */
function getMorseTiming(wpm, farnsworth) {
    // Standard character is 'PARIS' or 'CODEX' which is 50 dits.
    // WPM is calculated as (1200 / WPM_effective) ms per dit.
    // For Farnsworth, characters are sent at the Farnsworth WPM, but overall message at WPM.
    // This means longer gaps between characters and words.

    // Calculate the 'effective' WPM for the element speed (dit/dah/inter-element space)
    const elementWPM = Math.max(wpm, farnsworth); // Characters are sent at the faster speed
    const dotDuration = 1200 / elementWPM; // Duration of one 'dit' in ms

    const dashDuration = dotDuration * 3;
    const elementSpace = dotDuration; // Space between dits/dahs within a character

    // Calculate the 'target' WPM for overall message timing (for character and word spacing)
    const targetWPM = wpm;
    const standardCharSpace = dotDuration * 3; // Standard 3 dits between characters
    const standardWordSpace = dotDuration * 7; // Standard 7 dits between words

    // Adjust character and word spacing based on Farnsworth
    // If Farnsworth WPM > target WPM, we add extra silence.
    // The total time for a character is 50 dits / Farnsworth WPM.
    // The total time for a word is 50 dits / target WPM.
    // So, extra space needed = (50/targetWPM - 50/elementWPM) * 1200 / 50 (to get in terms of dit duration)

    // Calculate the total time for a 'standard character' (50 dits including spaces)
    // at the given WPM. This is the 'message rate'.
    const messageCharTime = (60 / targetWPM) * 1000; // ms per char at message WPM (50 dits assumed)

    // Calculate the total time for a 'standard character' at the sending speed.
    // This is the actual time it takes to send the character elements.
    const sendingCharTime = (60 / elementWPM) * 1000;

    // The additional time we need to add as character space (or distribute)
    let charSpaceExtra = (messageCharTime - sendingCharTime) / (50/5); // Divide by average number of spaces in a PARIS character

    // This is a simplified approach. A more robust Farnsworth calculation involves
    // calculating the total time for a word and distributing the extra time.
    // For now, let's keep it simpler for implementation purposes:
    // Farnsworth just means character elements are sent faster, and the gaps between characters/words are proportionally larger.

    // Standard Morse timing ratios:
    // Dit = 1 unit
    // Dah = 3 units
    // Inter-element space = 1 unit
    // Inter-character space = 3 units
    // Inter-word space = 7 units

    // Dot duration (the basic unit) is derived from the Farnsworth WPM
    // if Farnsworth is higher, otherwise from WPM.
    const actualDitDuration = 1200 / farnsworth; // Base speed for dits/dahs

    // But the overall message WPM dictates the total time for characters and words.
    // So, we use the WPM for the character and word spacing to make the message "feel" like that WPM.
    const effectiveCharSpace = (1200 / wpm) * 3; // Space between characters based on WPM
    const effectiveWordSpace = (1200 / wpm) * 7; // Space between words based on WPM

    return {
        dotDuration: actualDitDuration,
        dashDuration: actualDitDuration * 3,
        elementSpace: actualDitDuration,
        charSpace: effectiveCharSpace,
        wordSpace: effectiveWordSpace
    };
}


/**
 * Creates a sequence of audio events (tones and silences) based on Morse code.
 * @param {string} morseCode - The Morse code string to convert to audio events.
 * @param {number} wpm - Words Per Minute.
 * @param {number} farnsworth - Farnsworth WPM for character speed.
 * @returns {Array<{type: 'tone'|'silence', duration: number}>} - Array of audio events.
 */
function createAudioSequence(morseCode, wpm, farnsworth) {
    const { dotDuration, dashDuration, elementSpace, charSpace, wordSpace } = getMorseTiming(wpm, farnsworth);
    const sequence = [];

    // Replace multi-space word separators with a special marker for processing
    const processedMorse = morseCode.trim().replace(/\s{3,}/g, ' | ').split(' ');

    processedMorse.forEach((charOrProsign, index) => {
        if (charOrProsign === '|') { // Word separator marker
            sequence.push({ type: 'silence', duration: wordSpace });
        } else {
            const morseSignals = charOrProsign.split('');
            morseSignals.forEach((signal, signalIndex) => {
                if (signal === '.') {
                    sequence.push({ type: 'tone', duration: dotDuration });
                } else if (signal === '-') {
                    sequence.push({ type: 'tone', duration: dashDuration });
                }
                // Add inter-element space if not the last signal in the character/prosign
                if (signalIndex < morseSignals.length - 1) {
                    sequence.push({ type: 'silence', duration: elementSpace });
                }
            });
            // Add inter-character space if not the last character/prosign in the sequence and not a word separator following
            if (index < processedMorse.length - 1 && processedMorse[index + 1] !== '|') {
                sequence.push({ type: 'silence', duration: charSpace });
            }
        }
    });
    return sequence;
}

/**
 * Plays a single tone of a given duration and frequency.
 * @param {number} duration - Duration of the tone in milliseconds.
 * @param {number} frequency - Frequency of the tone in Hz.
 * @returns {Promise<void>} - A promise that resolves when the tone has finished.
 */
function playTone(duration, frequency) {
    return new Promise(resolve => {
        if (!audioContext || audioContext.state === 'suspended') {
            initAudio(); // Initialize if not already or if suspended
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                playToneActual();
            });
        } else {
            playToneActual();
        }

        function playToneActual() {
            if (oscillator) { // Stop any existing oscillator to prevent overlapping
                oscillator.stop();
                oscillator.disconnect();
            }

            oscillator = audioContext.createOscillator();
            oscillator.type = 'sine'; // Sine wave for a clean tone
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.connect(gainNode);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration / 1000); // Duration in seconds

            oscillator.onended = () => {
                oscillator.disconnect();
                oscillator = null;
                resolve();
            };
        }
    });
}

/**
 * Stops the current audio playback immediately.
 */
function stopTone() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }
}

/**
 * Handles playing the Morse code audio sequence.
 */
async function playMorseAudioSequence() {
    if (audioIsPlaying && !audioIsPaused) return; // Prevent multiple simultaneous playbacks

    initAudio(); // Ensure audio context is ready
    audioIsPlaying = true;
    audioIsPaused = false;
    playAudioBtn.disabled = true;
    pauseAudioBtn.disabled = false;
    stopAudioBtn.disabled = false;
    downloadWavBtn.disabled = true; // Disable WAV download during playback

    const morseText = outputTextarea.value;
    if (!morseText) {
        stopAudio(); // Nothing to play
        return;
    }

    // Re-create sequence if starting fresh or from a stop
    if (currentMorseIndex === 0 && !audioIsPaused) {
        const wpm = parseInt(wpmSlider.value);
        const farnsworth = parseInt(farnsworthSlider.value);
        currentMorseSequence = createAudioSequence(morseText, wpm, farnsworth);
        audioRecording = []; // Clear previous recording for WAV
    }

    const frequency = parseFloat(frequencySlider.value);
    const volume = parseFloat(volumeSlider.value);
    gainNode.gain.value = volume;

    for (let i = currentMorseIndex; i < currentMorseSequence.length; i++) {
        if (!audioIsPlaying || audioIsPaused) {
            currentMorseIndex = i; // Save progress if paused
            return;
        }

        const event = currentMorseSequence[i];
        if (event.type === 'tone') {
            await playTone(event.duration, frequency);
            recordAudio(frequency, event.duration, audioContext.sampleRate);
        } else if (event.type === 'silence') {
            await new Promise(resolve => setTimeout(resolve, event.duration));
            recordAudio(0, event.duration, audioContext.sampleRate); // Record silence (0 frequency)
        }
        currentMorseIndex = i + 1; // Update index for next iteration
    }

    // Playback finished
    stopAudio();
}

/**
 * Records a segment of audio for WAV export.
 * This is a simplified recording. For true Web Audio API recording,
 * AudioWorkletNode or MediaRecorder API should be used.
 * This function simulates by generating samples.
 * @param {number} frequency - The frequency of the tone (0 for silence).
 * @param {number} duration - The duration in milliseconds.
 * @param {number} sampleRate - The audio context's sample rate.
 */
function recordAudio(frequency, duration, sampleRate) {
    const numSamples = Math.ceil(duration / 1000 * sampleRate);
    for (let i = 0; i < numSamples; i++) {
        let sample = 0;
        if (frequency > 0) {
            // Generate a sine wave sample
            sample = Math.sin(2 * Math.PI * frequency * (audioRecording.length + i) / sampleRate);
        }
        // Scale to 16-bit PCM range and add to recording
        audioRecording.push(sample * 32767); // Max value for 16-bit signed integer
    }
}


/**
 * Stops audio playback and resets state.
 */
function stopAudio() {
    stopTone(); // Ensure any current tone is stopped
    audioIsPlaying = false;
    audioIsPaused = false;
    currentMorseIndex = 0;
    currentMorseSequence = []; // Clear the sequence
    playAudioBtn.disabled = false;
    pauseAudioBtn.disabled = true;
    stopAudioBtn.disabled = true;
    downloadWavBtn.disabled = false; // Enable WAV download after stopping/finishing
}

/**
 * Pauses audio playback.
 */
function pauseAudio() {
    if (audioIsPlaying) {
        stopTone(); // Stop current tone
        audioIsPaused = true;
        audioIsPlaying = false; // Mark as not actively playing
        playAudioBtn.disabled = false;
        pauseAudioBtn.disabled = true;
        stopAudioBtn.disabled = false;
    }
}

/**
 * Downloads the accumulated audio recording as a WAV file.
 */
function downloadWAV() {
    if (audioRecording.length === 0) {
        alert('No audio recorded yet. Play some Morse code first!');
        return;
    }

    initAudio(); // Ensure audio context exists for sampleRate
    const sampleRate = audioContext.sampleRate;
    const pcmData = new Int16Array(audioRecording); // Convert to Int16Array for 16-bit PCM

    // Create WAV header
    const buffer = new ArrayBuffer(44 + pcmData.byteLength);
    const view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 36 + pcmData.byteLength, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, 1, true); /* mono */
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * 2, true); /* 2 bytes per sample (16 bit) */
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, pcmData.byteLength, true);

    // Write PCM data
    floatTo16BitPCM(view, 44, pcmData);

    const blob = new Blob([buffer], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'morse_audio.wav';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    audioRecording = []; // Clear recording after download
}

/**
 * Helper function to write a string to a DataView.
 * @param {DataView} view - The DataView to write to.
 * @param {number} offset - The offset in the DataView.
 * @param {string} string - The string to write.
 */
function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

/**
 * Helper function to write PCM data (float to 16-bit integer).
 * @param {DataView} output - The DataView to write to.
 * @param {number} offset - The offset in the DataView.
 * @param {Int16Array} input - The Int16Array PCM data.
 */
function floatTo16BitPCM(output, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i] / 32767)); // Normalize from Int16 to float -1 to 1
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true); // Convert float to Int16
    }
}


/**
 * Handles uploading a text file and populating the input textarea.
 * @param {Event} event - The file change event.
 */
function uploadFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        inputTextarea.value = e.target.result;
        updateTranslation(); // Translate after loading
    };
    reader.onerror = (e) => {
        console.error('Error reading file:', e);
        alert('Failed to read file.');
    };
    reader.readAsText(file);
}

/**
 * Downloads content as a text file.
 * @param {string} filename - The name of the file.
 * @param {string} content - The content to write to the file.
 */
function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// -----------------------------------------------------------------------------
// 5. Event Listeners
// -----------------------------------------------------------------------------

// Live translation and auto-detection
inputTextarea.addEventListener('input', updateTranslation);

// Copy button
copyBtn.addEventListener('click', () => {
    outputTextarea.select();
    try {
        document.execCommand('copy');
        // A simple visual feedback (e.g., button text change) could be added here
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
});

// Clear button
clearBtn.addEventListener('click', () => {
    inputTextarea.value = '';
    outputTextarea.value = '';
    inputTextarea.classList.remove('invalid-input');
    stopAudio(); // Stop any ongoing audio if clearing
});

// File upload
fileUploadInput.addEventListener('change', uploadFile);

// Download result
downloadResultBtn.addEventListener('click', () => {
    if (outputTextarea.value.trim() === '') {
        alert('No content to download. Translate something first!');
        return;
    }
    downloadFile('morse_translation.txt', outputTextarea.value);
});

// Audio controls
playAudioBtn.addEventListener('click', playMorseAudioSequence);
pauseAudioBtn.addEventListener('click', pauseAudio);
stopAudioBtn.addEventListener('click', stopAudio);
downloadWavBtn.addEventListener('click', downloadWAV);

// Slider value updates
wpmSlider.addEventListener('input', () => { wpmValueSpan.textContent = wpmSlider.value; });
farnsworthSlider.addEventListener('input', () => { farnsworthValueSpan.textContent = farnsworthSlider.value; });
frequencySlider.addEventListener('input', () => { frequencyValueSpan.textContent = frequencySlider.value; });
volumeSlider.addEventListener('input', () => {
    volumeValueSpan.textContent = volumeSlider.value;
    if (gainNode) {
        gainNode.gain.value = parseFloat(volumeSlider.value);
    }
});

// Initial setup on load
document.addEventListener('DOMContentLoaded', () => {
    updateTranslation(); // Perform initial translation if there's any pre-filled text
    stopAudio(); // Ensure audio controls are in initial state
});