//! moment.js locale configuration
//! locale : Pashto [ps]
//! author : Hanif Hefaz : https://github.com/hanifhefaz

import moment from '../moment';

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
    },
    months = {
        format: 'جنوري_فبروري_مارچ_اپریل_مۍ_جون_جولای_اګست_سېپتمبر_اکتوبر_نومبر_دسمبر'.split(
            '_'
        ),
        standalone:
            'جنوري_فېبروري_مارچ_اپریل_مۍ_جون_جولای_اګست_سپتمبر_اکتوبر_نومبر_دسمبر'.split(
                '_'
            ),
        isFormat: /D[oD]?(\[[^\[\]]*\]|\s|,)+MMMM?/,
    },
    monthsShort = {
        format: 'جنوري_فبروري_مارچ_اپریل_مۍ_جون_جولای_اګست_سېپتمبر_اکتوبر_نومبر_دسمبر'.split(
            '_'
        ),
        standalone:
            'جنوري_فبروري_مارچ_اپریل_مۍ_جون_جولای_اګست_سپتمبر_اکتوبر_نومبر_دسمبر'.split(
                '_'
            ),
    },
    monthsParse = [
        /^جنوري$/i,
        /^(فبروري|فېبروري)$/i,
        /^مارچ$/i,
        /^اپریل$/i,
        /^مۍ$/i,
        /^جون$/i,
        /^جولای$/i,
        /^اګست$/i,
        /^(سپتمبر|سېپتمبر)$/i,
        /^اکتوبر$/i,
        /^نومبر$/i,
        /^دسمبر$/i,
    ],
    monthsRegex =
        /^(جنوري|فبروري|فېبروري|مارچ|اپریل|مۍ|جون|جولای|اګست|سپتمبر|سېپتمبر|اکتوبر|نومبر|دسمبر)/i;

function relativeTime(number, withoutSuffix, key, isFuture) {
    var format =
        isFuture && !withoutSuffix
            ? {
                  s: 'څو ثانيو',
                  ss: '%d ثانيو',
                  m: 'يوه دقيقه',
                  mm: '%d دقيقو',
                  h: 'يو ساعت',
                  hh: '%d ساعتو',
                  d: 'يوه ورځ',
                  dd: '%d ورځو',
                  M: 'يوه مياشت',
                  MM: '%d مياشتو',
                  y: 'يو کال',
                  yy: '%d کالونو',
              }
            : {
                  s: 'څو ثانيې',
                  ss: '%d ثانيې',
                  m: 'يوه دقيقه',
                  mm: '%d دقيقې',
                  h: 'يو ساعت',
                  hh: '%d ساعتونه',
                  d: 'يوه ورځ',
                  dd: '%d ورځې',
                  M: 'يوه مياشت',
                  MM: '%d مياشتې',
                  y: 'يو کال',
                  yy: '%d کاله',
              };

    return format[key].replace('%d', number);
}

export default moment.defineLocale('ps', {
    months: months,
    monthsShort: monthsShort,
    monthsParse: monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    monthsRegex: monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: monthsRegex,
    monthsShortStrictRegex: monthsRegex,
    weekdays: 'یکشنبه_دوشنبه_سه شنبه_چهارشنبه_پنج شنبه_جمعه_شنبه'.split('_'),
    weekdaysShort: 'یکشنبه_دوشنبه_سه شنبه_چهارشنبه_پنج شنبه_جمعه_شنبه'.split(
        '_'
    ),
    weekdaysMin: 'ی_د_س_چ_پ_ج_ش'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'YYYY/M/D',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY H:mm',
        LLLL: 'dddd D, MMMM, YYYY [په] H:mm',
    },
    meridiemParse: /غ\.م|غ\.و\./,
    isPM: function (input) {
        return input === 'غ.و.';
    },
    meridiem: function (hour) {
        return hour < 12 ? 'غ.م' : 'غ.و.';
    },
    calendar: {
        sameDay: '[نن په] LT',
        nextDay: '[سبا په] LT',
        nextWeek: 'dddd [په] LT',
        lastDay: '[پرون په] LT',
        lastWeek: 'dddd [په] LT',
        sameElse: 'L',
    },
    relativeTime: {
        future: 'په %s کې',
        past: '%s مخکې',
        s: relativeTime,
        ss: relativeTime,
        m: relativeTime,
        mm: relativeTime,
        h: relativeTime,
        hh: relativeTime,
        d: relativeTime,
        dd: relativeTime,
        M: relativeTime,
        MM: relativeTime,
        y: relativeTime,
        yy: relativeTime,
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
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: '%d',
    week: {
        dow: 6, // Saturday is the first day of the week.
        doy: 12, // The week that contains Jan 12th is the first week of the year.
    },
});
