// moment.js locale configuration
// language : Kazakh
// country : Kazakhstan
// author : Kuanysh B. : https://github.com/kuka

'use strict';
/* global moment */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    var suffixes = {
        1: '\'ші',
        5: '\'ші',
        8: '\'ші',
        70: '\'ші',
        80: '\'ші',

        2: '\'ші',
        7: '\'ші',
        20: '\'ші',
        50: '\'ші',

        3: '\'ші',
        4: '\'ші',
        100: '\'ші',

        6: '\'шы',

        9: '\'шы',
        10: '\'шы',
        30: '\'шы',

        60: '\'шы',
        90: '\'шы'
    };

    return moment.defineLocale('kk', {
        months: 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
        monthsShort: 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
        weekdays: 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
        weekdaysShort: 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
        weekdaysMin: 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            L: 'DD.MM.YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY LT',
            LLLL: 'dddd, D MMMM YYYY LT'
        },
        calendar: {
            sameDay: '[Бүгін] LT',
            nextDay: '[Ертен] LT',
            nextWeek: '[Келесі аптада] dddd [сағат] LT',
            lastDay: '[Кеше] LT',
            lastWeek: '[Өткен аптада] dddd [сағат] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: '%s бұрын',
            past: '%s бұрын',
            s: 'бірнеше секунд',
            m: '1 минут',
            mm: '%d минут',
            h: 'бір сағат',
            hh: '%d сағат',
            d: 'бір күн',
            dd: '%d күн',
            M: 'бір ай',
            MM: '%d ай',
            y: 'бір жыл',
            yy: '%d жыл'
        },
        ordinal: function (number) {
            if (number === 0) { // special case for zero
                return number + '\'шы';
            }

            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;

            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7 // The week that contains Jan 1st is the first week of the year.
        }

    });
}));
