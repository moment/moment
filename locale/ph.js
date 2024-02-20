//! moment.js locale configuration
//! locale : Philippines
//! author : Mowgli Mecha

; (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        && typeof require === 'function' ? factory(require('../moment')) :
        typeof define === 'function' && define.amd ? define(['../moment'], factory) :
            factory(global.moment)
}(this, (function (moment) {
    'use strict';

    //! moment.js locale configuration

    var ph = moment.defineLocale('ph', {
        months: 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Octobre_Nobyembre_Desyembre'.split(
            '_'
        ),
        monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
            '_'
        ),
        weekdays: 'linggo_lunes_martes_myerkoles_huwebes_byernes_sabado'.split('_'),
        weekdaysShort: 'dom._lun._mar._mye._hue._bye._sab.'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A',
        },
        calendar: {
            sameDay: '[Ngayon at] LT',
            nextDay: '[Bukas at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Kahapon at] LT',
            lastWeek: '[Isang Linggo] dddd [at] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few segundo',
            ss: '%d segundos',
            m: 'a minuto',
            mm: '%d minutos',
            h: 'an oras',
            hh: '%d oras',
            d: 'a araw',
            dd: '%d araw',
            M: 'a buwan',
            MM: '%d buwan',
            y: 'a taon',
            yy: '%d taon',
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    ~~((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                            ? 'st'
                            : b === 2
                                ? 'nd'
                                : b === 3
                                    ? 'rd'
                                    : 'th';
            return number + output;
        },
        week: {
            dow: 0, // Sunday is the first day of the week.
            doy: 4, // The week that contains Jan 4th is the first week of the year.
        },
    });

    return ph;

})));
