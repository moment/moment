// moment.js language configuration
// language : danish (da)
// author : Ulrik Nielsen : https://github.com/mrbase
(function () {
    var lang = {
            months : "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
            monthsShort : "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
            weekdays : "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
            weekdaysShort : "søn_man_tir_ons_tor_fre_lør".split("_"),
            weekdaysMin : "sø_ma_ti_on_to_fr_lø".split("_"),
            longDateFormat : {
                LT : "h:mm A",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY h:mm A",
                LLLL : "dddd D. MMMM, YYYY h:mm A"
            },
            calendar : {
                sameDay : '[I dag kl.] LT',
                nextDay : '[I morgen kl.] LT',
                nextWeek : 'dddd [kl.] LT',
                lastDay : '[I går kl.] LT',
                lastWeek : '[sidste] dddd [kl] LT',
                sameElse : 'L'
            },
            relativeTime : {
                future : "om %s",
                past : "%s siden",
                s : "få sekunder",
                m : "minut",
                mm : "%d minutter",
                h : "time",
                hh : "%d timer",
                d : "dag",
                dd : "%d dage",
                M : "månede",
                MM : "%d måneder",
                y : "år",
                yy : "%d år"
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
        this.moment.lang('da', lang);
    }
}());
