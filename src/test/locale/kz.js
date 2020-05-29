//! moment.js language configuration
//! locale : Kazakh (China) [kz]
//! author: Musa Tabitay : https://github.com/Musa920

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        && typeof require === 'function' ? factory(require('../moment')) :
    typeof define === 'function' && define.amd ? define(['../moment'], factory) :
    factory(global.moment)
 }(this, (function (moment) { 'use strict';
 
     //! moment.js language configuration
 
     var kzCn = moment.defineLocale('kz', {
         months: 'قاڭتار_اقپان_ناۋرىز_ءساۋىر_مامىر_ماۋسىم_شىلدە_تامىز_قىركۇيەك_قازان_قاراشا_جەلتوقسان'.split(
             '_'
         ),
         monthsShort: 'قاڭتار_اقپان_ناۋرىز_ءساۋىر_مامىر_ماۋسىم_شىلدە_تامىز_قىركۇيەك_قازان_قاراشا_جەلتوقسان'.split(
             '_'
         ),
         weekdays: 'جەكسەنبى_دۇيسەنبى_سەيسەنبى_سارسەنبى_بەيسەنبى_جۇما_سەنبى'.split(
             '_'
         ),
         weekdaysShort: 'جە_دۇ_سە_سا_بە_جۇ_سە'.split('_'),
         weekdaysMin: 'جە_دۇ_سە_سا_بە_جۇ_سە'.split('_'),
         longDateFormat: {
             LT: 'HH:mm',
             LTS: 'HH:mm:ss',
             L: 'YYYY-MM-DD',
             LL: 'YYYY-جىلى M-اي D-كۇنى',
             LLL: 'YYYY-جىلى M-اي D-كۇنى، HH:mm',
             LLLL: 'dddd، YYYY-جىلى M-اي D-كۇنى، HH:mm',
         },
         meridiemParse: /ءتۇن ورتاسى|تاڭ|تۇستەن بۇرىن|ءتۇس|تۇستەن بۇرىن|كەش/,
         meridiemHour: function (hour, meridiem) {
             if (hour === 12) {
                 hour = 0;
             }
             if (
                 meridiem === 'ءتۇن ورتاسى' ||
                 meridiem === 'تاڭ' ||
                 meridiem === 'تۇستەن بۇرىن'
             ) {
                 return hour;
             } else if (meridiem === 'تۇستەن بۇرىن' || meridiem === 'كەش') {
                 return hour + 12;
             } else {
                 return hour >= 11 ? hour : hour + 12;
             }
         },
         meridiem: function (hour, minute, isLower) {
             var hm = hour * 100 + minute;
             if (hm < 600) {
                 return 'ءتۇن ورتاسى';
             } else if (hm < 900) {
                 return 'تاڭ';
             } else if (hm < 1130) {
                 return 'تۇستەن بۇرىن';
             } else if (hm < 1230) {
                 return 'ءتۇس';
             } else if (hm < 1800) {
                 return 'تۇستەن كەيىن';
             } else {
                 return 'كەش';
             }
         },
         calendar: {
             sameDay: '[بۇگىن ساعات] LT',
             nextDay: '[ەرتەڭ ساعات] LT',
             nextWeek: '[كەلەرگى] dddd [ساعات] LT',
             lastDay: '[كەشەگى] LT',
             lastWeek: '[الدىڭعى] dddd [ساعات] LT',
             sameElse: 'L',
         },
         relativeTime: {
             future: '%s كەيىن',
             past: '%s بۇرىن',
             s: 'نەشە مينۋت',
             ss: '%d سەكۋند',
             m: 'ءبىر مينۋت',
             mm: '%d مينۋت',
             h: 'ءبىر ساعات',
             hh: '%d ساعات',
             d: 'ءبىر كۇن',
             dd: '%d كۇن',
             M: 'ءبىر اي',
             MM: '%d اي',
             y: 'ءبىر جىل',
             yy: '%d جىل',
         },
 
         dayOfMonthOrdinalParse: /\d{1,2}(-كۇنى|-اي|-اپتا)/,
         ordinal: function (number, period) {
             switch (period) {
                 case 'd':
                 case 'D':
                 case 'DDD':
                     return number + '-كۇنى';
                 case 'w':
                 case 'W':
                     return number + '-اپتا';
                 default:
                     return number;
             }
         },
         preparse: function (string) {
             return string.replace(/،/g, ',');
         },
         postformat: function (string) {
             return string.replace(/,/g, '،');
         },
         week: {
             // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
             dow: 1, // Monday is the first day of the week.
             doy: 7, // The week that contains Jan 1st is the first week of the year.
         },
     });
 
     return kzCn;
 
 })));
 