(function () {
    var lang = {
            months : "Januar_Februar_Marts_April_Maj_Juni_Juli_August_September_Oktober_November_December".split("_"),
            monthsShort : "Jan_Feb_Mar_Apr_Maj_Jun_Jul_Aug_Sep_Okt_Nov_Dec".split("_"),
            weekdays : "Søndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_Lørdag".split("_"),
            weekdaysShort : "Søn_Man_Tir_Ons_Tor_Fre_Lør".split("_"),
            longDateFormat : {
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY h:mm A",
                LLLL : "dddd D. MMMM, YYYY h:mm A"
            },
            meridiem : {
                AM : 'AM',
                am : 'am',
                PM : 'PM',
                pm : 'pm'
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
                mm : "minutter",
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
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('da', lang);
    }
}());
