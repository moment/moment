// moment.js language configuration
// language : modern greek (el)
// author : Aggelos Karalias : https://github.com/mehiel

require('../moment').lang('el', {
    months : "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
    monthsShort : "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
    weekdays : "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
    weekdaysShort : "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
    weekdaysMin : "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'μμ' : 'ΜΜ';
        } else {
            return isLower ? 'πμ' : 'ΠΜ';
        }
    },
    longDateFormat : {
        LT : "h:mm A",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
    },
    calendar : function (key, mom) {
        var _calendar_el = {
                sameDay : '[Σήμερα {}] LT',
                nextDay : '[Αύριο {}] LT',
                nextWeek : 'dddd [{}] LT',
                lastDay : '[Χθες {}] LT',
                lastWeek : '[την προηγούμενη] dddd [{}] LT',
                sameElse : 'L'
            },
            output = _calendar_el[key],
            hours = mom && mom.hours();

        return output.replace("{}", (hours % 12 === 1 ? "στη" : "στις"));
    },
    relativeTime : {
        future : "σε %s",
        past : "%s πριν",
        s : "δευτερόλεπτα",
        m : "ένα λεπτό",
        mm : "%d λεπτά",
        h : "μία ώρα",
        hh : "%d ώρες",
        d : "μία μέρα",
        dd : "%d μέρες",
        M : "ένας μήνας",
        MM : "%d μήνες",
        y : "ένας χρόνος",
        yy : "%d χρόνια"
    },
    ordinal : function (number) {
        return number + 'η';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4st is the first week of the year.
    }
});
