//! moment.js locale configuration
//! locale : Pashto [ps]
//! author : Hanif Hefaz : https://github.com/hanifhefaz

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        && typeof require === 'function' ? factory(require('../../moment')) :
    typeof define === 'function' && define.amd ? define(['../moment'], factory) :
    factory(global.moment)
 }(this, (function (moment) { 'use strict';

     //! moment.js locale configuration

     var symbolMap = {
             1: '۱',
             2: '۲',
             3: '۳',
             4: '۴',
             5: '۵',
             6: '۶',
             7: '۷',
             8: '۸',
             9: '۹',
             0: '۰',
         },
         numberMap = {
             '۱': '1',
             '۲': '2',
             '۳': '3',
             '۴': '4',
             '۵': '5',
             '۶': '6',
             '۷': '7',
             '۸': '8',
             '۹': '9',
             '۰': '0',
         };

     var fa = moment.defineLocale('fa', {
         months: 'جنوری_فبروری_مارچ_اپریل_می_جون_جولای_اګست_سپتمبر_اکتوبر_نوامبر_ډیسامبر'.split(
             '_'
         ),
         monthsShort:
             'جنوری_فبروری_مارچ_اپریل_می_جون_جولای_اګست_سپتمبر_اکتوبر_نوامبر_ډیسامبر'.split(
                 '_'
             ),
         weekdays:
             'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split(
                 '_'
             ),
         weekdaysShort:
             'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split(
                 '_'
             ),
         weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
         weekdaysParseExact: true,
         longDateFormat: {
             LT: 'HH:mm',
             LTS: 'HH:mm:ss',
             L: 'DD/MM/YYYY',
             LL: 'D MMMM YYYY',
             LLL: 'D MMMM YYYY HH:mm',
             LLLL: 'dddd, D MMMM YYYY HH:mm',
         },
         meridiemParse: /مخکي له غرمي|وروسته له غرمي/,
         isPM: function (input) {
             return /وروسته له غرمي/.test(input);
         },
         meridiem: function (hour, minute, isLower) {
             if (hour < 12) {
                 return 'مخکي له غرمي';
             } else {
                 return 'وروسته له غرمي';
             }
         },
         calendar: {
             sameDay: '[نن بجي] LT',
             nextDay: '[سبا بجي] LT',
             nextWeek: 'dddd [بجي] LT',
             lastDay: '[پرون بجي] LT',
             lastWeek: 'dddd [مخکي] [بجي] LT',
             sameElse: 'L',
         },
         relativeTime: {
             future: 'په %s',
             past: '%s مخکي',
             s: 'څو ثانیي',
             ss: '%d ثانیي',
             m: 'یوه دقیقه',
             mm: '%d دقیقي',
             h: 'یو ساعت',
             hh: '%d ساعتونه',
             d: 'یوه ورځ',
             dd: '%d ورځي',
             M: 'یوه میاشت',
             MM: '%d میاشتي',
             y: 'یو کال',
             yy: '%d کلونه',
         },
         preparse: function (string) {
             return string
                 .replace(/[۰-۹]/g, function (match) {
                     return numberMap[match];
                 })
                 .replace(/،/g, ',');
         },
         postformat: function (string) {
             return string
                 .replace(/\d/g, function (match) {
                     return symbolMap[match];
                 })
                 .replace(/,/g, '،');
         },
         dayOfMonthOrdinalParse: /\d{1,2}م/,
         ordinal: '%dم',
         week: {
             dow: 6, // Saturday is the first day of the week.
             doy: 12, // The week that contains Jan 12th is the first week of the year.
         },
     });

     return ps;

 })));
