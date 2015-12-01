import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
import { addRegexToken, match1to2, matchWord, matchWordDotted, matchWordDoubleDotted } from '../parse/regex';
import { addWeekParseToken } from '../parse/token';
import toInt from '../utils/to-int';
import { createLocal } from '../create/local';
import getParsingFlags from '../create/parsing-flags';

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('dd.', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format) + '.';
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
});

addFormatToken('ddd.', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format) + '.';
});

addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
});

addFormatToken('e', 0, 0, 'weekday');
addFormatToken('E', 0, 0, 'isoWeekday');

// ALIASES

addUnitAlias('day', 'd');
addUnitAlias('weekday', 'e');
addUnitAlias('isoWeekday', 'E');

// PARSING

addRegexToken('d',    match1to2);
addRegexToken('e',    match1to2);
addRegexToken('E',    match1to2);
addRegexToken('dd',   matchWordDotted);
addRegexToken('dd.',  matchWordDoubleDotted);
addRegexToken('ddd',  matchWordDotted);
addRegexToken('ddd.',  matchWordDoubleDotted);
addRegexToken('dddd', matchWord);

addWeekParseToken(['dd', 'dd.', 'ddd', 'ddd.', 'dddd'], function (input, week, config, token) {
    var locale = config._locale,
        weekday = locale.weekdaysParse(input, token, config._strict),
        consumedChars = token === 'dd' || token === 'dd.' ?
            locale.dotFix(input, token, !!locale._weekdaysMinHaveDot) :
            token === 'ddd' || token === 'ddd.' ?
            locale.dotFix(input, token, !!locale._weekdaysShortHaveDot) :
            null;

    // if we didn't get a weekday name, mark the date as invalid
    if (weekday != null) {
        week.d = weekday;
    } else {
        getParsingFlags(config).invalidWeekday = input;
    }

    return consumedChars;
});

addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
});

// HELPERS

function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
        return input;
    }

    if (!isNaN(input)) {
        return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);
    if (typeof input === 'number') {
        return input;
    }

    return null;
}

// LOCALES

export var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
export function localeWeekdays (m) {
    return this._weekdays[m.day()];
}

export var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
export function localeWeekdaysShort (m) {
    return this._weekdaysShort[m.day()];
}

export var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
export function localeWeekdaysMin (m) {
    return this._weekdaysMin[m.day()];
}

export function localeWeekdaysParse (weekdayName, format, strict) {
    var i, mom, regex, cleanWeekday = weekdayName, cleanFormat = format;

    if (weekdayName == null || weekdayName.length === 0) {
        return;
    }

    if (strict && format && format[format.length - 1] === '.' && weekdayName[weekdayName.length - 1] !== '.') {
        return;
    }

    if (format != null && format[format.length - 1] === '.' && weekdayName[weekdayName.length - 1] === '.') {
        cleanFormat = format.substr(0, format.length - 1);
        cleanWeekday = weekdayName.substr(0, weekdayName.length - 1);
    }

    if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already

        mom = createLocal([2000, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
        }
        if (!strict && !this._weekdaysParse[i]) {
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', '\.?'), 'i');
        }
        // test the regex
        if (strict && cleanFormat === 'dddd' && this._fullWeekdaysParse[i].test(cleanWeekday)) {
            return i;
        } else if (strict && cleanFormat === 'ddd' && this._shortWeekdaysParse[i].test(cleanWeekday)) {
            return i;
        } else if (strict && cleanFormat === 'dd' && this._minWeekdaysParse[i].test(cleanWeekday)) {
            return i;
        } else if (!strict && this._weekdaysParse[i].test(cleanWeekday)) {
            return i;
        }
    }
}

// MOMENTS

export function getSetDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, 'd');
    } else {
        return day;
    }
}

export function getSetLocaleDayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
}

export function getSetISODayOfWeek (input) {
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.
    return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
}
