//! moment.js locale configuration
//! locale : Konkani Latin script [gom-latn]
//! author : The Discoverer : https://github.com/WikiDiscoverer

import moment from '../moment';

function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        's': ['second', 'secondanim'],
        'm': ['ek minute', 'eka mintan'],
        'mm': [number + ' mintam', number + ' mintanim'],
        'h': ['ek hor', 'eka horan'],
        'hh': [number + ' hor', number + ' horanim'],
        'd': ['ek dis', 'eka disan'],
        'dd': [number + ' dis', number + 'disanim'],
        'M': ['ek mhoino', 'eka mhoinean'],
        'MM': [number + ' mhoine', number + 'mhoineanim'],
        'y': ['ek voros', 'eka vorsan'],
        'yy': [number + ' vorsam', number + ' vorsanim']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

export default moment.defineLocale('gom-latn', {
    months : 'Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr'.split('_'),
    monthsShort : 'Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.'.split('_'),
    monthsParseExact : true,
    weekdays : "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split('_'),
    weekdaysShort : 'Ait._Som._Mon._Bud._Bre._Suk._Son.'.split('_'),
    weekdaysMin : 'Ai_Sm_Mo_Bu_Br_Su_Sn'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'A h:mm [vazta]',
        LTS : 'A h:mm:ss [vazta]',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY LT',
        LLLL : 'dddd, MMMM[achea] D, YYYY, LT'
    },
    calendar : {
        sameDay: '[Aiz] LT',
        nextDay: '[Faleam] LT',
        nextWeek: '[Ieta to] dddd LT',
        lastDay: '[Kal] LT',
        lastWeek: '[Fatlo] dddd LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : '%s',
        past : '%s adim',
        s : processRelativeTime,
        m : processRelativeTime,
        mm : processRelativeTime,
        h : processRelativeTime,
        hh : processRelativeTime,
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    ordinalParse: /\d{1,2}er/,
    ordinal : '%der',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    },
    meridiemParse: /Rati|Sokalli|Donparam|Sanje/,
    meridiemHour : function (hour, meridiem) {
        if (hour === 12) {
            hour = 0;
        }
        if (meridiem === 'Rati') {
            return hour < 4 ? hour : hour + 12;
        } else if (meridiem === 'Sokalli') {
            return hour;
        } else if (meridiem === 'Donparam') {
            return hour > 12 ? hour : hour + 12;
        } else if (meridiem === 'Sanje') {
            return hour + 12;
        }
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return 'Rati';
        } else if (hour < 12) {
            return 'Sokalli';
        } else if (hour < 16) {
            return 'Donparam';
        } else if (hour < 20) {
            return 'Sanje';
        } else {
            return 'Rati';
        }
    }
});
