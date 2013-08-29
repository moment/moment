// moment.js language configuration
// language : lithuanian
// author : Marius Bieliauskas : https://github.com/recallfx


var units = {
    // A: 1,21, 101
    // B: 2-9, 22-29, 102-109
    // C: 0, 10, 11-19, 20, 110

    // presentA_presentB_presentC_pastA_pastB_pastC_futureA_futureB_futureC
    'mm' : 'minutė_minutės_minučių_minutę_minutes_minučių_minutės_minučių_minučių',
    'hh' : 'valanda_valandos_valandų_valandą_valandas_valandų_valandos_valandų_valandų',
    'dd' : 'diena_dienos_dienų_dieną_dienas_dienų_dienos_dienų_dienų',
    'MM' : 'mėnuo_mėnesiai_mėnesių_mėnesį_mėnesius_mėnesių_mėnesio_mėnesių_mėnesių',
    'yy' : 'metai_metai_metų_metus_metus_metų_metų_metų_metų'
};

function format(word, number, withoutSuffix, inFuture) {
    var unitOffset, forms = word.split('_');

    if (withoutSuffix) {
        unitOffset = 0;
    } else {
        unitOffset = !inFuture ? 3 : 6;
    }

    // we need the significant part of the original number [0..99];
    number = number - (Math.floor(number / 100) * 100);

    if (number % 10 === 1 && number !== 11) {
        // 1,21, 101...
        return forms[unitOffset + 0];
    } else if (number % 10 !== 0 && (number < 11 || 19 < number)) {
        // 2-9, 22-29, 102-109...
        return forms[unitOffset + 1];
    } else {
        // 0, 10, 11-19, 20, 110...
        return forms[unitOffset + 2];
    }
}

function relativeTimeWithPlural(number, withoutSuffix, key, inFuture) {
    return number + ' ' + format(units[key], number, withoutSuffix, inFuture);
}

var weekDays = "pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis_sekmadienis".split("_");

function relativeWeekDay(momentToFormat, format) {
    var withoutSuffix = format.indexOf('[val.]') === -1,
        weekDay = weekDays[momentToFormat.weekday()];

    return withoutSuffix ? weekDay : weekDay.substring(0, weekDay.length - 2) + "į";
}

require('../moment').lang('lt', {
    months : "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
    monthsShort : "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
    weekdays : relativeWeekDay,
    weekdaysShort : "S_P_A_T_K_Pn_Š".split("_"),
    weekdaysMin : "S_P_A_T_K_Pn_Š".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "YYYY-MM-DD",
        LL : "YYYY [m.] MMMM D [d.]",
        LLL : "YYYY [m.] MMMM D [d.] LT",
        LLLL : "YYYY [m.] MMMM D [d.], dddd LT",
        l : "YYYY-MM-DD",
        ll : "YYYY [m.] MMMM D [d.]",
        lll : "YYYY [m.] MMMM D [d.] LT",
        llll : "YYYY [m.] MMMM D [d.], dddd LT"
    },
    calendar : {
        sameDay : '[Šiandien] LT [val.]',
        nextDay : '[Rytoj] LT [val.]',
        nextWeek : 'dddd LT [val.]',
        lastDay : '[Vakar] LT [val.]',
        lastWeek : '[Praeitą] dddd LT [val.]',
        sameElse : 'L'
    },
    relativeTime : {
        future : "po %s",
        past : "prieš %s",
        s : function (number, withoutSuffix, key, inFuture) {
            if (withoutSuffix) {
                return "kelios sekundės";
            } else {
                return !inFuture ? "kelias sekundes" : "kelių sekundžių";
            }
        },
        m : "minutė",
        mm : relativeTimeWithPlural,
        h : "valanda",
        hh : relativeTimeWithPlural,
        d : "diena",
        dd : relativeTimeWithPlural,
        M : "mėnuo",
        MM : relativeTimeWithPlural,
        y : "metai",
        yy : relativeTimeWithPlural
    },
    ordinal : '%d',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4 // The week that contains Jan 4th is the first week of the year.
    }
});