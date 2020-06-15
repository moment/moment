//! moment.js locale configuration
//! locale : Somali (Somalia) [so]
//! author : Abdifatah Abdilahi : https://github.com/abdifatahz

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var so = moment.defineLocale('so', {
        months: 'Janaayo_Febraayo_Abriil_Maajo_Juun_Luuliyo_Agoosto_Sebteembar_Oktoobar_Nofeembar_Diseembar'.split(
            '-'
        ),
 
        monthsShort: 'Jan_Feb_Mar_Abr_Mjo_Jun_Lyo_Agt_Seb_Okt_Nof_Dis'.split('_'),
        weekdays: 'Axad_Isniin_Talaada_Arbaca_Khamiis_Jimce_Sabti'.split(
            '_'
        ),
        weekdaysShort: 'Axd_Isn_Tal_Arb_Kha_Jim_Sbt'.split('_'),
        weekdaysMin: 'Ax_Is_Ta_Ar_Kh_Ji_Sa'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd, D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[Maanta markay tahay] LT',
            nextDay: '[Beri markay tahay] LT',
            nextWeek: 'dddd [markay tahay] LT',
            lastDay: '[Shalay markay ahayd at] LT',
            lastWeek: '[Hore] dddd [Markay ahayd] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: '%s gudahood',
            past: '%s kahor',
            s: 'ilbidhiqsiyo',
            ss: '%d ilbidhiqsi',
            m: 'daqiiqad',
            mm: '%d daqiiqo',
            h: 'saac',
            hh: '%d saac',
            d: 'maalin',
            dd: '%d maalmood',
            M: 'bil',
            MM: '%d bilood',
            y: 'sano',
            yy: '%d sanadood',
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: '%d.',
        week: {
            dow: 6, // Saturday is the first day of the week.
            doy: 12, // The week that contains Jan 12th is the first week of the year.
        },
    });

    return so;

})));
