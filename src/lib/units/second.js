import { makeGetSet } from '../moment/get-set.js';
import { addFormatToken } from '../format/format.js';
import { addUnitAlias } from './aliases.js';
import { addUnitPriority } from './priorities.js';
import { addRegexToken, match1to2, match2 } from '../parse/regex.js';
import { addParseToken } from '../parse/token.js';
import { SECOND } from './constants.js';

// FORMATTING

addFormatToken('s', ['ss', 2], 0, 'second');

// ALIASES

addUnitAlias('second', 's');

// PRIORITY

addUnitPriority('second', 15);

// PARSING

addRegexToken('s',  match1to2);
addRegexToken('ss', match1to2, match2);
addParseToken(['s', 'ss'], SECOND);

// MOMENTS

export var getSetSecond = makeGetSet('Seconds', false);
