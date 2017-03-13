import { addRegexToken, matchOffset, matchShortOffset } from '../regex';
import { addParseToken } from '../token';
import { offsetFromString } from '../../units/offset';

// PARSING

addRegexToken('Z',  matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
});