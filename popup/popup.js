import { atbashTransform } from '../scripts/crypti-scripts/atbash.js';
import { caesarEncode, caesarDecode } from '../scripts/crypti-scripts/caesar.js';
import { encodeToEmoji, decodeFromEmoji } from '../scripts/crypti-scripts/emoji.js';
import { encodeToNumeric, decodeFromNumeric } from '../scripts/crypti-scripts/numeric.js';

// Cipher descriptions
const cipherDescriptions = {
    'atbash': 'Atbash: Replaces each letter with its reverse in the alphabet',
    'caesar': 'Caesar: Shifts each letter by a fixed number down the alphabet',
    'emoji': 'Emoji: Converts text to emoji characters',
    'numeric': 'Numeric: Converts text to numeric codes'
};

function processCipher(cipher, text, mode) {
    // Check if the input text is valid
    if (!text || typeof text !== 'string' || text.trim() === '') {
        return 'Please enter valid text';
    }

    try {
        // Cipher processing logic
        const cipherFunctions = {
            'atbash': atbashTransform,
            'caesar': (text, mode) => {
                const shift = parseInt(document.getElementById('caesar-shift').value) || 3;
                if (isNaN(shift) || shift < 1 || shift > 25) {
                    return 'Please enter a valid shift value (1-25)';
                }
                return mode === 'encode' ? caesarEncode(text, shift) : caesarDecode(text, shift);
            },
            'emoji': (text, mode) => mode === 'encode' ? encodeToEmoji(text) : decodeFromEmoji(text),
            'numeric': (text, mode) => mode === 'encode' ? encodeToNumeric(text) : decodeFromNumeric(text)
        };

        // Process the selected cipher
        if (cipherFunctions[cipher]) {
            return cipherFunctions[cipher](text, mode);
        } else {
            return 'Invalid cipher selected';
        }
    } catch (error) {
        console.error('Cipher processing error:', error);
        return 'An error occurred while processing the cipher';
    }
}

// Copy to clipboard function
async function copyToClipboard(text) {
    try {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        
        // Select and copy the text
        textarea.select();
        const successful = document.execCommand('copy');
        
        // Remove the temporary textarea
        document.body.removeChild(textarea);
        
        if (successful) {
            const copyBtn = document.getElementById('copy-btn');
            const originalSvg = copyBtn.innerHTML;
            
            // Change icon to checkmark temporarily
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
            
            // Reset icon after 1.5 seconds
            setTimeout(() => {
                copyBtn.innerHTML = originalSvg;
            }, 1500);
        } else {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text to clipboard. Please try again or copy manually.');
    }
}

// Event listeners for encoding and decoding
document.addEventListener('DOMContentLoaded', () => {
    const encodeBtn = document.getElementById('encode-btn');
    const decodeBtn = document.getElementById('decode-btn');
    const cipherSelect = document.getElementById('cipher-select');
    const caesarShiftInput = document.getElementById('caesar-shift');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    const cipherDescription = document.getElementById('cipher-description');

    // Update cipher description when selection changes
    cipherSelect.addEventListener('change', () => {
        const selectedCipher = cipherSelect.value;
        cipherDescription.textContent = cipherDescriptions[selectedCipher];
        caesarShiftInput.style.display = selectedCipher === 'caesar' ? 'block' : 'none';
    });

    // Clear button handler
    clearBtn.addEventListener('click', () => {
        document.getElementById('input-text').value = '';
        document.getElementById('output-text').value = '';
    });

    // Encode button handler
    encodeBtn.addEventListener('click', () => {
        const text = document.getElementById('input-text').value;
        const cipher = cipherSelect.value;
        const result = processCipher(cipher, text, 'encode');
        document.getElementById('output-text').value = result;
    });

    // Decode button handler
    decodeBtn.addEventListener('click', () => {
        const text = document.getElementById('input-text').value;
        const cipher = cipherSelect.value;
        const result = processCipher(cipher, text, 'decode');
        document.getElementById('output-text').value = result;
    });

    // Copy button handler
    copyBtn.addEventListener('click', () => {
        const outputText = document.getElementById('output-text').value;
        if (outputText) {
            copyToClipboard(outputText);
        }
    });
});
