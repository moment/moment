// moment.js language configuration
// language : slovenian (sl)
// author : Robert Sedovšek : https://github.com/sedovsek
(function () {
    translate = function (number, withoutSuffix, key) {
        var result = number + " ";
        switch (key) {
            case 'm': 
                return withoutSuffix  ? 'ena minuta'  : 'eno minuto';
            case 'mm': 
                if (number === 1) {
                    return result + 'minuta'
                } else if (number === 2) {
                    return result + 'minuti'
                } else if ((number === 3) || (number === 4)) {
                    return result + 'minute' 
                } else {
                    return result + 'minut'
                }
            case 'h': 
                return withoutSuffix  ? 'ena ura'  : 'eno uro';
            case 'hh': 
                if (number === 1) {
                    return result + 'ura'
                } else if (number === 2) {
                    return result + 'uri'
                } else if ((number === 3) || (number === 4)) {
                    return result + 'ure' 
                } else {
                    return result + 'ur'
                }
            case 'dd': 
                if (number === 1) {
                    return result + 'dan'
                } else {
                    return result + 'dni'
                }
            case 'MM': 
                if (number === 1) {
                    return result + 'mesec'
                } else if (number === 2) {
                    return result + 'meseca'
                } else if ((number === 3) || (number === 4)) {
                    return result + 'mesece' 
                } else {
                    return result + 'mesecev'
                }
            case 'yy': 
                if (number === 1) {
                    return result + 'leto'
                } else if (number === 2) {
                    return result + 'leti'
                } else if ((number === 3) || (number === 4)) {
                    return result + 'leta' 
                } else {
                    return result + 'let'
                }
        }
    },

    lang = {
            months : "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
            monthsShort : "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
            weekdays : "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
            weekdaysShort : "ned._pon._tor._sre._čet._pet._sob.".split("_"),
            weekdaysMin : "ne_po_to_sr_če_pe_so".split("_"),
            longDateFormat : {
                LT : "H:mm",
                L : "DD. MM. YYYY",
                LL : "D. MMMM YYYY",
                LLL : "D. MMMM YYYY LT",
                LLLL : "dddd, D. MMMM YYYY LT"
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
                future : "čez %s",
                past   : "%s nazaj",
                s      : "nekaj sekund",
                m      : translate,
                mm     : translate,
                h      : translate,
                hh     : translate,
                d      : "en dan",
                dd     : translate,
                M      : "en mesec",
                MM     : translate,
                y      : "eno leto",
                yy     : translate
            },
            ordinal : function (number) {
                return '.';
            }
        };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('sl', lang);
    }
}());
