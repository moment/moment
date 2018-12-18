import { makeGetSet } from '../moment/get-set.js';
import { addFormatToken } from '../format/format.js';
import { addUnitAlias } from './aliases.js';
import { addUnitPriority } from './priorities.js';
import { addRegexToken, match1to2, match2 } from '../parse/regex.js';
import { addParseToken } from '../parse/token.js';
import { MINUTE } from './constants.js';

// FORMATTING

addFormatToken('m', ['mm', 2], 0, 'minute');

// ALIASES

addUnitAlias('minute', 'm');

// PRIORITY

addUnitPriority('minute', 14);

// PARSING

addRegexToken('m',  match1to2);
addRegexToken('mm', match1to2, match2);
addParseToken(['m', 'mm'], MINUTE);

// MOMENTS

export var getSetMinute = makeGetSet('Minutes', false);
