// Encode function (space → "_", special chars remain same)
export function encodeToNumeric(text) {
  if (!text || typeof text !== 'string') return '';

  return text.split('').map(ch => {
      if (ch === ' ') {
          return '_';
      } else if (ch >= 'a' && ch <= 'z') {
          return String(ch.charCodeAt(0) - 'a'.charCodeAt(0) + 1).padStart(2, '0');
      } else if (ch >= 'A' && ch <= 'Z') {
          return String(ch.charCodeAt(0) - 'A'.charCodeAt(0) + 27).padStart(2, '0');
      } else if (ch >= '0' && ch <= '9') {
          return String(ch.charCodeAt(0) - '0'.charCodeAt(0) + 53).padStart(2, '0');
      } else {
          return ch; // leave special characters as-is
      }
  }).join('');
}

// Decode function (underscore → space, special chars remain same)
export function decodeFromNumeric(text) {
  if (!text || typeof text !== 'string') return '';

  let decoded = '';
  let i = 0;

  while (i < text.length) {
      const ch = text.charAt(i);

      if (ch === '_') {
          decoded += ' ';
          i++;
      } else if (i + 1 < text.length && /\d/.test(ch) && /\d/.test(text.charAt(i + 1))) {
          const code = text.substring(i, i + 2);
          const num = parseInt(code);

          if (num >= 1 && num <= 26) {
              decoded += String.fromCharCode('a'.charCodeAt(0) + num - 1);
          } else if (num >= 27 && num <= 52) {
              decoded += String.fromCharCode('A'.charCodeAt(0) + num - 27);
          } else if (num >= 53 && num <= 62) {
              decoded += String.fromCharCode('0'.charCodeAt(0) + num - 53);
          } else {
              decoded += '?'; // fallback for unknown numeric codes
          }
          i += 2;
      } else {
          decoded += ch; // leave symbols/special characters as-is
          i++;
      }
  }

  return decoded;
}
