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
}

(function (moment) {
        var symbolMap = {
        '1': '၁',
        '2': '၂',
        '3': '၃',
        '4': '၄',
        '5': '၅',
        '6': '၆',
        '7': '၇',
        '8': '၈',
        '9': '၉',
        '0': '၀'
    },
    numberMap = {
        '၁': '1',
        '၂': '2',
        '၃': '3',
        '၄': '4',
        '၅': '5',
        '၆': '6',
        '၇': '7',
        '၈': '8',
        '၉': '9',
        '၀': '0'
    };
    return moment.lang('mm', {
        months : "ဇန္နဝါရီ_ေဖေဖာ္ဝါရီ_မတ္_ဧျပီ_ေမ_ဇြန္_ဇူလိုင္_ၾသဂုတ္_စက္တင္ဘာ_ေအာက္တိုဘာ_ႏိုဝင္ဘာ_ဒီဇင္ဘာ".split("_"),
        monthsShort : "ဇန္_ေဖ_မတ္_ျပီ_ေမ_ဇြန္_ဂ်ဴလိုင္_ၾသ_စက္_ေအာက္_ႏို_ဒီ".split("_"),
        weekdays : "တနလၤာ_အဂၤါ_ဗုဒၶဟူး_ၾကာသပေတး_ေသာၾကာ_စေန_တနဂၤေႏြ".split("_"),
        weekdaysShort : "လာ_ဂၤါ_ဟူး_ၾကာ_ေသာ_စ_ေႏြြ".split("_"),
        weekdaysMin : "လာ_ဂၤါ_ဟူး_ၾကာ_ေသာ_စ_ေႏြ".split("_"),
        longDateFormat : {
            LT : "HH:mm",
            L : "DD/MM/YYYY",
            LL : "D MMMM YYYY",
            LLL : "D MMMM YYYY LT",
            LLLL : "dddd D MMMM YYYY LT"
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
        preparse: function (string) {
            return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            });
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
}));
