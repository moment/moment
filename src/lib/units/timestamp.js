import { addFormatToken } from '../format/format.js';
import { addRegexToken, matchTimestamp, matchSigned } from '../parse/regex.js';
import { addParseToken } from '../parse/token.js';
import toInt from '../utils/to-int.js';

// FORMATTING

addFormatToken('X', 0, 0, 'unix');
addFormatToken('x', 0, 0, 'valueOf');

// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});
