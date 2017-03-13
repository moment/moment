import { addRegexToken, match1to2, match2 } from '../regex';
import { addParseToken } from '../token';
import { MINUTE } from './constants';

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);