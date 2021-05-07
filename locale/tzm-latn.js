//! moment.js locale configuration
//! locale : Central Atlas Tamazight Latin [tzm-latn]
//! author : Abdel Said : https://github.com/abdelsaid

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var tzmLatn = moment.defineLocale('tzm-latn', {
        months: 'yennayer_yebṛayeṛ_maṛṣ_ibrir_mayyu_yunyu_yulyuz_ɣuct_cutanbir_kṭuber_nwanbir_dujanbir'.split(
            '_'
        ),
        monthsShort: 'yen_yeb_maṛ_ibr_may_yun_yul_ɣuc_cut_kṭu_nwa_duj'.split(
            '_'
        ),
        weekdays: 'asamas_aynas_asinas_akṛas_akwas_asimwas_asiḍyas'.split('_'),
        weekdaysShort: 'asa_ayn_asn_akṛ_akw_asm_asḍ'.split('_'),
        weekdaysMin: 'asa_ayn_asn_akṛ_akw_asm_asḍ'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[g] LT',
            nextDay: '[asekka g] LT',
            nextWeek: 'dddd [g] LT',
            lastDay: '[assennaṭ g] LT',
            lastWeek: 'dddd [g] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'g %s',
            past: '%s aya',
            s: 'kra n tsina',
            ss: '%d n tsina',
            m: 'tusdidt',
            mm: '%d n tusdidin',
            h: 'tasragt',
            hh: '%d n tesragin',
            d: 'ass',
            dd: '%d n wussan',
            w: 'imalass',
            ww: '%d n imalassen',
            M: 'ayyur',
            MM: '%d n wayyurn',
            y: 'aseggʷas',
            yy: '%d n iseggʷasen',
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 12, // The week that contains Jan 12th is the first week of the year.
        },
    });

    return tzmLatn;

})));
