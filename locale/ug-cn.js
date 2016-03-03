// moment.js language configuration
// language : Uyghur (ug-CN)
// author : Otkur biz : https://github.com/OtkurBiz


;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';
    var ug_cn = moment.defineLocale('ug-cn', {
        months : "1-ئاي_2-ئاي_3-ئاي_4-ئاي_5-ئاي_6-ئاي_7-ئاي_8-ئاي_9-ئاي_10-ئاي_11-ئاي_12-ئاي".split("_"),
        monthsShort : "1-ئاي_2-ئاي_3-ئاي_4-ئاي_5-ئاي_6-ئاي_7-ئاي_8-ئاي_9-ئاي_10-ئاي_11-ئاي_12-ئاي".split("_"),
        weekdays : "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split("_"),
        weekdaysShort : "يەك_دۈي_سەي_چار_پەي_جۈم_شەن".split("_"),
        weekdaysMin : "يەك_دۈي_سەي_چار_پەي_جۈم_شەن".split("_"),
        longDateFormat : {
            LT : 'Ah:mm',
            LTS : 'Ah:m:s',
            L : 'YYYY-MM-DD',
            LL : 'YYYY-يىلىMMMD-كۈنى',
            LLL : 'YYYY-يىلىMMMD-كۈنىAh:mm',
            LLLL : 'YYYY-يىلىMMMD-كۈنىddddAh:mm',
            l : 'YYYY-MM-DD',
            ll : 'YYYY-يىلىMMMD-كۈنى',
            lll : 'YYYY-يىلىMMMD-كۈنىAh:mm',
            llll : 'YYYY-يىلىMMMD-كۈنىddddAh:mm'
        },
        meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === 'يېرىم كېچە' || meridiem === 'سەھەر' ||
                    meridiem === 'چۈشتىن بۇرۇن') {
                return hour;
            } else if (meridiem === 'چۈشتىن كېيىن' || meridiem === 'كەچ') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return 'يېرىم كېچە';
            } else if (hm < 900) {
                return 'سەھەر';
            } else if (hm < 1130) {
                return 'چۈشتىن بۇرۇن';
            } else if (hm < 1230) {
                return 'چۈش';
            } else if (hm < 1800) {
                return 'چۈشتىن كېيىن';
            } else {
                return 'كەچ';
            }
        },
        calendar : {
            sameDay : function () {
                return this.minutes() === 0 ? '[بۈگۈن]Ah[]' : '[بۈگۈن]LT';
            },
            nextDay : function () {
                return this.minutes() === 0 ? '[ئەتە]Ah[]' : '[ئەتە]LT';
            },
            lastDay : function () {
                return this.minutes() === 0 ? '[تۆنۈگۈن]Ah[]' : '[تۆنۈگۈن]LT';
            },
            nextWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() - startOfWeek.unix() >= 7 * 24 * 3600 ? '[كېلەركى]' : '[بۇ]';
                return this.minutes() === 0 ? prefix + 'dddAh' : prefix + 'dddAh:mm';
            },
            lastWeek : function () {
                var startOfWeek, prefix;
                startOfWeek = moment().startOf('week');
                prefix = this.unix() < startOfWeek.unix()  ? '[ئالدىنقى]' : '[بۇ]';
                return this.minutes() === 0 ? prefix + 'dddAh' : prefix + 'dddAh:mm';
            },
            sameElse : 'LL'
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal : function (number, period) {
            switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return number + '-كۈنى';
            case 'M':
                return number + '-ئاي';
            case 'w':
            case 'W':
                return number + '-ھەپتە';
            default:
                return number;
            }
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
        week : {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return ug_cn;

}));
