//! moment.js locale configuration
//! locale : Urdu [ur]
//! Translation : Muhammad Shuaib : https://github.com/yethrosh

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';


    var symbolMap = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0'
    }, numberMap = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0': '0'
    };

    var ur = moment.defineLocale('ur', {
        months : 'جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر'.split('_'),
        monthsShort : 'جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر'.split('_'),
        weekdays : 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_سنیچر‌'.split('_'),
        weekdaysShort : 'اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_سنیچر‌'.split('_'),
        weekdaysMin : 'ا_پ_م_ب_ج_جم_س'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        meridiemParse: /قبل دوپہر|دوپہر بعد/,
        isPM: function (input) {
            return /دوپہر بعد/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 12) {
                return 'قبل دوپہر';
            } else {
                return 'دوپہر بعد';
            }
        },
        calendar : {
            sameDay : '[آج بوقت] LT',
            nextDay : '[کل بوقت] LT',
            nextWeek : 'dddd [بوقت] LT',
            lastDay : '[گزشتہ کل بوقت] LT',
            lastWeek : '[آخری] dddd [بوقت] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s میں',
            past : '%s قبل',
            s : 'کچھ سیکنڈ',
            m : 'ایک منٹ',
            mm : '%d منٹ',
            h : 'ایک گھنٹہ',
            hh : '%d گھنٹے',
            d : 'ایک دن',
            dd : '%d دن',
            M : 'ایک مہینہ',
            MM : '%d مہینے',
            y : 'ایک سال',
            yy : '%d برس'
        },
        preparse: function (string) {
            return string.replace(/[0-9]/g, function (match) {
                return numberMap[match];
            }).replace(/،/g, ',');
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            }).replace(/,/g, '،');
        },
        week : {
            dow : 6, // Saturday is the first day of the week.
            doy : 12  // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ur;

}));
