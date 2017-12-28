//! moment.js locale configuration
//! locale : Kabyle [kab]
//! author : Belkacem Mohammed : https://github.com/belkacem77

import moment from '../moment';

export default moment.defineLocale('kab', {
    months : 'yennayer_furar_meɣres_yebrir_mayyu_yunyu_yulyu_ɣuct_ctember_tuber_wamber_dujember'.split('_'),
    monthsShort : 'yen._fur._meɣ._yeb._may._yun._yul._ɣuc._cte._tub._wam._duj.'.split('_'),
    monthsParseExact : true,
    weekdays : 'acer_arim_aram_ahad_amhad_sem_sed'.split('_'),
    weekdaysShort : 'ace._ari._ara._aha._amh._sem._sed.'.split('_'),
    weekdaysMin : 'Ac_Ar_Am_Ah_Ad_Sm_Sd'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay: '[Ass-a af] LT',
        nextDay: '[Azekka af] LT',
        nextWeek: 'dddd [af] LT',
        lastDay: '[Iḍelli af] LT',
        lastWeek: 'dddd [aneggaru af] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : 'di %s',
        past : '%s aya',
        s : 'tasint',
        ss : '%d n tasinin',
        m : 'tasdat',
        mm : '%d n tisdatin',
        h : 'asrag',
        hh : '%d n isragen',
        d : 'ass',
        dd : '%d n wussan',
        M : 'aggur',
        MM : '%d n wagguren',
        y : 'aseggas',
        yy : '%d n iseggasen'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(wis|tis)/,
    ordinal : function (number, period) {
        // in kabyle we write wis 1, wis 2, wis 3, wis 4, wis 20, wis 100...and so on for masculine period and
        // tis 1, tis 2, tis 3, tis 4, tis 20, tis 100...and so on for female period
        // for example 2nd month: aggur wis 2, 1st day: ass wis 1, 5th week: amalas wis 5
        // 1st minute: tasdat tis 1, 10th second: tasint tis 10
        switch (period) {
            default:
                //hour, day, week, month, quarter, year are masculine
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
            case 'w':
            case 'W':
            case 'Y':
            case 'y':
                return 'wis ' + number;
                // minutes and seconds are feminine
            case 'm':
            case 's':
                return 'tis ' + number;
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
