// moment.js language configuration
// language : serbian (sr)
// author : Dejan Velimirovic : https://github.com/DVSoftware

var pluralRules = [
    function (n) { return ((n % 10 === 1) && (n % 100 !== 11)); },
    function (n) { return ((n % 10) >= 2 && (n % 10) <= 4 && ((n % 10) % 1) === 0) && ((n % 100) < 12 || (n % 100) > 14); },
    function (n) { return ((n % 10) === 0 || ((n % 10) >= 5 && (n % 10) <= 9 && ((n % 10) % 1) === 0) || ((n % 100) >= 11 && (n % 100) <= 14 && ((n % 100) % 1) === 0)); },
    function (n) { return true; }
];

function plural(word, num) {
    var forms = word.split('_'),
    minCount = Math.min(pluralRules.length, forms.length),
    i = -1;

    while (++i < minCount) {
        if (pluralRules[i](num)) {
            return forms[i];
        }
    }
    return forms[minCount - 1];
}

function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': 'minut_minuta_minuta_minuta',
        'hh': 'sat_sata_sati_sata',
        'dd': 'dan_dana_dana_dana',
        'MM': 'mesec_meseca_meseci_meseci',
        'yy': 'godina_godine_godina_godina'
    };

    return number + ' ' + plural(format[key], +number);
}

function monthsCaseReplace(m, format) {
    var months = {
        'nominative': 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
        'accusative': 'januara_februara_marta_aprila_maja_juna_jula_avgusta_septembra_oktobra_novembra_decembra'.split('_')
    },

    nounCase = (/D[oD]? *MMMM?/).test(format) ?
        'accusative' :
        'nominative';

    return months[nounCase][m.month()];
}

function weekdaysCaseReplace(m, format) {
    var weekdays = {
        'nominative': 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
        'accusative': 'nedelje_ponedeljka_utorka_srede_četvrtka_petka_subote'.split('_')
    },

    nounCase = (/\[ ?(?:Prošle|Sledeće)? ?\] ?dddd/).test(format) ?
        'accusative' :
        'nominative';

    return weekdays[nounCase][m.day()];
}

require('../moment').lang('sr', {
    months : monthsCaseReplace,
    monthsShort : "Jan_Feb_Mar_Apr_Maj_Jun_Jul_Avg_Sep_Okt_Nov_Dec".split("_"),
    weekdays : weekdaysCaseReplace,
    weekdaysShort : "Ned_Pon_Uto_Sre_Čet_Pet_Sub".split("_"),
    weekdaysMin : "Ne_Po_Ut_Sr_Če_Pe_Su".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD.MM.YYYY",
        LL : "D MMMM YYYY god.",
        LLL : "D MMMM YYYY god., LT",
        LLLL : "dddd, D MMMM YYYY god., LT"
    },
    calendar : {
        sameDay : '[Danas u] LT',
        nextDay : '[Sutra u] LT',
        nextWeek : 'dddd [u] LT',
        lastDay : '[Juče u] LT',
        lastWeek : function () {
            switch (this.day()) {
            case 0:
            case 3:
            case 6:
                return '[Prošle] dddd [u] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[Prošli] dddd [u] LT';
            }
        },
        sameElse : 'L'
    },
    // TODO: check plurals
    relativeTime : {
        future : "za %s",
        past : "pre %s",
        s : "nekoliko sekundi",
        m : 'minut',
        mm : relativeTimeWithPlural,
        h : "sat vremena",
        hh : relativeTimeWithPlural,
        d : "juče",
        dd : relativeTimeWithPlural,
        M : "mesec dana",
        MM : relativeTimeWithPlural,
        y : "godinu dana",
        yy : relativeTimeWithPlural
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
