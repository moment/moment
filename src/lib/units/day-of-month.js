import { makeGetSet } from '../moment/get-set.js';
import { addFormatToken } from '../format/format.js';
import { addUnitAlias } from './aliases.js';
import { addUnitPriority } from './priorities.js';
import { addRegexToken, match1to2, match2 } from '../parse/regex.js';
import { addParseToken } from '../parse/token.js';
import { DATE } from './constants.js';
import toInt from '../utils/to-int.js';

// FORMATTING

addFormatToken('D', ['DD', 2], 'Do', 'date');

// ALIASES

addUnitAlias('date', 'D');

// PRIORITY
addUnitPriority('date', 9);

// PARSING

addRegexToken('D',  match1to2);
addRegexToken('DD', match1to2, match2);
addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ?
      (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
      locale._dayOfMonthOrdinalParseLenient;
});

addParseToken(['D', 'DD'], DATE);
addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
});

// MOMENTS

export var getSetDayOfMonth = makeGetSet('Date', true);
