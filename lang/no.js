// moment.js language configuration
// language : norwegian (no)
// author : Finn Johnsen : http://github.com/finnjohnsen
(function () {
    var lang = {
            months : "Januar_Februar_Mars_April_Mai_Juni_Juli_August_September_Oktober_November_Desember".split("_"),
            monthsShort : "Jan_Feb_Mar_Apr_Mai_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
            weekdays : "Søndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_Lørdag".split("_"),
            weekdaysShort : "Søn_Man_Tir_Ons_Tor_Fre_Lør".split("_"),
            weekdaysMin : "Sø_Ma_Ti_On_To_Fr_Lø".split("_"),
            longDateFormat : {
                LT : "HH:mm",
                L : "DD.MM.YYYY",
                LL : "D. MMMM YYYY",
                LLL : "D. MMMM YYYY HH:mm",
                LLLL : "dddd D. MMMM, YYYY HH:mm"
            },
            calendar : {
                sameDay : '[I dag kl.] LT',
                nextDay : '[I morgen kl.] LT',
                nextWeek : 'dddd [kl.] LT',
                lastDay : '[I går kl.] LT',
                lastWeek : '[forrige] dddd [kl.] LT',
                sameElse : 'L'
            },
            relativeTime : {
                future : "om %s",
                past : "%s siden",
                s : "få sekunder",
                m : "minutter",
                mm : "%d minutter",
                h : "time",
                hh : "%d timer",
                d : "dag",
                dd : "%d dager",
                M : "måneder",
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
        this.moment.lang('no', lang);
    }
}());