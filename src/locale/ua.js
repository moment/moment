//! moment.js locale configuration
//! locale : ukrainian (ua)
//! author : Maks Drobot

import moment from '../moment';

var monthsNominative = 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
    monthsSubjective = 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_');
function plural(n) {
    return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
}
function translate(number, withoutSuffix, key) {
    var result = number + ' ';
    switch (key) {
    case 'm':
        return withoutSuffix ? 'хвилина' : 'хвилини';
    case 'mm':
        return result + (plural(number) ? 'хвилини' : 'хвилин');
    case 'h':
        return withoutSuffix  ? 'година'  : 'години';
    case 'hh':
        return result + (plural(number) ? 'години' : 'годин');
    case 'MM':
        return result + (plural(number) ? 'місяць' : 'місяця');
    case 'yy':
        return result + (plural(number) ? 'роки' : 'років');
    }
}

export default moment.defineLocale('pl', {
    months : function (momentToFormat, format) {
        if (format === '') {
            // Hack: if format empty we know this is used to generate
            // RegExp by moment. Give then back both valid forms of months
            // in RegExp ready format.
            return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
        } else if (/D MMMM/.test(format)) {
            return monthsSubjective[momentToFormat.month()];
        } else {
            return monthsNominative[momentToFormat.month()];
        }
    },
    monthsShort : 'січ_лют_бер_квіт_трав_чер_лип_сер_вер_жовт_лист_груд'.split('_'),
    weekdays : 'неділя_понеділок_вівторок_середа_четвер_пятниця_субота'.split('_'),
    weekdaysShort : 'нед_пон_вівт_сер_чет_пят_суб'.split('_'),
    weekdaysMin : 'нед_пон_вівт_сер_чет_пят_суб'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'LT:ss',
        L : 'DD.MM.YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY LT',
        LLLL : 'dddd, D MMMM YYYY LT'
    },
    calendar : {
        sameDay: '[Сьогодні о] LT',
        nextDay: '[завтра о] LT',
        nextWeek: '[в] dddd [o] LT',
        lastDay: '[вчора о] LT',
        lastWeek: function () {
            switch (this.day()) {
            case 0:
                return '[В минулу неділю o] LT';
            case 3:
                return '[В минулу середу  o] LT';
            case 6:
                return '[В минулу суботу о] LT';
            default:
                return '[В минулий] dddd [o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : 'за %s',
        past : '%s декілька секунд',
        s : 'день',
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : '1  день',
        dd : '%d днів',
        M : 'місяць',
        MM : translate,
        y : 'рік',
        yy : translate
    },
    ordinalParse: /\d{1,2}\./,
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
