//! moment.js locale configuration
//! locale : filipino (fil)
//! author : Guillaume Zurbach : https://github.com/gzurbach

import moment from '../moment';

export default moment.defineLocale('fil', {
    months : 'enero_pebrero_marso_abril_mayo_hunyo_hulyo_agosto_setyembre_oktubre_nobyembre_disyembre'.split('_'),
    monthsShort : 'ene._peb._mar._abr._mayo_hun._hul._ago._set._okt._nob._dis.'.split('_'),
    weekdays : 'linggo_lunes_martes_miyerkules_huwebes_biyernes_sabado'.split('_'),
    weekdaysShort : 'lin._lun._mar._miy._huw._biy._sab.'.split('_'),
    weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sa'.split('_'),
    longDateFormat : {
        LT : 'h:mm',
        LTS : 'h:mm:ss',
        L : 'MM-DD-YYYY',
        LL : 'MMMM D YYYY',
        LLL : 'MMMM D YYYY h:mm',
        LLLL : 'dddd, MMMM D, YYYY h:mm'
    },
    calendar : {
        sameDay: '[Ngayon sa] LT',
        nextDay: '[Bukas sa] LT',
        nextWeek: 'dddd [sa] LT',
        lastDay: '[Kahapon sa] LT',
        lastWeek: '[Huling] dddd [sa] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'sa %s',
        past : '%s na ang nakalipas',
        s : 'ng ilang segundo',
        m : 'isang minuto',
        mm : '%d minuto',
        h : 'isang oras',
        hh : '%d oras',
        d : 'isang araw',
        dd : '%d araw',
        M : 'isang buwan',
        MM : '%d buwan',
        y : 'isang taon',
        yy : '%d taon'
    },
    ordinalParse: /(ika-)\d{1,2}/,
    ordinal : 'ika-%d',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

