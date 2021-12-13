//! moment.js locale configuration
//! locale : Luxembourgish [lu]
//! author : TheMauricelux : https://github.com/TheMauricelux

import moment from '../moment';

function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        m: ['eng Minutt', 'enger Minutt'],
        h: ['eng Stonn', 'enger Stonn'],
        d: ['een Dag', 'engem Dag'],
        dd: [number + ' Deeg', number + ' Deeg'],
        w: ['eng Woch', 'enger Woch'],
        M: ['een Mount', 'engem Mount'],
        MM: [number + ' Méint', number + ' Méinten'],
        y: ['een Joer', 'engem Joer'],
        yy: [number + ' Joer', number + ' Joeren'],
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

export default moment.defineLocale('lu', {
    months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split(
        '_'
    ),
    monthsShort:
        'Jan._Feb._Mäerz_Abr._Mee_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split(
            '_'
        ),
    monthsParseExact: true,
    weekdays:
        'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split(
            '_'
        ),
    weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd, D. MMMM YYYY HH:mm',
    },
    calendar: {
        sameDay: '[haut um] LT [Auer]',
        sameElse: 'L',
        nextDay: '[muer um] LT [Auer]',
        nextWeek: 'dddd [um] LT [Auer]',
        lastDay: '[gëschter um] LT [Auer]',
        lastWeek: '[leschten] dddd [um] LT [Auer]',
    },
    relativeTime: {
        future: 'an %s',
        past: 'virun %s',
        s: 'e puer Sekonnen',
        ss: '%d Sekonnen',
        m: processRelativeTime,
        mm: '%d Minutten',
        h: processRelativeTime,
        hh: '%d Stonnen',
        d: processRelativeTime,
        dd: processRelativeTime,
        w: processRelativeTime,
        ww: '%d Wochen',
        M: processRelativeTime,
        MM: processRelativeTime,
        y: processRelativeTime,
        yy: processRelativeTime,
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
});
