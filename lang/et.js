// moment.js language configuration
// language : estonian (et)
// author : Henry Kehlmann : https://github.com/madhenry
(function () {

    function translate(number, withoutSuffix, key, isFuture) {
        var num = number;
        
        switch (key) {
            case 's':
                return (isFuture || withoutSuffix) ? 'paari sekundi' : 'paar sekundit';
            default:
        }
        
        return '';
    }

    var lang = {
            months        : "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
            monthsShort   : "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
            weekdays      : "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
            weekdaysShort : "P_E_T_K_N_R_L".split("_"),
            weekdaysMin   : "P_E_T_K_N_R_L".split("_"),
            longDateFormat : {
                LT   : "H:mm",
                L    : "DD.MM.YYYY",
                LL   : "D. MMMM YYYY",
                LLL  : "D. MMMM YYYY LT",
                LLLL : "dddd, D. MMMM YYYY LT"
            },
            calendar : {
                sameDay  : '[Täna,] LT',
                nextDay  : '[Homme,] LT',
                nextWeek : '[Järgmine] dddd LT',
                lastDay  : '[Eile,] LT',
                lastWeek : '[Eelmine] dddd LT', 
                sameElse : 'L'
            },
            relativeTime : {
                future : "%s pärast",
                past   : "%s tagasi",
                s      : translate,
                m      : "minut",
                mm     : "%d minutit",
                h      : "tund",
                hh     : "%d tundi",
                d      : "päev",
                dd     : "%d päeva",
                M      : "kuu",
                MM     : "%d kuud",
                y      : "aasta",
                yy     : "%d aastat"
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
        this.moment.lang('et', lang);
    }
}());
