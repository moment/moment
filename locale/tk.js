// moment.js locale configuration
// locale : turkmen (tk)
// author : Isa Ishangulyyev : https://github.com/isa424

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['moment'], factory); // AMD
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../moment')); // Node
    } else {
        factory(window.moment); // Browser global
    }
}(function (moment) {
    var suffixes = {
        1: '\'nji',
        5: '\'nji',
        8: '\'nji',
        70: '\'nji',
        80: '\'nji',

        2: '\'nji',
        7: '\'nji',
        20: '\'nji',
        50: '\'nji',

        3: '\'nji',
        4: '\'nji',
        100: '\'nji',

        6: '\'njy',

        9: '\'njy',
        10: '\'njy',
        30: '\'njy',

        60: '\'njy',
        90: '\'njy'
    };

    return moment.defineLocale('tr', {
        months : 'Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr'.split('_'),
        monthsShort : 'Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek'.split('_'),
        weekdays : 'Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe'.split('_'),
        weekdaysShort : 'Ýek_Duş_Siş_Çar_Pen_Ann_Şen'.split('_'),
        weekdaysMin : 'Ýe_Du_Si_Ça_Pe_An_Şe'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            L : 'DD.MM.YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd, D MMMM YYYY LT'
        },
        calendar : {
            sameDay : '[bugün sagat] LT',
            nextDay : '[ertir sagat] LT',
            nextWeek : '[indiki hepde] dddd [sagat] LT',
            lastDay : '[düýn] LT',
            lastWeek : '[geçen hepde] dddd [sagat] LT',
            sameElse : 'L'
        },
        relativeTime : {
            future : '%s soň',
            past : '%s öň',
            s : 'birnäçe sekund',
            m : 'bir minut',
            mm : '%d minut',
            h : 'bir sagat',
            hh : '%d sagat',
            d : 'bir gün',
            dd : '%d gün',
            M : 'bir aý',
            MM : '%d aý',
            y : 'bir ýyl',
            yy : '%d ýyl'
        },
        ordinal : function (number) {
            if (number === 0) {  // special case for zero
                return number + '\'ynjy';
            }
            var a = number % 10,
                b = number % 100 - a,
                c = number >= 100 ? 100 : null;

            return number + (suffixes[a] || suffixes[b] || suffixes[c]);
        },
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 7  // The week that contains Jan 1st is the first week of the year.
        }
    });
}));
