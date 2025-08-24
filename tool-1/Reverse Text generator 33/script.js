// Reverse Text Generator - Main JavaScript File

// DOM Elements
const textInput = document.getElementById('textInput');
const reversedText = document.getElementById('reversedText');
const copyBtn = document.getElementById('copyBtn');
const copyOutputBtn = document.getElementById('copyOutputBtn');
const clearBtn = document.getElementById('clearBtn');
const charCount = document.getElementById('charCount');
const outputContainer = document.getElementById('outputContainer');
const yearSpan = document.getElementById('year');

// Set current year in footer
yearSpan.textContent = new Date().getFullYear();

// Function to reverse text
function reverseText(text) {
    return text.split('').reverse().join('');
}

// Update reversed text and character count
function updateOutput() {
    const input = textInput.value;
    const reversed = reverseText(input);
    
    // Update the output
    reversedText.textContent = reversed;
    
    // Update character count
    charCount.textContent = `${input.length} characters`;
}

// Copy text to clipboard
function copyToClipboard(text, buttonElement) {
    if (!text) {
        showToast('Nothing to copy!', 'error');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        showToast('Copied to clipboard!', 'success');
        
        // Temporarily change button text/icon
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
        `;
        
        // Revert back after 2 seconds
        setTimeout(() => {
            buttonElement.innerHTML = originalHTML;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy!', 'error');
    });
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="${type === 'success' ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' : 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'}" />
        </svg>
        <span>${message}</span>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Clear all inputs and outputs
function clearAll() {
    textInput.value = '';
    reversedText.textContent = '';
    charCount.textContent = '0 characters';
    textInput.focus();
    showToast('Cleared!', 'success');
}

// Event Listeners
textInput.addEventListener('input', updateOutput);

copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    copyToClipboard(reversedText.textContent, copyBtn);
});

copyOutputBtn.addEventListener('click', () => {
    copyToClipboard(reversedText.textContent, copyOutputBtn);
});

clearBtn.addEventListener('click', clearAll);

// Add keyboard shortcut for copy (Ctrl+C when output is focused)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        if (document.activeElement === reversedText || 
            outputContainer.contains(document.activeElement)) {
            e.preventDefault();
            copyToClipboard(reversedText.textContent, copyOutputBtn);
        }
    }
});

// Make output selectable but improve UX
reversedText.addEventListener('click', function() {
    // Select all text when clicked
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(this);
    selection.removeAllRanges();
    selection.addRange(range);
});

// Initialize with empty output
updateOutput();

// Add subtle animation on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.max-w-2xl').style.opacity = '0';
    document.querySelector('.max-w-2xl').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.max-w-2xl').style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        document.querySelector('.max-w-2xl').style.opacity = '1';
        document.querySelector('.max-w-2xl').style.transform = 'translateY(0)';
    }, 100);
});

// Accessibility improvements
textInput.setAttribute('aria-label', 'Text input for reversal');
reversedText.setAttribute('aria-live', 'polite');
reversedText.setAttribute('tabindex', '0');
reversedText.setAttribute('role', 'region');
reversedText.setAttribute('aria-label', 'Reversed text output');