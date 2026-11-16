//! moment.js locale configuration
//! locale : Uzbek [uz]
//! author : Sardor Muminov : https://github.com/muminoff

import moment from '../moment';

export default moment.defineLocale('uz', {
    months: 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split(
        '_'
    ),
    monthsShort: 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
    weekdays: 'якшанба_душанба_сешанба_чоршанба_пайшанба_жума_шанба'.split('_'),
    weekdaysShort: 'якш_душ_сеш_чор_пай_жум_шан'.split('_'),
    weekdaysMin: 'як_ду_се_чо_па_жу_ша'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'D MMMM YYYY, dddd HH:mm',
    },
    calendar: {
        sameDay: '[Бугун соат] LT [да]',
        nextDay: '[Эртага] LT [да]',
        nextWeek: 'dddd [куни соат] LT [да]',
        lastDay: '[Кеча соат] LT [да]',
        lastWeek: '[Утган] dddd [куни соат] LT [да]',
        sameElse: 'L',
    },
    relativeTime: {
        future: '%sдан сўнг',
        past: '%s олдин',
        s: 'сония',
        ss: '%d сония',
        m: 'бир дақиқа',
        mm: '%d дақиқа',
        h: 'бир соат',
        hh: '%d соат',
        d: 'бир кун',
        dd: '%d кун',
        M: 'бир ой',
        MM: '%d ой',
        y: 'бир йил',
        yy: '%d йил',
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7, // The week that contains Jan 4th is the first week of the year.
    },
});
