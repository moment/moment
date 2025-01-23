//! moment.js locale configuration
//! locale : Amharic (Ethiopia) [am-et]
//! author : Tekle Ayele : https://github.com/tekleayele

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var amEt = moment.defineLocale('am-et', {
        months: 'ጃንዩወሪ_ፌብሩወሪ_ማርች_ኤፕሪል_ሜይ_ጁን_ጁላይ_ኦገስት_ሴፕቴምበር_ኦክቶበር_ኖቬምበር_ዲሴምበር'.split(
            '_'
        ),
        monthsShort: 'ጃን_ፌብ_ማር_ኤፕር_ሜይ_ጁን_ጁላይ_ኦገ_ሴፕ_ኦክቶ_ኖቬ_ዲሴ'.split('_'),
        weekdays: 'እሑድ_ሰኞ_ማክሰኞ_እሮብ_ሀሙስ_ዓርብ_ቅዳሜ'.split(
            '_'
        ),
        weekdaysShort: 'እሑ_ሰኞ_ማክ_እሮ_ሀሙ_ዓር_ቅዳ'.split('_'),
        weekdaysMin: 'እሁ_ሰ_ማ_እ_ሀ_ዓ_ቅ'.split('_'),
        longDateFormat: {
            LT: 'h:mm A',
            LTS: 'h:mm:ss A',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY h:mm A',
            LLLL: 'dddd, D MMMM YYYY h:mm A',
        },
        calendar: {
            sameDay: '[ዛሬ በ] LT',
            nextDay: '[ነገ በ] LT',
            nextWeek: 'dddd [በ] LT',
            lastDay: '[ትናንትና በ] LT',
            lastWeek: '[ያለፈው ሳምንት] dddd [በ] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: '%s ውስጥ',
            past: '%s በፊት',
            s: 'ጥቂት ሰከንዶች',
            ss: '%d ሰከንዶች',
            m: 'አንድ ደቂቃ',
            mm: '%d ደቂቃዎች',
            h: 'አንድ ሰአት',
            hh: '%d ሰአታት',
            d: 'አንድ ቀን',
            dd: '%d ቀናት',
            M: 'አንድ ወር',
            MM: '%d ወራት',
            y: 'አንድ ዓመት',
            yy: '%d ዓመታት',
        },
        dayOfMonthOrdinalParse: /\d{1,2}(ኛ)/,
        ordinal: function (number) {
            return number + 'ኛ';
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7, // The week that contains Jan 7th is the first week of the year.
        },
    });

    return amEt;

})));
