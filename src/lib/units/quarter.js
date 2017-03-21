import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import { addRegexToken, match1 } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { getSetMonth } from './month';
import { MONTH } from './constants';
import toInt from '../utils/to-int';

// FORMATTING

addFormatToken('Q', 0, 'Qo', 'quarter');

// ALIASES

addUnitAlias('quarter', 'Q');

// PARSING

addRegexToken('Q', match1);
addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
});

// MOMENTS

export function getSetQuarter (input) {
    if (input == null) {
        return Math.ceil((this.month() + 1) / 3);
    }
    return getSetMonth.call(this, (input - 1) * 3 + this.month() % 3);
}

// PRIORITY

addUnitPriority('quarter', 7, getSetQuarter);
