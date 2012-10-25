// moment.js language configuration
// language : hebrew (he)
// author : Moshe Simantov : https://github.com/DevelopmentIL
(function () {
    var lang = {
            months : "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
            monthsShort : "ינו_פבר_מרץ_אפר_מאי_יונ_יול_אוג_ספט_אוק_נוב_דצמ".split("_"),
            weekdays : "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
            weekdaysShort : "ראש_שני_שלי_רבי_חמי_שיש_שבת".split("_"),
            weekdaysMin : "א'_ב'_ג'_ד'_ה'_ו'_ש'".split("_"),
            longDateFormat : {
                LT : "h:mm A",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd, D MMMM YYYY LT"
            },
            calendar : {
                sameDay : '[היום ב]LT',
                nextDay : '[מחר ב]LT',
                nextWeek : 'dddd [ב]LT', 
                lastDay : '[אתמול ב]LT',
                lastWeek : 'dddd [האחרון ב]LT', 
                sameElse : 'L'
            },
            relativeTime : {
                future : "בעוד %s",
                past : "לפני %s",
                s : "לפני כמה שניות",
                m : "דקה",
                mm : "%d דקות",
                h : "שעה",
                hh : "%d שעות",
                d : "יום",
                dd : "%d ימים",
                M : "חודש",
                MM : "%d חודשים",
                y : "שנה",
                yy : "%d שנים"
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
        this.moment.lang('he', lang);
    }
}());
