//! moment.js locale configuration
//! locale : frisian (fy)
//! author : Robin van der Vliet : https://github.com/robin0van0der0v

import moment from '../moment';

var monthsShortWithDots = 'Jan._Feb._Mrt._Apr._Mai_Jun._Jul._Aug._Sep._Okt._Nov._Des.'.split('_'),
    monthsShortWithoutDots = 'Jan_Feb_Mrt_Apr_Mai_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_');

export default moment.defineLocale('fy', {
    months : 'Jannewaris_Febrewaris_Maart_April_Maaie_Juny_July_Augustus_Septimber_Oktober_Novimber_Desimber'.split('_'),
    monthsShort : function (m, format) {
        if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[m.month()];
        } else {
            return monthsShortWithDots[m.month()];
        }
    },
    weekdays : 'Snein_Moandei_Tiisdei_Woansdei_Yongersdei_Freed_Sneon'.split('_'),
    weekdaysShort : 'Si._Mo._Ti._Wo._To._Fr._So.'.split('_'),
    weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD-MM-YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[hjoed om] LT',
        nextDay: '[moarn om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[juster om] LT',
        lastWeek: '[ôfrûne] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'oer %s',
        past : '%s lyn',
        s : 'in pear sekonden',
        m : 'ien minút',
        mm : '%d minuten',
        h : 'ien oere',
        hh : '%d oeren',
        d : 'ien dei',
        dd : '%d dagen',
        M : 'ien moanne',
        MM : '%d moannen',
        y : 'ien jier',
        yy : '%d jierren'
    },
    ordinalParse: /\d{1,2}(ste|de)/,
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

