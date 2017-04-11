//! moment.js locale configuration
//! locale : Монгол [mn]
//! author : Zorig Ganbold  : https://github.com/zorig

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';


    var mn = moment.defineLocale('mn', {
        months : 'Нэгдүгээр-сар_Хоёрдугаар-сар_Гуравдугаар-сар_Дөрөвдүгээр-сар_Тавдугаар-сар_Зургаадугаар-сар_Долоодугаар-сар_Наймдугаар-сар_Есдүгээр-сар_Аравдугаар-сар_Арван Нэгдүгээр-сар_Арван Хоёрдугаар-сар'.split('_'),
        monthsShort : '1-сар_2-сар_3-сар_4-сар_5-сар_6-сар_7-сар_8-сар_9-сар_10-сар_11-сар_12-сар'.split('_'),
        weekdays : 'Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба'.split('_'),
        weekdaysShort : 'Ням_Дав_Мяг_Лха_Пүр_Баа_Бям'.split('_'),
        weekdaysMin : 'Ня_Да_Мя_Лх_Пү_Ба_Бя'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY HH:mm',
            LLLL : 'dddd, D MMMM YYYY HH:mm'
        },
        calendar : {
            sameDay : '[Өнөөдөр] LT',
            nextDay : '[Маргааш] LT',
            nextWeek : 'dddd [нд] LT',
            lastDay : '[Өчигдөр] LT',
            lastWeek : '[Өнгөрсөн] dddd [гаригт] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s',
            past : '%s өмнө',
            s : 'хэдэн хорoм',
            m : 'нэг минут',
            mm : '%d минут',
            h : 'нэг цаг',
            hh : '%d цаг',
            d : 'нэг өдөр',
            dd : '%d өдөр',
            M : 'нэг сар',
            MM : '%d сар',
            y : 'нэг жил',
            yy : '%d жил'
        },
        ordinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'нд' :
                (b === 1) ? 'нд' :
                (b === 2) ? 'нд' :
                (b === 3) ? 'нд' : 'нд';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return mn;

}));
