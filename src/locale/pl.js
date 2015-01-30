//! moment.js locale configuration
//! locale : polish (pl)
//! author : Rafal Hirsz : https://github.com/evoL

import moment from "../moment";

export default moment.defineLocale('pl', {
    months : function (momentToFormat, format) {
        if (/D MMMM/.test(format)) {
            return monthsSubjective[momentToFormat.month()];
        } else {
            return monthsNominative[momentToFormat.month()];
        }
    },
    monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
    weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
    weekdaysShort : 'nie_pon_wt_śr_czw_pt_sb'.split('_'),
    weekdaysMin : 'N_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'LT:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY LT',
        LLLL : 'dddd, D MMMM YYYY LT'
    },
    calendar : {
        sameDay: '[Dziś o] LT',
        nextDay: '[Jutro o] LT',
        nextWeek: '[W] dddd [o] LT',
        lastDay: '[Wczoraj o] LT',
        lastWeek: function () {
            switch (this.day()) {
            case 0:
                return '[W zeszłą niedzielę o] LT';
            case 3:
                return '[W zeszłą środę o] LT';
            case 6:
                return '[W zeszłą sobotę o] LT';
            default:
                return '[W zeszły] dddd [o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'za %s',
        past : '%s temu',
        s : 'kilka sekund',
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : '1 dzień',
        dd : '%d dni',
        M : 'miesiąc',
        MM : translate,
        y : 'rok',
        yy : translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

