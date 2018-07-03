//! moment.js locale configuration
//! locale : Kabyle [kab]
//! author : Belkacem Mohammed : https://github.com/belkacem77

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


var kab = moment.defineLocale('kab', {
    months : 'yennayer_furar_meɣres_yebrir_mayyu_yunyu_yulyu_ɣuct_ctember_tuber_wamber_dujember'.split('_'),
    monthsShort : 'yen._fur._meɣ._yeb._may._yun._yul._ɣuc._cte._tub._wam._duj.'.split('_'),
    monthsParseExact : true,
    weekdays : 'acer_arim_aram_ahad_amhad_sem_sed'.split('_'),
    weekdaysShort : 'ace._ari._ara._aha._amh._sem._sed.'.split('_'),
    weekdaysMin : 'Ac_Ar_Am_Ah_Ad_Sm_Sd'.split('_'),
    weekdaysParseExact : true,
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
        s : 'kra n tasinin',
        m : 'tasdat',
        mm : '%d n tesdatin',
        h : 'asrag',
        hh : '%d n isragen',
        d : 'ass',
        dd : '%d n wussan',
        M : 'aggur',
        MM : '%d n wagguren',
        y : 'aseggas',
        yy : '%d n iseggasen'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(wis|)/,
    ordinal : function (number) {
        return 'wis '+number;
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

return kab;
})));
