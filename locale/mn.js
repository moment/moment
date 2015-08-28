//! moment.js locale configuration
//! locale : Mongolian (mn)
//! author : Batbayar Bazarragchaa : https://github.com/digz6666

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';


    var mn = moment.defineLocale('mn', {
        months : '1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар'.split('_'),
        monthsShort : '1_2_3_4_5_6_7_8_9_10_11_12'.split('_'),
        weekdays : 'Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба'.split('_'),
        weekdaysShort : 'Ням_Дав_Мяг_Лха_Пүр_Баа_Бям'.split('_'),
        weekdaysMin : 'Ня_Да_Мя_Лх_Пү_Ба_Бя'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY-MM-DD',
            LL : 'dddd, YYYY-MM-DD',
            LLL : 'YYYY-MM-DD, HH:mm',
            LLLL : 'dddd, YYYY-MM-DD, HH:mm'
        },
        calendar : {
            sameDay : '[Өнөөдөр] LT',
            nextDay : '[Маргааш] LT',
            nextWeek : '[Дараа 7 хоног] dddd, LT',
            lastDay : '[Өчигдөр] LT',
            lastWeek : '[Өнгөрсөн 7 хоног] dddd, LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s дараа',
            past : '%s өмнө',
            s : 'Хормын',
            m : 'Минутын',
            mm : '%d минутын',
            h : 'Цагийн',
            hh : '%d цагийн',
            d : 'Өдрийн',
            dd : '%d өдрийн',
            M : 'Сарын',
            MM : '%d сарын',
            y : 'Жилийн',
            yy : '%d жилийн'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return mn;

}));