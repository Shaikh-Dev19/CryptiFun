export function caesarEncode(text, shift = 3) {
    if (!text || typeof text !== 'string') {
        return '';
    }

    // Normalize shift to be between 0 and 25
    shift = ((shift % 26) + 26) % 26;

    return text.split('').map(ch => {
        if (ch >= 'A' && ch <= 'Z') {
            return String.fromCharCode((ch.charCodeAt(0) - 'A'.charCodeAt(0) + shift) % 26 + 'A'.charCodeAt(0));
        } else if (ch >= 'a' && ch <= 'z') {
            return String.fromCharCode((ch.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26 + 'a'.charCodeAt(0));
        } else if (ch >= '0' && ch <= '9') {
            return String.fromCharCode((ch.charCodeAt(0) - '0'.charCodeAt(0) + shift) % 10 + '0'.charCodeAt(0));
        } else {
            return ch;
        }
    }).join('');
}

export function caesarDecode(text, shift = 3) {
    if (!text || typeof text !== 'string') {
        return '';
    }

    // Normalize shift to be between 0 and 25
    shift = ((shift % 26) + 26) % 26;

    return text.split('').map(ch => {
        if (ch >= 'A' && ch <= 'Z') {
            return String.fromCharCode((ch.charCodeAt(0) - 'A'.charCodeAt(0) - shift + 26) % 26 + 'A'.charCodeAt(0));
        } else if (ch >= 'a' && ch <= 'z') {
            return String.fromCharCode((ch.charCodeAt(0) - 'a'.charCodeAt(0) - shift + 26) % 26 + 'a'.charCodeAt(0));
        } else if (ch >= '0' && ch <= '9') {
            return String.fromCharCode((ch.charCodeAt(0) - '0'.charCodeAt(0) - shift + 10) % 10 + '0'.charCodeAt(0));
        } else {
            return ch;
        }
    }).join('');
}
  