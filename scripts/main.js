import { atbashTransform } from './crypti-scripts/atbash.js';
import { caesarEncode, caesarDecode } from './crypti-scripts/caesar.js';
import { encodeToEmoji, decodeFromEmoji } from './crypti-scripts/emoji.js';
import { encodeToNumeric, decodeFromNumeric } from './crypti-scripts/numeric.js';

function processCipher(cipher, text, mode) {
  switch (cipher) {
    case 'atbash':
      return atbashTransform(text);
    case 'caesar':
      return mode === 'encode' ? caesarEncode(text, 3) : caesarDecode(text, 3);
    case 'emoji':
      return mode === 'encode' ? encodeToEmoji(text) : decodeFromEmoji(text);
    case 'numeric':
      return mode === 'encode' ? encodeToNumeric(text) : decodeFromNumeric(text);
    default:
      return 'Invalid cipher';
  }
}

// Event listeners for encoding and decoding
document.getElementById('encode-btn').addEventListener('click', () => {
  const text = document.getElementById('input-text').value;
  const cipher = document.getElementById('cipher-select').value;
  const result = processCipher(cipher, text, 'encode');
  document.getElementById('output-text').value = result;
});

document.getElementById('decode-btn').addEventListener('click', () => {
  const text = document.getElementById('input-text').value;
  const cipher = document.getElementById('cipher-select').value;
  const result = processCipher(cipher, text, 'decode');
  document.getElementById('output-text').value = result;
});
