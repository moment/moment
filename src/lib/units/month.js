import { get } from '../moment/get-set';
import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
import { addRegexToken, match1to2, match2, matchWord, matchWordDotted, matchWordDoubleDotted } from '../parse/regex';
import { addParseToken } from '../parse/token';
import { hooks } from '../utils/hooks';
import { MONTH } from './constants';
import toInt from '../utils/to-int';
import { createUTC } from '../create/utc';
import getParsingFlags from '../create/parsing-flags';

export function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

// FORMATTING

addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
});

addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMM.', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format) + '.';
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});

// ALIASES

addUnitAlias('month', 'M');

// PARSING

addRegexToken('M',    match1to2);
addRegexToken('MM',   match1to2, match2);
addRegexToken('MMM',  matchWordDotted);
addRegexToken('MMM.',  matchWordDoubleDotted);
addRegexToken('MMMM', matchWord);

addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
});

addParseToken(['MMM', 'MMM.', 'MMMM'], function (input, array, config, token) {
    var locale = config._locale,
        month = locale.monthsParse(input, token, config._strict),
        consumedChars = token === 'MMM' || token === 'MMM.' ?
            locale.dotFix(input, token, locale._monthsShortHaveDot) : null;

    if (consumedChars != null) {
        console.log('HOLY', config._locale._abbr, 'inp', input, 'tok', token, 'id', month, 'consumed', consumedChars);
    }
    // if we didn't find a month name, mark the date as invalid.
    if (month != null) {
        array[MONTH] = month;
    } else {
        getParsingFlags(config).invalidMonth = input;
    }
    return consumedChars;
});

// LOCALES

export var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
export function localeMonths (m) {
    return this._months[m.month()];
}

export var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
export function localeMonthsShort (m) {
    return this._monthsShort[m.month()];
}

export function localeMonthsParse (monthName, format, strict) {
    var i, mom, regex, cleanMonth = monthName, cleanFormat = format;

    if (monthName == null || monthName.length === 0) {
        return;
    }

    if (strict && format && format[format.length - 1] === '.' && monthName[monthName.length - 1] !== '.') {
        return;
    }

    if (format != null && format[format.length - 1] === '.' && monthName[monthName.length - 1] === '.') {
        cleanFormat = format.substr(0, format.length - 1);
        cleanMonth = monthName.substr(0, monthName.length - 1);
    }

    if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
    }

    for (i = 0; i < 12; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, i]);
        if (strict && !this._longMonthsParse[i]) {
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '.?') + '$', 'i');
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '.?') + '$', 'i');
        }
        if (!strict && !this._monthsParse[i]) {
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
            this._monthsParse[i] = new RegExp(regex.replace('.', '.?'), 'i');
        }
        // test the regex
        if (strict && cleanFormat === 'MMMM' && this._longMonthsParse[i].test(cleanMonth)) {
            return i;
        } else if (strict && cleanFormat === 'MMM' && this._shortMonthsParse[i].test(cleanMonth)) {
            return i;
        } else if (!strict && this._monthsParse[i].test(cleanMonth)) {
            return i;
        }
    }
}

// MOMENTS

export function setMonth (mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
        // No op
        return mom;
    }

    // TODO: Move this out of here!
    if (typeof value === 'string') {
        value = mom.localeData().monthsParse(value);
        // TODO: Another silent failure?
        if (typeof value !== 'number') {
            return mom;
        }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
    return mom;
}

export function getSetMonth (value) {
    if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
    } else {
        return get(this, 'Month');
    }
}

export function getDaysInMonth () {
    return daysInMonth(this.year(), this.month());
}
