// moment.js language configuration
// language : Armenian (hy)
// author : Vahe Hovhannisyan : http://vahehovhannisyan.com

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    return moment.lang('hy', {
        months : "Հունվար_Փետրվար_Մարտ_Ապրիլ_Մայիս_Հունիս_Հուլիս_Օգոստոս_Սեպտեմբեր_Հոկտեմբեր_Նոյեմբեր_Դեկտեմբեր".split("_"),
        monthsShort : "Հնվ_Փտր_Մրտ_Ապր_Մյս_Հուն_Հուլ_Օգս_Սեպ_Հոկ_Նով_Դեկ".split("_"),
        weekdays : "Կիրակի_Երկուշաբթի_Երեքշաբթի_Չորեքշաբթի_Հինգշաբթի_Ուրբաթ_Շաբաթ".split("_"),
        weekdaysShort : "Կիր_Երկ_Երք_Չրք_Հնգ_Ուրբ_Շաբ".split("_"),
        weekdaysMin : "Կի_Եկ_Եք_Չք_Հշ_Ուր_Շա".split("_"),
        longDateFormat : {
            LT : "h:mm A",
            L : "YYYY-MM-DD",
            LL : "D MMMM, YYYY",
            LLL : "D MMMM, YYYY LT",
            LLLL : "dddd, D MMMM, YYYY LT"
        },
        calendar : {
            sameDay : '[Այսօր] LT[-ին]',
            nextDay : '[Վաղը] LT[-ին]',
            nextWeek : 'dddd [ժամը] LT',
            lastDay : '[Երեկ] LT[-ին]',
            lastWeek : '[Անցյալ] dddd LT[-ին]',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%sից",
            past : "%s հետո",
            s : "մի քանի վարկյան",
            m : "մեկ րոպե",
            mm : "%d րոպե",
            h : "մեկ ժամ",
            hh : "%d ժամ",
            d : "օր",
            dd : "%d օր",
            M : "ամիս",
            MM : "%d ամիս",
            y : "տարի",
            yy : "%d տարի"
        },
        ordinal : function (number) {
            var b = number % 10,
                output = (~~ (number % 100 / 10) === 1) ? 'րդ' : (b === 1) ? 'ին' : 'րդ';
            return number + output;
        }
    });
}));
