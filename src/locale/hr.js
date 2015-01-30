//! moment.js locale configuration
//! locale : hrvatski (hr)
//! author : Bojan Marković : https://github.com/bmarkovic

import moment from "../moment";

export default moment.defineLocale('hr', {
    months : 'sječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_'),
    monthsShort : 'sje._vel._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
    weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
    weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
    weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'LT:ss',
        L : 'DD. MM. YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY LT',
        LLLL : 'dddd, D. MMMM YYYY LT'
    },
    calendar : {
        sameDay  : '[danas u] LT',
        nextDay  : '[sutra u] LT',
        nextWeek : function () {
            switch (this.day()) {
            case 0:
                return '[u] [nedjelju] [u] LT';
            case 3:
                return '[u] [srijedu] [u] LT';
            case 6:
                return '[u] [subotu] [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[u] dddd [u] LT';
            }
        },
        lastDay  : '[jučer u] LT',
        lastWeek : function () {
            switch (this.day()) {
            case 0:
            case 3:
                return '[prošlu] dddd [u] LT';
            case 6:
                return '[prošle] [subote] [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[prošli] dddd [u] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'za %s',
        past   : 'prije %s',
        s      : 'par sekundi',
        m      : translate,
        mm     : translate,
        h      : translate,
        hh     : translate,
        d      : 'dan',
        dd     : translate,
        M      : 'mjesec',
        MM     : translate,
        y      : 'godinu',
        yy     : translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

