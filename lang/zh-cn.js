(function () {
    var lang = {
            months : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            monthsShort : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
            weekdays : "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
            weekdaysShort : "周日_周一_周二_周三_周四_周五_周六".split("_"),
            longDateFormat : {
                LT : "h:mm A",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd, D MMMM YYYY LT"
            },
            meridiem : {
                AM : '上午',
                am : '上午',
                PM : '下午',
                pm : '下午'
            },
            calendar : {
                sameDay : '[今天] LT',
                nextDay : '[明天] LT',
                nextWeek : '[下]dddd LT', 
                lastDay : '[昨天] LT',
                lastWeek : '[上]dddd LT', 
                sameElse : 'L'
            },
            relativeTime : {
                future : "%s后",
                past : "%s前",
                s : "几秒",
                m : "1分钟",
                mm : "%d分钟",
                h : "1小时",
                hh : "%d小时",
                d : "1天",
                dd : "%d天",
                M : "1个月",
                MM : "%d个月",
                y : "1年",
                yy : "%d年"
            },
            ordinal : function (number) {
                    return '';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('zh-cn', lang);
    }
}());
