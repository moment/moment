// moment.js language configuration
// language : Arabic (ar)
// author : ElFadili Yassine : https://github.com/ElFadiliY
(function () {
    var lang = {
            months : "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
            monthsShort : "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"), // There is no short format for the arabic months
            weekdays : "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort : "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), // There is no short format for the arabic weeks
            weekdaysMin : "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"), // 
            longDateFormat : {
                LT : "HH:mm",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd D MMMM YYYY LT"
            },
            calendar : {
                sameDay: "LT [يوم على الساعة]",
                nextDay: 'LT [غدا على الساعة]',
                nextWeek: 'LT [على الساعة] dddd',
                lastDay: 'LT [أمس على الساعة]',
                lastWeek: 'LT [الماضي على الساعة] dddd',
                sameElse: 'L'
            },
            relativeTime : {
                future : "في %s",
                past : "%s منذ",
                s : "قبل ثوان",
                m : "دقيقة",
                mm : "دقائق %d",
                h : "ساعة",
                hh : "ساعات %d",
                d : "يوم",
                dd : "أيام %d",
                M : "شهر",
                MM : "أشهر %d",
                y : "سنة",
                yy : "سنوات %d"
            },
            ordinal : function (number) {
                return ''; // Function is not required for the Arabic language.
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