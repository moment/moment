(function () {
    var lang = {
            months : "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
            monthsShort : "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
            weekdays : "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
            weekdaysShort : "søn_man_tir_ons_tor_fre_lør".split("_"),
            longDateFormat : {
                LT : "h:mm A",
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
              lastWeek : '[siste] dddd [kl] LT',
              sameElse : 'L'
            },
            relativeTime : {
              future : "om %s",
              past : "%s siden",
              s : "få sekunder",
              m : "minutt",
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
                return "."
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('no', lang);
    }
}());
