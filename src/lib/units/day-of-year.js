import { addFormatToken } from '../format/format.js';
import { addUnitAlias } from './aliases.js';
import { addUnitPriority } from './priorities.js';
import { addRegexToken, match3, match1to3 } from '../parse/regex.js';
import { daysInYear } from './year.js';
import { createUTCDate } from '../create/date-from-array.js';
import { addParseToken } from '../parse/token.js';
import toInt from '../utils/to-int.js';

// FORMATTING

addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

// ALIASES

addUnitAlias('dayOfYear', 'DDD');

// PRIORITY
addUnitPriority('dayOfYear', 4);

// PARSING

addRegexToken('DDD',  match1to3);
addRegexToken('DDDD', match3);
addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
});

// HELPERS

// MOMENTS

export function getSetDayOfYear (input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
}
