//! moment.js locale configuration
//! locale : slovenian (sl)
//! author : Robert Sedovšek : https://github.com/sedovsek

import moment from "../moment";

export default moment.defineLocale('sl', {
    months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
    monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
    weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
    weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
    weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
    longDateFormat : {
        LT : 'H:mm',
        LTS : 'LT:ss',
        L : 'DD. MM. YYYY',
        LL : 'D. MMMM YYYY',
        LLL : 'D. MMMM YYYY LT',
        LLLL : 'dddd, D. MMMM YYYY LT'
    },
    calendar : {
        sameDay  : '[danes ob] LT',
        nextDay  : '[jutri ob] LT',
        nextWeek : function () {
            switch (this.day()) {
            case 0:
                return '[v] [nedeljo] [ob] LT';
            case 3:
                return '[v] [sredo] [ob] LT';
            case 6:
                return '[v] [soboto] [ob] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[v] dddd [ob] LT';
            }
        },
        lastDay  : '[včeraj ob] LT',
        lastWeek : function () {
            switch (this.day()) {
            case 0:
            case 3:
            case 6:
                return '[prejšnja] dddd [ob] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[prejšnji] dddd [ob] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : 'čez %s',
        past   : '%s nazaj',
        s      : 'nekaj sekund',
        m      : translate,
        mm     : translate,
        h      : translate,
        hh     : translate,
        d      : 'en dan',
        dd     : translate,
        M      : 'en mesec',
        MM     : translate,
        y      : 'eno leto',
        yy     : translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});

