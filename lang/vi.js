// moment.js language configuration
// language : vietnamese (fr)
// author : adylitica : http://adylitica.com/
(function () {
    var lang = {
            months : "tháng một_tháng hai_tháng ba_tháng tư_tháng năm_tháng sáu_tháng bảy_tháng tám_tháng chín_tháng mười_tháng mười một_tháng mười hai".split("_"),
            monthsShort : "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
            weekdays : "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
            weekdaysShort : "chủ nhật_thứ 2_thứ 3_thứ 4_thứ 5_thứ 6_thứ 7".split("_"),
            weekdaysMin : "CN_T2_T3_T4_T5_T6_T7".split("_"),
            longDateFormat : {
                LT : "HH:mm",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd D MMMM YYYY LT"
            },
            meridiem : function (hour, minute, isLower) {
                return (hour < 12) ? 'SA' : 'CH';
            },
            calendar : {
                sameDay: "[Hôm nay lúc] LT",
                nextDay: '[Ngày mai lúc] LT',
                nextWeek: 'dddd [lúc] LT',
                lastDay: '[Hôm qua lúc] LT',
                lastWeek: 'dddd [tuần trước lúc] LT',
                sameElse: 'L'
            },
            relativeTime : {
                future : "trong %s",
                past : "%s trước",
                s : "một vài giây",
                m : "một phút",
                mm : "%d phút",
                h : "một tiếng",
                hh : "%d tiếng",
                d : "một ngày",
                dd : "%d ngày",
                M : "một tháng",
                MM : "%d tháng",
                y : "một năm",
                yy : "%d năm"
            },
            ordinal : function (number) {
                return '';
            }
        };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('vi', lang);
    }
}());
