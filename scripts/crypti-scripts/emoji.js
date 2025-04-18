const emojiMap = {
    // Lowercase letters
    'a': '😀', 'b': '😁', 'c': '😂', 'd': '🤣', 'e': '😃',
    'f': '😄', 'g': '😅', 'h': '😆', 'i': '😉', 'j': '😊',
    'k': '😋', 'l': '😎', 'm': '😍', 'n': '😘', 'o': '😗',
    'p': '😙', 'q': '😚', 'r': '🙂', 's': '🤗', 't': '🤩',
    'u': '🤔', 'v': '🤨', 'w': '😐', 'x': '😑', 'y': '😶',
    'z': '🙄',

    // Uppercase letters
    'A': '🅰️', 'B': '🅱️', 'C': '🌜', 'D': '🌛', 'E': '🎗️',
    'F': '🎏', 'G': '🌀', 'H': '♓', 'I': '🎐', 'J': '🎷',
    'K': '🎋', 'L': '👢', 'M': '〽️', 'N': '🎶', 'O': '🅾️',
    'P': '🅿️', 'Q': '🇶', 'R': '®️', 'S': '💲', 'T': '🌴',
    'U': '⛎', 'V': '♈', 'W': '〰️', 'X': '❌', 'Y': '✌️',
    'Z': '💤',

    // Space
    ' ': '_'
};

// Reverse map
const reverseEmojiMap = Object.fromEntries(
    Object.entries(emojiMap).map(([char, emoji]) => [emoji, char])
);

export function encodeToEmoji(text) {
    if (!text || typeof text !== 'string') return '';
    return text.split('').map(ch => emojiMap[ch] || ch).join('');
}

export function decodeFromEmoji(text) {
    if (!text || typeof text !== 'string') return '';

    let decoded = '';
    let i = 0;
    const emojiKeys = Object.keys(reverseEmojiMap).sort((a, b) => b.length - a.length);

    while (i < text.length) {
        let matched = false;
        for (let emoji of emojiKeys) {
            if (text.startsWith(emoji, i)) {
                decoded += reverseEmojiMap[emoji];
                i += emoji.length;
                matched = true;
                break;
            }
        }
        if (!matched) {
            decoded += text[i];
            i++;
        }
    }

    return decoded.replace(/_/g, ' '); // Convert underscore back to space
}
