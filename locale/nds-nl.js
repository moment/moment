// moment.js locale configuration
// locale : Dutch Low Saxon (nds-nl)
// author : Joris Röling : https://github.com/jjupiter

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory((typeof global !== 'undefined' ? global : this).moment); // node or other global
    }
}(function (moment) {
    var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._des.'.split('_'),
        monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_des'.split('_');

    return moment.defineLocale('nl', {
        months : 'jannewaori_febrewaori_meert_april_mei_juni_juli_augustus_september_oktober_november_desember'.split('_'),
        monthsShort : function (m, format) {
            if (/-MMM-/.test(format)) {
                return monthsShortWithoutDots[m.month()];
            } else {
                return monthsShortWithDots[m.month()];
            }
        },
        weekdays : 'zundag_maondag_diensdag_woonsdag_donderdag_vriedag_zaoterdag'.split('_'),
        weekdaysShort : 'zu._ma._di._wo._do._vr._za.'.split('_'),
        weekdaysMin : 'Zu_Ma_Di_Wo_Do_Vr_Za'.split('_'),
        meridiemParse: /vm|nm/i,
        isPM : function (input) {
            return /^nm$/i.test(input);
        },
        meridiem : function (hours, minutes, isLower) {
            if (hours < 12) {
                return isLower ? 'vm' : 'VM';
            } else {
                return isLower ? 'nm' : 'NM';
                }
        },
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'LT:ss',
            L : 'DD-MM-YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd D MMMM YYYY LT'
        },
        calendar : {
            sameDay: '[vandage um] LT',
            nextDay: '[marn um] LT',
            nextWeek: 'dddd [um] LT',
            lastDay: '[gisteren um] LT',
            lastWeek: '[verscheien] dddd [um] LT',
            sameElse: 'L'
        },
        relativeTime : {
            future : 'over %s',
            past : '%s elejen',
            s : 'n paor sekonden',
            m : 'een minuut',
            mm : '%d minuten',
            h : 'een uur',
            hh : '%d uur',
            d : 'een dag',
            dd : '%d dagen',
            M : 'een maond',
            MM : '%d maonden',
            y : 'een jaor',
            yy : '%d jaor'
        },
        ordinalParse: /\d{1,2}(ste|de)/,
        ordinal : function (number) {
            return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
}));
