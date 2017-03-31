// moment.js language configuration
// language : Persian Iran (fa-ir)
// author : Behrang Noruzi Niya : https://github.com/behrang

require('../moment').lang('fa-ir', {
    months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_آدینه_شنبه'.split('_'),
    weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_آدینه_شنبه'.split('_'),
    weekdaysMin : 'ی_د_س_چ_پ_آ_ش'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        L : 'YYYY/MM/DD',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY LT',
        LLLL : 'dddd، D MMMM YYYY LT'
    },
    calendar : {
        sameDay : '[امروز ساعت] LT',
        nextDay : '[فردا ساعت] LT',
        nextWeek : 'dddd [ساعت] LT',
        lastDay : '[دیروز ساعت] LT',
        lastWeek : 'dddd [ی پیش ساعت] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'در %s',
        past : '%s پیش',
        s : 'چند ثانیه',
        m : '1 دقیقه',
        mm : '%d دقیقه',
        h : '1 ساعت',
        hh : '%d ساعت',
        d : '1 روز',
        dd : '%d روز',
        M : '1 ماه',
        MM : '%d ماه',
        y : '1 سال',
        yy : '%d سال'
    },
    ordinal : '%dم',
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12 // The week that contains Jan 1st is the first week of the year.
    },
    meridiem : function (hour, minute, isLowercase) {
        if (hour < 12) {
            return 'ق.ظ';
        } else {
            return 'ب.ظ';
        }
    }
});
