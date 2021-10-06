//! moment.js locale configuration
//! locale : Swedish [sv]
//! author : Jens Alm : https://github.com/ulmus

import moment from '../moment';

export default moment.defineLocale('sv', {
    months: 'Januari_Februari_Mars_April_Maj_Juni_Juli_Augusti_September_Oktober_November_December'.split(
        '_'
    ),
    monthsShort: 'Jan_Feb_Mar_Apr_Maj_Jun_Jul_Aug_Sep_Okt_Nov_Dec'.split('_'),
    weekdays: 'Söndag_Måndag_Tisdag_Onsdag_Torsdag_Fredag_Lördag'.split('_'),
    weekdaysShort: 'Sön_Mån_Tis_Ons_Tor_Fre_Lör'.split('_'),
    weekdaysMin: 'Sö_Må_Ti_On_To_Fr_Lö'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY-MM-DD',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY [kl.] HH:mm',
        LLLL: 'dddd D MMMM YYYY [kl.] HH:mm',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd D MMM YYYY HH:mm',
    },
    calendar: {
        sameDay: '[Idag] LT',
        nextDay: '[Imorgon] LT',
        lastDay: '[Igår] LT',
        nextWeek: '[På] dddd LT',
        lastWeek: '[I] dddd[s] LT',
        sameElse: 'L',
    },
    relativeTime: {
        future: 'om %s',
        past: 'för %s sedan',
        s: 'några sekunder',
        ss: '%d sekunder',
        m: 'en minut',
        mm: '%d minuter',
        h: 'en timme',
        hh: '%d timmar',
        d: 'en dag',
        dd: '%d dagar',
        M: 'en månad',
        MM: '%d månader',
        y: 'ett år',
        yy: '%d år',
    },
    dayOfMonthOrdinalParse: /\d{1,2}(\:e|\:a)/,
    ordinal: function (number) {
        var b = number % 10,
            output =
                ~~((number % 100) / 10) === 1
                    ? ':e'
                    : b === 1
                    ? ':a'
                    : b === 2
                    ? ':a'
                    : b === 3
                    ? ':e'
                    : ':e';
        return number + output;
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
});
