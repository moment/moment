// moment.js language configuration
// language : Uyghur (ug-CN)
// author : Otkur biz : https://github.com/OtkurBiz


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    return moment.lang('ar', {
        months : "1-ئاي_2-ئاي_3-ئاي_4-ئاي_5-ئاي_6-ئاي_7-ئاي_8-ئاي_9-ئاي_10-ئاي_11-ئاي_12-ئاي".split("_"),
        monthsShort : "1-ئاي_2-ئاي_3-ئاي_4-ئاي_5-ئاي_6-ئاي_7-ئاي_8-ئاي_9-ئاي_10-ئاي_11-ئاي_12-ئاي".split("_"),
        weekdays : "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split("_"),
        weekdaysShort : "يەك_دۈي_سەي_چار_پەي_جۈم_شەن".split("_"),
        weekdaysMin : "يەك_دۈي_سەي_چار_پەي_جۈم_شەن".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "YYYY/MM/DD",
            LL : "YYYY MMMM D",
            LLL : "YYYY MMMM D LT",
            LLLL : "YYYY MMMM D dddd LT"
        },
        calendar : {
            sameDay: "[بۈگۈن سائەت] LT",
            nextDay: '[ئەتە سائەت] LT',
            nextWeek: '[كېلەر] dddd [سائەت] LT',
            lastDay: '[تۆنۈگۈن سائەت] LT',
            lastWeek: '[ئالدىنقى] dddd [سائەت] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : "%s ئىچىدە",
            past : "%s بۇرۇن",
            s : "ھېلىلا",
            m : "بىر مىنۇت",
            mm : "%d مىنۇت",
            h : "سائەت",
            hh : "%d سائەت",
            d : "كۈن",
            dd : "%d كۈن",
            M : "ئاي",
            MM : "%d ئاي",
            y : "يىل",
            yy : "%d يىل"
        },
        ordinal : function (number) {
           return number + '-';
        },
        week : {
            dow : 1, // Saturday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
}));
