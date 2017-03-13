import { addRegexToken, match1to2, match2 } from '../regex';
import { addParseToken } from '../token';

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);