//! moment.js locale configuration
//! locale : euskara (eu)
//! author : Eneko Illarramendi : https://github.com/eillarra

import moment from '../moment';

export default moment.defineLocale('eu', {
    months : 'Urtarrila_Otsaila_Martxoa_Apirila_Maiatza_Ekaina_Uztaila_Abuztua_Iraila_Urria_Azaroa_Abendua'.split('_'),
    monthsShort : 'Urt._Ots._Mar._Api._Mai._Eka._Uzt._Abu._Ira._Urr._Aza._Abe.'.split('_'),
    weekdays : 'Igandea_Astelehena_Asteartea_Asteazkena_Osteguna_Ostirala_Larunbata'.split('_'),
    weekdaysShort : 'Ig._Al._Ar._Az._Og._Ol._Lr.'.split('_'),
    weekdaysMin : 'Ig_Al_Ar_Az_Og_Ol_Lr'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY-MM-DD',
        LL : 'YYYY[ko] MMMM[ren] D[a]',
        LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
        LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
        l : 'YYYY-M-D',
        ll : 'YYYY[ko] MMM D[a]',
        lll : 'YYYY[ko] MMM D[a] HH:mm',
        llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
    },
    calendar : {
        sameDay : '[gaur] LT[etan]',
        nextDay : '[bihar] LT[etan]',
        nextWeek : 'dddd LT[etan]',
        lastDay : '[atzo] LT[etan]',
        lastWeek : '[aurreko] dddd LT[etan]',
        sameElse : 'L'
    },
    relativeTime : {
        future : '%s barru',
        past : 'duela %s',
        s : 'segundo batzuk',
        m : 'minutu bat',
        mm : '%d minutu',
        h : 'ordu bat',
        hh : '%d ordu',
        d : 'egun bat',
        dd : '%d egun',
        M : 'hilabete bat',
        MM : '%d hilabete',
        y : 'urte bat',
        yy : '%d urte'
    },
    ordinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

