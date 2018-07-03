//! moment.js locale configuration
//! locale : Kabyle (Algeria) [kab]
//! author : Belkacem Mohammed : https://github.com/belkacem77

import moment from '../moment';

export default moment.defineLocale('kab', {
    months : 'yennayer_furar_meɣres_yebrir_mayyu_yunyu_yulyu_ɣuct_ctember_tuber_wamber_dujember'.split('_'),
    monthsShort : 'yen._fur._meɣ._yeb._may._yun._yul._ɣuc._cte._tub._wam._duj.'.split('_'),
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
        sameDay : '[Ass-a af] LT',
        nextDay : '[Azekka af] LT',
        nextWeek : 'dddd [af] LT',
        lastDay : '[Iḍelli af] LT',
        lastWeek : 'dddd [aneggaru af] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'di %s',
        past : '%s aya',
        s : 'kra n tasinin',
        ss : '%d n tasinin',
        m : 'tasdat',
        mm : '%d n tesdatin',
        h : 'asrag',
        hh : '%d isragen',
        d : 'ass',
        dd : '%d n wussan',
        M : 'aggur',
        MM : '%d n wagguren',
        y : 'aseggas',
        yy : '%d n yiseggasen'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(wis|)/,
    ordinal : function (number) {
        return 'wis '+number;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

