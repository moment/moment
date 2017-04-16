// moment.js locale configuration
// locale : Rwandan Kinyarwanda (rw)

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    return moment.defineLocale('rw', {
        months : 'Mutarama_Gashyantare_Werurwe_Mata_Gicuransi_Kamena_Nyakanga_Kanama_Nzeli_Ukwakira_Ugushyingo_Ukuboza'.split('_'),
        monthsShort : 'Mut_Gas_Wer_Mat_Gic_Kam_Nya_Kan_Nze_Ukw_Ugu_Uku'.split('_'),
        weekdays : 'Ku cyumweru_Kuwa mbere_Kuwa kabiri_Kuwa gatatu_Kuwa kane_Kuwa gatanu_Kuwa gatandatu'.split('_'),
        weekdaysShort : 'Cyu_Mbe_Kab_Gtu_Kan_Gnu_Gnd'.split('_'),
        weekdaysMin : 'Cy_Mb_Ka_Gt_Ka_Gn_Gd'.split('_'),
        longDateFormat : {
            LT : 'h:mm A',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd, D MMMM YYYY LT'
        },
        calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },
        ordinal : function (number) {
            var b = number % 10,
                output = (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));
