// moment.js language configuration
// language : Greek (el)
// author : XhmikosR: https://github.com/XhmikosR
(function () {
    var lang = {
            months : "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
            monthsShort : "Ιαν_Φεβ_Μάρ_Απρ_Μάι_Ιούν_Ιούλ_Αύγ_Σεπ_Οκτ_Νοέ_Δεκ".split("_"),
            weekdays : "Δευτέρα_Τρίτη_Πέμπτη_Παρασκευή_Σάββατο_Κυριακή".split("_"),
            weekdaysShort : "Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ_Κυρ".split("_"),
            weekdaysMin : "Δε_Τρ_Τε_Πε_Πα_Σα_Κυ".split("_"),
            longDateFormat : {
                LT : "HH:mm A",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd, D MMMM YYYY LT"
            },
            calendar : {
                sameDay : '[Σήμερα στις] LT',
                nextDay : '[Αύριο στις] LT',
                nextWeek : 'dddd [στις] LT',
                lastDay : '[Χτες στις] LT',
                lastWeek : '[last] dddd [at] LT',
                sameElse : 'L'
            },
            relativeTime : {
                future : "σε %s",
                past : "%s πριν",
                s : "λίγα δευτ/πτα πριν",
                m : "ένα λεπτό",
                mm : "%d λεπτά",
                h : "μία ώρα",
                hh : "%d ώρες",
                d : "μία μέρα",
                dd : "%d μέρες",
                M : "ένα μήνα",
                MM : "%d μήνες",
                y : "ένα χρόνο",
                yy : "%d χρόνια"
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
        this.moment.lang('el', lang);
    }
}());
