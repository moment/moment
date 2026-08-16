//! moment.js locale configuration
//! locale : Swahili [sw]
//! author : Fahad Kassim : https://github.com/fadsel

import moment from '../moment';

var relativeTime = {
    ss: 'sekunde %d',
    m: 'dakika moja',
    mm: 'dakika %d',
    h: 'saa moja',
    hh: 'saa %d',
    d: 'siku moja',
    dd: 'siku %d',
    M: 'mwezi mmoja',
    MM: 'miezi %d',
    y: 'mwaka mmoja',
    yy: 'miaka %d',
};

function relativeTimeWithSuffix(number, withoutSuffix, key, isFuture) {
    var output = relativeTime[key].replace(/%d/i, number);

    if (withoutSuffix || isFuture) {
        return output;
    }

    switch (key) {
        case 'ss':
        case 'mm':
        case 'hh':
        case 'dd':
            return output + (number === 1 ? ' iliyopita' : ' zilizopita');
        case 'm':
        case 'h':
        case 'd':
            return output + ' iliyopita';
        case 'M':
        case 'y':
            return output + ' uliopita';
        case 'MM':
        case 'yy':
            return output + ' iliyopita';
    }
}

export default moment.defineLocale('sw', {
    months: 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split(
        '_'
    ),
    monthsShort: 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
    weekdays:
        'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split(
            '_'
        ),
    weekdaysShort: 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
    weekdaysMin: 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'hh:mm A',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    calendar: {
        sameDay: '[leo saa] LT',
        nextDay: '[kesho saa] LT',
        nextWeek: 'dddd [ijayo saa] LT',
        lastDay: '[jana] LT',
        lastWeek: 'dddd [iliyopita saa] LT',
        sameElse: 'L',
    },
    relativeTime: {
        future: '%s baadaye',
        past: function (output) {
            return output === 'hivi punde' ? 'tokea ' + output : output;
        },
        s: 'hivi punde',
        ss: relativeTimeWithSuffix,
        m: relativeTimeWithSuffix,
        mm: relativeTimeWithSuffix,
        h: relativeTimeWithSuffix,
        hh: relativeTimeWithSuffix,
        d: relativeTimeWithSuffix,
        dd: relativeTimeWithSuffix,
        M: relativeTimeWithSuffix,
        MM: relativeTimeWithSuffix,
        y: relativeTimeWithSuffix,
        yy: relativeTimeWithSuffix,
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7, // The week that contains Jan 7th is the first week of the year.
    },
});
