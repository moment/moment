//! moment.js locale configuration
//! locale : Kabyle [kab]
//! author : Slimane Selyan Amiri : https://github.com/SelyanKab
//! author : ZiriSut : https://github.com/ZiriSut

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var monthsStrictRegex = /^(yennayer|fuṛar|meɣres|yebrir|mayyu|yunyu|yulyu|ɣuct|ctembeṛ|tubeṛ|nunembeṛ|duǧembeṛ)/i,
        monthsShortStrictRegex = /(yen\.?|fur\.?|meɣ\.?|yeb\.?|may\.?|yun\.?|yul\.?|ɣuc\.?|cte\.?|tub\.?|nun\.?|duǧ\.?)/i,
        monthsRegex = /(yen\.?|fur\.?|meɣ\.?|yeb\.?|may\.?|yun\.?|yul\.?|ɣuc\.?|cte\.?|tub\.?|nun\.?|duǧ\.?|yennayer|fuṛar|meɣres|yebrir|mayyu|yunyu|yulyu|ɣuct|ctembeṛ|tubeṛ|nunembeṛ|duǧembeṛ)/i,
        monthsParse = [
            /^yen/i,
            /^fur/i,
            /^meɣ/i,
            /^yeb/i,
            /^may/i,
            /^yun/i,
            /^yul/i,
            /^ɣuc/i,
            /^cte/i,
            /^tub/i,
            /^nun/i,
            /^duǧ/i,
        ];

    var kab = moment.defineLocale('kab', {
        months: 'yennayer_fuṛar_meɣres_yebrir_mayyu_yunyu_yulyu_ɣuct_ctembeṛ_tubeṛ_nunembeṛ_duǧembeṛ'.split(
            '_'
        ),
        monthsShort: 'yen._fur._meɣ._yeb._may._yun._yul._ɣuc._cte._tub._nun._duǧ.'.split(
            '_'
        ),
        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: monthsStrictRegex,
        monthsShortStrictRegex: monthsShortStrictRegex,
        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,
        weekdays: 'acer_arim_aram_ahad_amhad_sem_sed'.split('_'),
        weekdaysShort: 'ace._ari._ara._aha._amh._sem_sed'.split('_'),
        weekdaysMin: 'cr_ri_ra_hd_mh_sm_sd'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[Ass-a ɣef] LT',
            nextDay: '[Azekka ɣef] LT',
            nextWeek: 'dddd [ɣef] LT',
            lastDay: '[Iḍelli ɣef] LT',
            lastWeek: 'dddd [yezrin ɣef] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'deg %s',
            past: '%s aya',
            s: 'kra n tesinin',
            ss: '%d n tesinin',
            m: 'taseddast',
            mm: '%d n tsedatin',
            h: 'asrag',
            hh: '%d n yisragen',
            d: 'ass',
            dd: '%d n wussan',
            w: 'amalas',
            ww: '%d n yimalas',
            M: 'aggur',
            MM: '%d n wagguren',
            y: 'aseggas',
            yy: '%d n yuseggasen',
        },
        week: {
            dow: 0, // Monday is the first day of the week.
            doy: 12, // The week that contains Jan 12th is the first week of the year.
        },
    });

    return kab;

})));
