export function localeDotFix (monthInput, token, canonicalDot) {
    if (monthInput == null || monthInput.length === 0 ||
            monthInput[monthInput.length - 1] !== '.') {
        return null;
    }

    var inputDoubleDot = monthInput.match(/[.][ \t]*[.]$/),
        shorterLen = monthInput.length - 1;

    // The token is MMM or MMM.

    if (token[token.length - 1] !== '.') {
        return canonicalDot ? null : shorterLen;
    }

    return !canonicalDot && inputDoubleDot ? shorterLen : null;
}

