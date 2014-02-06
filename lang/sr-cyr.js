// moment.js language configuration
// language : Serbian-cyrillic (sr-cyr)
// author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {

    function translate(number, withoutSuffix, key) {        
        var translation = {
            m: withoutSuffix ? 'један минут' : 'једне минуте',
            mm: number + ' ' + ((number === 1) ? 'минут' : ((number >= 2 && number <= 4) ? 'минуте' : 'минута')),
            h: withoutSuffix ? 'један сат' : 'једног сата',
            hh: number + ' ' + ((number === 1) ? 'сат' : ((number >= 2 && number <= 4) ? 'сата' : 'сати')),
            dd: number + ' ' + ((number === 1) ? 'дан' : 'дана'),
            MM: number + ' ' + ((number === 1) ? 'месец' : ((number >= 2 && number <= 4) ? 'месеца' : 'месеци')),
            yy: number + ' ' + ((number === 1 || number >= 5) ? 'година' : 'године')
        };
        return translation[key];
    }

    return moment.lang('sr-cyr', {
        months: ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'],
        monthsShort: ['јан.', 'феб.', 'мар.', 'апр.', 'мај', 'јун', 'јул', 'авг.', 'сеп.', 'окт.', 'нов.', 'дец.'],
        weekdays: ['недеља', 'понедељак', 'уторак', 'среда', 'четвртак', 'петак', 'субота'],
        weekdaysShort: ['нед.', 'пон.', 'уто.', 'сре.', 'чет.', 'пет.', 'суб.'],
        weekdaysMin: ['не', 'по', 'ут', 'ср', 'че', 'пе', 'су'],
        longDateFormat: {
            LT: "H:mm",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY LT",
            LLLL: "dddd, D. MMMM YYYY LT"
        },
        calendar: {
            sameDay: '[данас у] LT',
            nextDay: '[сутра у] LT',

            nextWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[у] [недељу] [у] LT';
                case 3:
                    return '[у] [среду] [у] LT';
                case 6:
                    return '[у] [суботу] [у] LT';
                case 1:
                case 2:
                case 4:
                case 5:
                    return '[у] dddd [у] LT';
                }
            },
            lastDay  : '[јуче у] LT',
            lastWeek : function () {
                var lastWeekDay = [ 
                    '[прошле] [недеље] [у] LT',
                    '[прошлог] [понедељка] [у] LT',
                    '[прошлог] [уторка] [у] LT',
                    '[прошле] [среде] [у] LT',
                    '[прошлог] [четвртка] [у] LT',
                    '[прошлог] [петка] [у] LT',
                    '[прошле] [суботе] [у] LT'
                ];

                return lastWeekDay[this.day()];               
            },
            sameElse : 'L'
        },
        relativeTime : {
            future : "за %s",
            past   : "пре %s",
            s      : "неколико секунди",
            m      : translate,
            mm     : translate,
            h      : translate,
            hh     : translate,
            d      : "дан",
            dd     : translate,
            M      : "месец",
            MM     : translate,
            y      : "годину",
            yy     : translate
        },
        ordinal : '%d.',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
}));
