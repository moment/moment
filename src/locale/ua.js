//! moment.js locale configuration
//! locale : Ukrainian (ua)
//! Author : Andrew Zhilin : https://github.com/zhil
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';


    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
            'hh': 'година_години_годин',
            'dd': 'день_дні_днів',
            'MM': 'місяц_місяца_місяців',
            'yy': 'рік_роки_років'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвилина' : 'хвилину';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    function monthsCaseReplace(m, format) {
        var months = {
            'nominative': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
            'accusative': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_')
        },
        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';
        return months[nounCase][m.month()];
    }
    function monthsShortCaseReplace(m, format) {
        var monthsShort = {
            'nominative': 'січ_лют_бер_квіт_трав_черв_липн_серпн_вер_жов_лист_груд'.split('_'),
            'accusative': 'січ_лют_бер_квіт_трав_черв_липн_серпн_вер_жов_лист_груд'.split('_')
        },
        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';
        return monthsShort[nounCase][m.month()];
    }
    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'неділя_понеділок_вівторок_середа_четверг_п’ятниця_субота'.split('_'),
            'accusative': 'неділю_понеділок_вівторок_середу_четверг_п’ятниця_суботу'.split('_')
        },
        nounCase = (/\[ ?[Вв] ?(?:минулу|наступну|цю)? ?\] ?dddd/).test(format) ?
            'accusative' :
            'nominative';
        return weekdays[nounCase][m.day()];
    }

    var ua = moment.defineLocale('ua', {
        months : monthsCaseReplace,
        monthsShort : monthsShortCaseReplace,
        weekdays : weekdaysCaseReplace,
        weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        monthsParse : [/^січ/i, /^лют/i, /^бер/i, /^квіт/i, /^трав/i, /^черв/i, /^лип/i, /^серп/i, /^вер/i, /^жовт/i, /^лист/i, /^груд/i],
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY г.',
            LLL : 'D MMMM YYYY г., HH:mm',
            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar : {
            sameDay: '[Сьогодні у] LT',
            nextDay: '[Завтра у] LT',
            lastDay: '[Вчора в] LT',
            nextWeek: function () {
                return this.day() === 2 ? '[Во] dddd [в] LT' : '[В] dddd [в] LT';
            },
            lastWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                    case 0:
                        return '[В минулу] dddd [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В минулий] dddd [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В минулу] dddd [в] LT';
                    }
                } else {
                    return '[У] dddd [в] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'через %s',
            past : '%s тому',
            s : 'кілька секунд',
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : 'година',
            hh : relativeTimeWithPlural,
            d : 'день',
            dd : relativeTimeWithPlural,
            M : 'місяц',
            MM : relativeTimeWithPlural,
            y : 'рік',
            yy : relativeTimeWithPlural
        },
        meridiemParse: /вночі|ранку|дня|вечера/i,
        isPM : function (input) {
            return /^(дня|вечера)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночі';
            } else if (hour < 12) {
                return 'ранку';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечера';
            }
        },
        ordinalParse: /\d{1,2}-(й|го|я)/,
        ordinal: function (number, period) {
            switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '-й';
            case 'D':
                return number + '-го';
            case 'w':
            case 'W':
                return number + '-я';
            default:
                return number;
            }
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ua;

}));
