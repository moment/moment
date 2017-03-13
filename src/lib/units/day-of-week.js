import { addFormatToken } from '../format/format';
import { addUnitAlias } from './aliases';
import { addUnitPriority } from './priorities';
import toInt from '../utils/to-int';
import isArray from '../utils/is-array';
import hasOwnProp from '../utils/has-own-prop';
import { createUTC } from '../create/utc';

// FORMATTING

addFormatToken('d', 0, 'do', 'day');

addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
});

addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
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

// PRIORITY
addUnitPriority('day', 11);
addUnitPriority('weekday', 11);
addUnitPriority('isoWeekday', 11);



// LOCALES

export var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
export function localeWeekdays (m, format) {
    if (!m) {
        return this._weekdays;
    }
    return isArray(this._weekdays) ? this._weekdays[m.day()] :
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
}

export var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
export function localeWeekdaysShort (m) {
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
}

export var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
export function localeWeekdaysMin (m) {
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
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

    if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
        return this.day() || 7;
    }
}

// var defaultWeekdaysRegex = matchWord;
// export function weekdaysRegex (isStrict) {
//     if (this._weekdaysParseExact) {
//         if (!hasOwnProp(this, '_weekdaysRegex')) {
//             computeWeekdaysParse.call(this);
//         }
//         if (isStrict) {
//             return this._weekdaysStrictRegex;
//         } else {
//             return this._weekdaysRegex;
//         }
//     } else {
//         if (!hasOwnProp(this, '_weekdaysRegex')) {
//             this._weekdaysRegex = defaultWeekdaysRegex;
//         }
//         return this._weekdaysStrictRegex && isStrict ?
//             this._weekdaysStrictRegex : this._weekdaysRegex;
//     }
// }

// var defaultWeekdaysShortRegex = matchWord;
// export function weekdaysShortRegex (isStrict) {
//     if (this._weekdaysParseExact) {
//         if (!hasOwnProp(this, '_weekdaysRegex')) {
//             computeWeekdaysParse.call(this);
//         }
//         if (isStrict) {
//             return this._weekdaysShortStrictRegex;
//         } else {
//             return this._weekdaysShortRegex;
//         }
//     } else {
//         if (!hasOwnProp(this, '_weekdaysShortRegex')) {
//             this._weekdaysShortRegex = defaultWeekdaysShortRegex;
//         }
//         return this._weekdaysShortStrictRegex && isStrict ?
//             this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
//     }
// }

// var defaultWeekdaysMinRegex = matchWord;
// export function weekdaysMinRegex (isStrict) {
//     if (this._weekdaysParseExact) {
//         if (!hasOwnProp(this, '_weekdaysRegex')) {
//             computeWeekdaysParse.call(this);
//         }
//         if (isStrict) {
//             return this._weekdaysMinStrictRegex;
//         } else {
//             return this._weekdaysMinRegex;
//         }
//     } else {
//         if (!hasOwnProp(this, '_weekdaysMinRegex')) {
//             this._weekdaysMinRegex = defaultWeekdaysMinRegex;
//         }
//         return this._weekdaysMinStrictRegex && isStrict ?
//             this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
//     }
// }


function computeWeekdaysParse () {
    function cmpLenRev(a, b) {
        return b.length - a.length;
    }

    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
        i, mom, minp, shortp, longp;
    for (i = 0; i < 7; i++) {
        // make the regex if we don't have it already
        mom = createUTC([2000, 1]).day(i);
        minp = this.weekdaysMin(mom, '');
        shortp = this.weekdaysShort(mom, '');
        longp = this.weekdays(mom, '');
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
    }
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.
    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    for (i = 0; i < 7; i++) {
        shortPieces[i] = regexEscape(shortPieces[i]);
        longPieces[i] = regexEscape(longPieces[i]);
        mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;

    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
}
