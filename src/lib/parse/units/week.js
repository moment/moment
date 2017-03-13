import { addRegexToken, match1to2, match2 } from '../regex';
import { addWeekParseToken } from '../token';
// PARSING
import toInt from '../../utils/to-int';

addRegexToken('w',  match1to2);
addRegexToken('ww', match1to2, match2);
addRegexToken('W',  match1to2);
addRegexToken('WW', match1to2, match2);

addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
});