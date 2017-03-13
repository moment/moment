import { addRegexToken, match1 } from '../regex';
import { addParseToken } from '../token';
import toInt from '../../utils/to-int';

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});