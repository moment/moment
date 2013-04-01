// moment.js language configuration
// language : great britain english (en-gb)
// author : Chris Gedrim : https://github.com/chrisgedrim

require('../moment').lang('sr-latn', {
    months : "Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar".split("_"),
    monthsShort : "Jan_Feb_Mar_Apr_Maj_Jun_Jul_Avg_Sep_Okt_Nov_Dec".split("_"),
    weekdays : "Nedelja_Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota".split("_"),
    weekdaysShort : "Ned_Pon_Uto_Sre_Čet_Pet_Sub".split("_"),
    weekdaysMin : "Ne_Po_Ut_Sr_Če_Pe_Su".split("_"),
    longDateFormat : {
        LT : "h:mm A",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
    },
    calendar : {
        sameDay : '[Danas u] LT',
        nextDay : '[Sutra u] LT',
        nextWeek : 'dddd [u] LT',
        lastDay : '[Juče u] LT',
        lastWeek : '[Prošlog] dddd [u] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "za %s",
        past : "pre %s",
        s : "par sekundi",
        m : "minut",
        mm : "%d minuta",
        h : "sat",
        hh : "%d sati",
        d : "dan",
        dd : "%d dana",
        M : "msesec",
        MM : "%d meseci",
        y : "godinu",
        yy : "%d godina"
    },
    ordinal : function (number) {
        var b = number % 10,
            output = (~~ (number % 100 / 10) === 1) ? '' :
            (b === 1) ? '' :
            (b === 2) ? '' :
            (b === 3) ? '' : '';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
