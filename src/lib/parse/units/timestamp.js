import { addRegexToken, matchTimestamp, matchSigned } from '../regex';
import { addParseToken } from '../token';
import toInt from '../../utils/to-int';
// PARSING

addRegexToken('x', matchSigned);
addRegexToken('X', matchTimestamp);
addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
});