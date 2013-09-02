// moment.js language configuration
// language : vietnamese (vn)
// author : Bang Nguyen : https://github.com/bangnk

require('../moment').lang('vn', {
    months : "tháng một_tháng hai_tháng ba_tháng tư_tháng năm_tháng sáu_tháng bảy_tháng tám_tháng chín_tháng mười_tháng mười một_tháng mười hai".split("_"),
    monthsShort : "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
    weekdays : "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
    weekdaysShort : "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysMin : "CN_T2_T3_T4_T5_T6_T7".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Hôm nay lúc] LT",
        nextDay: '[Ngày mai lúc] LT',
        nextWeek: 'dddd [tới lúc] LT',
        lastDay: '[Hôm qua lúc] LT',
        lastWeek: 'dddd [rồi lúc] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "%s tới",
        past : "%s trước",
        s : "vài giây",
        m : "một phút",
        mm : "%d phút",
        h : "một giờ",
        hh : "%d giờ",
        d : "một ngày",
        dd : "%d ngày",
        M : "một tháng",
        MM : "%d tháng",
        y : "một năm",
        yy : "%d năm"
    },
    ordinal : function (number) {
        return number;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
