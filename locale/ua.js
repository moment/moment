//! moment.js locale configuration
//! locale : Ukraine [ua]
//! author : Viktorminator : https://github.com/Viktorminator
//! Author : Menelion Elensúle : https://github.com/Oire
//! author : Коренберг Марк : https://github.com/socketpair
//! author : Vasiliy Burlaka : https://github.com/vasiliyBurlaka

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
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
            'dd': 'день_дня_днiв',
            'MM': 'мiсяць_місяця_місяців',
            'yy': 'рік_року_років'
        };
        if (key === 'm') {
            return withoutSuffix ? 'хвилина' : 'хвилину';
        }
        else {
            return number + ' ' + plural(format[key], +number);
        }
    }
    var monthsParse = [/^січ/i, /^лют/i, /^бер/i, /^квiт/i, /^трав/i, /^черв/i, /^лип/i, /^серп/i, /^вер/i, /^жов/i, /^лис/i, /^груд/i];

    // CLDR data:          http://www.unicode.org/cldr/charts/28/summary/uk.html

    var ua = moment.defineLocale('ua', {
        months : {
            format: 'січеня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопаду_грудня'.split('_'),
            standalone: 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
        },
        monthsShort : {
            format: 'січ._лют._бер._квіт._трав._черв._лип._серп._вер._жовт._лист._груд.'.split('_'),
            standalone: 'січ._лют._бер._квіт._трав._черв._лип._серп._вер._жовт._лист._груд.'.split('_')
        },
        weekdays : {
            standalone: 'неділя_понеділок_вівторок_середа_четвер_пʼятниця_субота'.split('_'),
            format: 'неділю_понеділок_вівторок_середу_четвер_пʼятницю_суботу'.split('_'),
            isFormat: /\[ ?[Уу] ?(?:минулу|наступну|цю)? ?\] ?dddd/
        },
        weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
        monthsParse : monthsParse,
        longMonthsParse : monthsParse,
        shortMonthsParse : monthsParse,

        // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
        monthsRegex: /^(січ(?:ень|ня|\.?)|лют(?:ий|ого|\.?)|берез(?:ень|ня)|бер\.?|квіт(?:ень|ня|\.?)|трав(?:ень|ня|\.?)|черв(?:ень|ня|\.?)|лип(?:ень|ня|\.?)|серп(?:ень|ня|\.?)|верес(?:ень|ня)|вер\.?|жовт(?:ень|ня|\.?)|листопаду?|лист\.?|груд(?:ень|ня|\.?))/i,

        /*
         *
         январь     січень
         февраль   лютий
         март        березень
         апрель     квітень
         май         травень
         июнь       червень
         июль       липень
         август     серпень
         сентябрь  вересень
         октябрь   жовтень
         ноябрь    листопад
         декабрь   грудень
         * */

        // копия предыдущего
        monthsShortRegex: /^(січ(?:ень|ня|\.?)|лют(?:ий|ого|\.?)|берез(?:ень|ня)|бер\.?|квіт(?:ень|ня|\.?)|трав(?:ень|ня|\.?)|черв(?:ень|ня|\.?)|лип(?:ень|ня|\.?)|серп(?:ень|ня|\.?)|верес(?:ень|ня)|вер\.?|жовт(?:ень|ня|\.?)|листопаду?|лист\.?|груд(?:ень|ня|\.?))/i,

        // полные названия с падежами
        monthsStrictRegex: /^(січ(?:ень|ня)|лют(?:ий|ого)|берез(?:ень|ня)|квіт(?:ень|ня)|трав(?:ень|ня)|черв(?:ень|ня)|лип(?:ень|ня)|серп(?:ень|ня)|верес(?:ень|ня)|жовт(?:ень|ня)|листопаду?|груд(?:ень|ня))/i,

        // Выражение, которое соотвествует только сокращённым формам
        monthsShortStrictRegex: /^(січ\.|лют\.|бер\.|квіт\.|трав\.|черв\.|лип\.|серп\.|вер\.|жовт\.|лист?\.|груд\.)/i,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY г.',
            LLL : 'D MMMM YYYY г., HH:mm',
            LLLL : 'dddd, D MMMM YYYY г., HH:mm'
        },
        calendar : {
            sameDay: '[Сьогодні о] LT',
            nextDay: '[Завтра о] LT',
            lastDay: '[Вчора о] LT',
            nextWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                        case 3:
                        case 5:
                        case 6:
                            return '[У наступну] dddd [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[У наступний] dddd [в] LT';
                    }
                } else {
                        return '[У] dddd [в] LT';
                }
            },
            lastWeek: function (now) {
                if (now.week() !== this.week()) {
                    switch (this.day()) {
                        case 0:
                        case 3:
                        case 5:
                        case 6:
                            return '[У минулу] dddd [в] LT';
                        case 1:
                        case 2:
                        case 4:
                            return '[У минулий] dddd [в] LT';
                    }
                } else {
                    return '[У] dddd [в] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'через %s',
            past : '%s назад',
            s : 'декілька секунд',
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : 'година',
            hh : relativeTimeWithPlural,
            d : 'день',
            dd : relativeTimeWithPlural,
            M : 'місяць',
            MM : relativeTimeWithPlural,
            y : 'рік',
            yy : relativeTimeWithPlural
        },
        meridiemParse: /ночі|ранку|дня|вечора/i,
        isPM : function (input) {
            return /^(дня|вечора)$/.test(input);
        },
        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return 'ночі';
            } else if (hour < 12) {
                return 'ранку';
            } else if (hour < 17) {
                return 'дня';
            } else {
                return 'вечора';
            }
        },


        //******* TODO: do not anderstand what is it, can't translate:
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
        //******* end TODO

        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });

    return ua;

}));