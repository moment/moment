//! moment.js locale configuration
//! locale : Ottoman Turkish [ota]
//! authors : Ahmet Selim Çeleğen : https://github.com/as-celegen,
//!           Bilal Harun : https://github.com/bilalharun

import moment from '../moment';

var symbolMap = {
        1: '١',
        2: '٢',
        3: '٣',
        4: '٤',
        5: '٥',
        6: '٦',
        7: '٧',
        8: '٨',
        9: '٩',
        0: '٠',
    },
    numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0',
    };

export default moment.defineLocale('ota', {
    months: 'اوجاق_شباط_مارت_نیسان_مایس_حزیران_تموز_آغستوس_ایلول_أكيم_قاسم_آرالق'.split(
        '_'
    ),
    monthsShort: 'اوج_شب_مار_نیس_مای_حز_تم_آغس_ایل_أكي_قاس_آرا'.split('_'),
    weekdays: 'پازار_پازارایرتسی_صالی_چهارشنبە_پرشنبە_جمعە_جمعەایرتسی'.split(
        '_'
    ),
    weekdaysShort: 'پاز_پازت_صال_چهار_پرش_جم_جمت'.split('_'),
    weekdaysMin: 'پز_پت_صا_چه_پر_جم_جت'.split('_'),
    weekdaysParseExact: true,
    meridiem: function (hours, minutes, isLower) {
        if (hours < 12) {
            return 'أوأو';
        } else {
            return 'أوص';
        }
    },
    meridiemParse: /أوأو|أوص/,
    isPM: function (input) {
        return input === 'أوص';
    },
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    calendar: {
        sameDay: '[بوگون ساعت] LT',
        nextDay: '[یارین ساعت] LT',
        nextWeek: '[گلەجك] dddd [ساعت] LT',
        lastDay: '[دون] LT',
        lastWeek: '[گچن] dddd [ساعت] LT',
        sameElse: 'L',
    },
    relativeTime: {
        future: '%s صوڭرە',
        past: '%s أوڭجە',
        s: 'بر قاچ ثانیە',
        ss: '%d ثانیە',
        m: 'بر دقیقە',
        mm: '%d دقیقە',
        h: 'بر ساعت',
        hh: '%d ساعت',
        d: 'بر گون',
        dd: '%d گون',
        w: 'بر هفتە',
        ww: '%d هفتە',
        M: 'بر آی',
        MM: '%d آی',
        y: 'بر ییل',
        yy: '%d ییل',
    },
    ordinal: function (number, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'Do':
            case 'DD':
                return number;
            default:
                return number + "'نجی";
        }
    },
    preparse: function (string) {
        return string
            .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
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
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7, // The week that contains Jan 7th is the first week of the year.
    },
});
