// moment.js language configuration
// language : Burmese (mm)
// author : Squar team, mysquar.com

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    return moment.lang('mm', {
        months : "ဇန္နဝါရီ_ေဖေဖာ္ဝါရီ_မတ္_ဧျပီ_ေမ_ဇြန္_ဇူလိုင္_ၾသဂုတ္_စက္တင္ဘာ_ေအာက္တိုဘာ_ႏိုဝင္ဘာ_ဒီဇင္ဘာ".split("_"),
        monthsShort : "ဇန္_ေဖ_မတ္_ျပီ_ေမ_ဇြန္_လိုင္_ၾသ_စက္_ေအာက္_ႏို_ဒီ".split("_"),
        weekdays : "တနဂၤေႏြေန႔_တနလာၤေန႔_အဂၤါေန႔_ဗုဒၶဟူးေန႔_ၾကာသပေတးေန႔_ေသာၾကာေန႔_စေနေန႔".split("_"),
        weekdaysShort : "ေႏြ_လာ_ဂါ_ဟူး_ေတး_ေသာ_ေန".split("_"),
        weekdaysMin : "ေႏြ_လာ_ဂါ_ဟူး_ေတး_ေသာ_ေန".split("_"),
        longDateFormat : {
            LT : "HH.mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY [pukul] LT",
            LLLL : "dddd, D MMMM YYYY [pukul] LT"
        },
        calendar : {
            sameDay : '[ယေန႔] LT [မွာ]',
            nextDay : '[မနက္ျဖန္] LT [မွာ]',
            nextWeek : 'dddd [မွ] LT',
            lastDay : '[မေန႔က] LT [မွာ]',
            lastWeek : '[ေနာက္ဆံုး] dddd LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : "%s မွာ",
            past : "လြန္ခဲ့ေသာ %s က",
            s : "စကၠန္႔အနည္းငယ္",
            m : "တစ္မိနစ္",
            mm : "%d မိနစ္",
            h : "တစ္နာရီ",
            hh : "%d နာရီ",
            d : "တစ္ေန႔ ",
            dd : "%d ရက္",
            M : "တစ္လ",
            MM : "%d လ",
            y : "တစ္ႏွစ္",
            yy : "%d ႏွစ္"
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
}));
