// moment.js language configuration
// language : Arabic (ar)
// author : Abdel Said : https://github.com/abdelsaid
(function () {
    var lang = {
            months : "كانون الثاني_ﺶﺑﺎﻃ_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_تشرين الثاني_كانون الأول".split("_"),
            monthsShort : "كانون الثاني_ﺶﺑﺎﻃ_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_تشرين الثاني_كانون الأول".split("_"), 
            weekdays : "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort : "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysMin : "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            longDateFormat : {
                LT : "HH:mm",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd D MMMM YYYY LT"
            },
            calendar : {
                sameDay: "[اليوم على الساعة] LT",
                nextDay: '[غدا على الساعة] LT',
                nextWeek: 'dddd [على الساعة] LT',
                lastDay: '[أمس على الساعة] LT',
                lastWeek: 'dddd [على الساعة] LT',
                sameElse: 'L'
            },
            relativeTime : {
                future : "في %s",
                past : "منذ %s",
                s : "ثوان",
                m : "دقيقة",
                mm : "%d دقائق",
                h : "ساعة",
                hh : "%d ساعات",
                d : "يوم",
                dd : "%d أيام",
                M : "شهر",
                MM : "%d أشهر",
                y : "سنة",
                yy : "%d سنوات"
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
        this.moment.lang('ar', lang);
    }
}());
