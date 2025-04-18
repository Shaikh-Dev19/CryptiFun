export function atbashTransform(text) {
    if (!text || typeof text !== 'string') {
        return '';
    }

    let result = '';
    for (let ch of text) {
        if (ch >= 'A' && ch <= 'Z') {
            // For uppercase letters, subtract from 'Z'
            result += String.fromCharCode('Z'.charCodeAt(0) - (ch.charCodeAt(0) - 'A'.charCodeAt(0)));
        } else if (ch >= 'a' && ch <= 'z') {
            // For lowercase letters, subtract from 'z'
            result += String.fromCharCode('z'.charCodeAt(0) - (ch.charCodeAt(0) - 'a'.charCodeAt(0)));
        } else {
            // Preserve other characters (symbols, spaces, numbers)
            result += ch;
        }
    }
    return result;
}
