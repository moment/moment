import { addRegexToken, match3, match1to3 } from '../regex';
import { addParseToken } from '../token';
import toInt from '../../utils/to-int';

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});
