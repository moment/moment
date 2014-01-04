// moment.js language configuration
// language : armenian (hy-am)
// author : Armendarabyan : https://github.com/armendarabyan

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    function plural(word, num) {
        var forms = word.split('_');
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }

    function relativeTimeWithPlural(number, withoutSuffix, key) {
        var format = {
            'mm': 'րոպե',
            'hh': 'ժամ',
            'dd': 'օր',
            'MM': 'ամիս',
            'yy': 'տարի'
        };
        if (key === 'm') {
            return withoutSuffix ? 'րոպե' : 'րոպե';
        }
        else {
            return number + ' ' + format[key];
        }
    }

    function monthsCaseReplace(m, format) {
        var months = {
            'nominative': 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_'),
            'accusative': 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_')
        },

        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';

        return months[nounCase][m.month()];
    }

    function monthsShortCaseReplace(m, format) {
        var monthsShort = {
            'nominative': 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
            'accusative': 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_')
        },

        nounCase = (/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/).test(format) ?
            'accusative' :
            'nominative';

        return monthsShort[nounCase][m.month()];
    }

    function weekdaysCaseReplace(m, format) {
        var weekdays = {
            'nominative': 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
            'accusative': 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_')
        },

        nounCase = (/\[ ?[Вв] ?(?:անցած|հաջորդ)? ?\] ?dddd/).test(format) ?
            'accusative' :
            'nominative';

        return weekdays[nounCase][m.day()];
    }

    return moment.lang('hy-am', {
        months : monthsCaseReplace,
        monthsShort : monthsShortCaseReplace,
        weekdays : weekdaysCaseReplace,
        weekdaysShort : "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        weekdaysMin : "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        //monthsParse : [/^հնվ/i, /^փտր/i, /^մրտ/i, /^ապր/i, /^մյս/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i],
        longDateFormat : {
            LT : "HH:mm",
            L : "DD.MM.YYYY",
            LL : "D MMMM YYYY թ.",
            LLL : "D MMMM YYYY թ., LT",
            LLLL : "dddd, D MMMM YYYY թ., LT"
        },
        calendar : {
            sameDay: '[այսօր] LT',
            nextDay: '[վաղը] LT',
            lastDay: '[երեկ] LT',
            nextWeek: function () {
                return this.day() === 2 ? '[Во] dddd [в] LT' : '[В] dddd [в] LT';
            },
            lastWeek: function () {
                switch (this.day()) {
                case 0:
                    return '[անցած] dddd LT';
                case 1:
                case 2:
                case 4:
                    return '[անցած] dddd LT';
                case 3:
                case 5:
                case 6:
                    return '[անցած] dddd LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : "%s հետո",
            past : "%s առաջ",
            s : "մի քանի վայրկյան",
            m : relativeTimeWithPlural,
            mm : relativeTimeWithPlural,
            h : "ժամ",
            hh : relativeTimeWithPlural,
            d : "օր",
            dd : relativeTimeWithPlural,
            M : "ամիս",
            MM : relativeTimeWithPlural,
            y : "տարի",
            yy : relativeTimeWithPlural
        },

        // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason

        meridiem : function (hour, minute, isLower) {
            if (hour < 4) {
                return "գիշերվա";
            } else if (hour < 12) {
                return "առավոտվա";
            } else if (hour < 17) {
                return "ցերեկվա";
            } else {
                return "երեկոյան";
            }
        },

        ordinal: function (number, period) {
            switch (period) {
            case 'M':
            case 'd':
                return number;
            case 'DDD':
                if (number === 1) return number + '-ին';
                return number + '-րդ';
            case 'DDDo':
                if (number === 1) return number + '-ին';
                return number + '-րդ';
            case 'D':
                return number + '';
            case 'w':
            case 'W':
                if (number === 1) return number + '-ին';
                return number + '-րդ';
            default:
                return number;
            }
        },

        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
}));
