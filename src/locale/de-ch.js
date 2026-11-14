//! moment.js locale configuration
//! locale : German (Switzerland) [de-ch]
//! author : sschueller : https://github.com/sschueller

// based on: https://www.bk.admin.ch/dokumentation/sprachen/04915/05016/index.html?lang=de#

import moment from '../moment';

var monthsParse = [
        /^jan/i,
        /^feb/i,
        /^mär/i,
        /^apr/i,
        /^mai/i,
        /^jun/i,
        /^jul/i,
        /^aug/i,
        /^sep/i,
        /^okt/i,
        /^nov/i,
        /^dez/i,
    ],
    monthsRegex =
        /^(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember|Jan\.?|Feb\.?|Mär\.?|Apr\.?|Jun\.?|Jul\.?|Aug\.?|Sep\.?|Okt\.?|Nov\.?|Dez\.?)/i;

function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        m: ['eine Minute', 'einer Minute'],
        h: ['eine Stunde', 'einer Stunde'],
        d: ['ein Tag', 'einem Tag'],
        dd: [number + ' Tage', number + ' Tagen'],
        w: ['eine Woche', 'einer Woche'],
        M: ['ein Monat', 'einem Monat'],
        MM: [number + ' Monate', number + ' Monaten'],
        y: ['ein Jahr', 'einem Jahr'],
        yy: [number + ' Jahre', number + ' Jahren'],
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

export default moment.defineLocale('de-ch', {
    months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
        '_'
    ),
    monthsShort:
        'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),

    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex:
        /^(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)/i,
    monthsShortStrictRegex:
        /^(Jan\.?|Feb\.?|März|Mär\.?|Apr\.?|Mai|Juni|Jun\.?|Juli|Jul\.?|Aug\.?|Sep\.?|Okt\.?|Nov\.?|Dez\.?)/i,

    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,

    weekdays:
        'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split(
            '_'
        ),
    weekdaysShort: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd, D. MMMM YYYY HH:mm',
    },
    calendar: {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]',
    },
    relativeTime: {
        future: 'in %s',
        past: 'vor %s',
        s: 'ein paar Sekunden',
        ss: '%d Sekunden',
        m: processRelativeTime,
        mm: '%d Minuten',
        h: processRelativeTime,
        hh: '%d Stunden',
        d: processRelativeTime,
        dd: processRelativeTime,
        w: processRelativeTime,
        ww: '%d Wochen',
        M: processRelativeTime,
        MM: processRelativeTime,
        y: processRelativeTime,
        yy: processRelativeTime,
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
});
