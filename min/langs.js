(function(){
    function onload (moment) {
(function(){
// moment.js language configuration
// language : Moroccan Arabic (ar-ma)
// author : ElFadili Yassine : https://github.com/ElFadiliY
// author : Abdel Said : https://github.com/abdelsaid

moment.lang('ar-ma', {
    months : "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
    monthsShort : "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
    weekdays : "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
    weekdaysShort : "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
    weekdaysMin : "ح_ن_ث_ر_خ_ج_س".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[اليوم على الساعة] LT",
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "في %s",
        past : "منذ %s",
        s : "ثوان",
        m : "دقيقة",
        mm : "%d دقائق",
        h : "ساعة",
        hh : "%d ساعات",
        d : "يوم",
        dd : "%d أيام",
        M : "شهر",
        MM : "%d أشهر",
        y : "سنة",
        yy : "%d سنوات"
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : Arabic (ar)
// author : Abdel Said : https://github.com/abdelsaid
// changes in months, weekdays : Ahmed Elkhatib

moment.lang('ar', {
    months : "يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
    monthsShort : "يناير/ كانون الثاني_فبراير/ شباط_مارس/ آذار_أبريل/ نيسان_مايو/ أيار_يونيو/ حزيران_يوليو/ تموز_أغسطس/ آب_سبتمبر/ أيلول_أكتوبر/ تشرين الأول_نوفمبر/ تشرين الثاني_ديسمبر/ كانون الأول".split("_"),
    weekdays : "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
    weekdaysShort : "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
    weekdaysMin : "ح_ن_ث_ر_خ_ج_س".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[اليوم على الساعة] LT",
        nextDay: '[غدا على الساعة] LT',
        nextWeek: 'dddd [على الساعة] LT',
        lastDay: '[أمس على الساعة] LT',
        lastWeek: 'dddd [على الساعة] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "في %s",
        past : "منذ %s",
        s : "ثوان",
        m : "دقيقة",
        mm : "%d دقائق",
        h : "ساعة",
        hh : "%d ساعات",
        d : "يوم",
        dd : "%d أيام",
        M : "شهر",
        MM : "%d أشهر",
        y : "سنة",
        yy : "%d سنوات"
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : bulgarian (bg)
// author : Krasen Borisov : https://github.com/kraz

moment.lang('bg', {
    months : "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
    monthsShort : "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
    weekdays : "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
    weekdaysShort : "нед_пон_вто_сря_чет_пет_съб".split("_"),
    weekdaysMin : "нд_пн_вт_ср_чт_пт_сб".split("_"),
    longDateFormat : {
        LT : "h:mm",
        L : "D.MM.YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
    },
    calendar : {
        sameDay : '[Днес в] LT',
        nextDay : '[Утре в] LT',
        nextWeek : 'dddd [в] LT',
        lastDay : '[Вчера в] LT',
        lastWeek : function () {
            switch (this.day()) {
            case 0:
            case 3:
            case 6:
                return '[В изминалата] dddd [в] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[В изминалия] dddd [в] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : "след %s",
        past : "преди %s",
        s : "няколко секунди",
        m : "минута",
        mm : "%d минути",
        h : "час",
        hh : "%d часа",
        d : "ден",
        dd : "%d дни",
        M : "месец",
        MM : "%d месеца",
        y : "година",
        yy : "%d години"
    },
    ordinal : function (number) {
        var lastDigit = number % 10,
            last2Digits = number % 100;
        if (number === 0) {
            return number + '-ев';
        } else if (last2Digits === 0) {
            return number + '-ен';
        } else if (last2Digits > 10 && last2Digits < 20) {
            return number + '-ти';
        } else if (lastDigit === 1) {
            return number + '-ви';
        } else if (lastDigit === 2) {
            return number + '-ри';
        } else if (lastDigit === 7 || lastDigit === 8) {
            return number + '-ми';
        } else {
            return number + '-ти';
        }
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : breton (br)
// author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

function relativeTimeWithMutation(number, withoutSuffix, key) {
    var format = {
        'mm': "munutenn",
        'MM': "miz",
        'dd': "devezh"
    };
    return number + ' ' + mutation(format[key], number);
}

function specialMutationForYears(number) {
    switch (lastNumber(number)) {
    case 1:
    case 3:
    case 4:
    case 5:
    case 9:
        return number + ' bloaz';
    default:
        return number + ' vloaz';
    }
}

function lastNumber(number) {
    if (number > 9) {
        return lastNumber(number % 10);
    }
    return number;
}

function mutation(text, number) {
    if (number === 2) {
        return softMutation(text);
    }
    return text;
}

function softMutation(text) {
    var mutationTable = {
        'm': 'v',
        'b': 'v',
        'd': 'z'
    };
    if (mutationTable[text.charAt(0)] === undefined) {
        return text;
    }
    return mutationTable[text.charAt(0)] + text.substring(1);
}

moment.lang('br', {
    months : "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
    monthsShort : "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
    weekdays : "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
    weekdaysShort : "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
    weekdaysMin : "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
    longDateFormat : {
        LT : "h[e]mm A",
        L : "DD/MM/YYYY",
        LL : "D [a viz] MMMM YYYY",
        LLL : "D [a viz] MMMM YYYY LT",
        LLLL : "dddd, D [a viz] MMMM YYYY LT"
    },
    calendar : {
        sameDay : '[Hiziv da] LT',
        nextDay : '[Warc\'hoazh da] LT',
        nextWeek : 'dddd [da] LT',
        lastDay : '[Dec\'h da] LT',
        lastWeek : 'dddd [paset da] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "a-benn %s",
        past : "%s 'zo",
        s : "un nebeud segondennoù",
        m : "ur vunutenn",
        mm : relativeTimeWithMutation,
        h : "un eur",
        hh : "%d eur",
        d : "un devezh",
        dd : relativeTimeWithMutation,
        M : "ur miz",
        MM : relativeTimeWithMutation,
        y : "ur bloaz",
        yy : specialMutationForYears
    },
    ordinal : function (number) {
        var output = (number === 1) ? 'añ' : 'vet';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : catalan (ca)
// author : Juan G. Hurtado : https://github.com/juanghurtado

moment.lang('ca', {
    months : "Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"),
    monthsShort : "Gen._Febr._Mar._Abr._Mai._Jun._Jul._Ag._Set._Oct._Nov._Des.".split("_"),
    weekdays : "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"),
    weekdaysShort : "Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"),
    weekdaysMin : "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
    longDateFormat : {
        LT : "H:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay : function () {
            return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        nextDay : function () {
            return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        lastDay : function () {
            return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : "en %s",
        past : "fa %s",
        s : "uns segons",
        m : "un minut",
        mm : "%d minuts",
        h : "una hora",
        hh : "%d hores",
        d : "un dia",
        dd : "%d dies",
        M : "un mes",
        MM : "%d mesos",
        y : "un any",
        yy : "%d anys"
    },
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : czech (cs)
// author : petrbela : https://github.com/petrbela

var months = "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),
    monthsShort = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_");

function plural(n) {
    return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
}

function translate(number, withoutSuffix, key, isFuture) {
    var result = number + " ";
    switch (key) {
    case 's':  // a few seconds / in a few seconds / a few seconds ago
        return (withoutSuffix || isFuture) ? 'pár vteřin' : 'pár vteřinami';
    case 'm':  // a minute / in a minute / a minute ago
        return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
    case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'minuty' : 'minut');
        } else {
            return result + 'minutami';
        }
        break;
    case 'h':  // an hour / in an hour / an hour ago
        return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
    case 'hh': // 9 hours / in 9 hours / 9 hours ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'hodiny' : 'hodin');
        } else {
            return result + 'hodinami';
        }
        break;
    case 'd':  // a day / in a day / a day ago
        return (withoutSuffix || isFuture) ? 'den' : 'dnem';
    case 'dd': // 9 days / in 9 days / 9 days ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'dny' : 'dní');
        } else {
            return result + 'dny';
        }
        break;
    case 'M':  // a month / in a month / a month ago
        return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
    case 'MM': // 9 months / in 9 months / 9 months ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'měsíce' : 'měsíců');
        } else {
            return result + 'měsíci';
        }
        break;
    case 'y':  // a year / in a year / a year ago
        return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
    case 'yy': // 9 years / in 9 years / 9 years ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'roky' : 'let');
        } else {
            return result + 'lety';
        }
        break;
    }
}

moment.lang('cs', {
    months : months,
    monthsShort : monthsShort,
    monthsParse : (function (months, monthsShort) {
        var i, _monthsParse = [];
        for (i = 0; i < 12; i++) {
            // use custom parser to solve problem with July (červenec)
            _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
        }
        return _monthsParse;
    }(months, monthsShort)),
    weekdays : "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
    weekdaysShort : "ne_po_út_st_čt_pá_so".split("_"),
    weekdaysMin : "ne_po_út_st_čt_pá_so".split("_"),
    longDateFormat : {
        LT: "H:mm",
        L : "DD.MM.YYYY",
        LL : "D. MMMM YYYY",
        LLL : "D. MMMM YYYY LT",
        LLLL : "dddd D. MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[dnes v] LT",
        nextDay: '[zítra v] LT',
        nextWeek: function () {
            switch (this.day()) {
            case 0:
                return '[v neděli v] LT';
            case 1:
            case 2:
                return '[v] dddd [v] LT';
            case 3:
                return '[ve středu v] LT';
            case 4:
                return '[ve čtvrtek v] LT';
            case 5:
                return '[v pátek v] LT';
            case 6:
                return '[v sobotu v] LT';
            }
        },
        lastDay: '[včera v] LT',
        lastWeek: function () {
            switch (this.day()) {
            case 0:
                return '[minulou neděli v] LT';
            case 1:
            case 2:
                return '[minulé] dddd [v] LT';
            case 3:
                return '[minulou středu v] LT';
            case 4:
            case 5:
                return '[minulý] dddd [v] LT';
            case 6:
                return '[minulou sobotu v] LT';
            }
        },
        sameElse: "L"
    },
    relativeTime : {
        future : "za %s",
        past : "před %s",
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : chuvash (cv)
// author : Anatoly Mironov : https://github.com/mirontoli


moment.lang('cv', {
    months : "кăрлач_нарăс_пуш_ака_май_çĕртме_утă_çурла_авăн_юпа_чӳк_раштав".split("_"),
    monthsShort : "кăр_нар_пуш_ака_май_çĕр_утă_çур_ав_юпа_чӳк_раш".split("_"),
    weekdays : "вырсарникун_тунтикун_ытларикун_юнкун_кĕçнерникун_эрнекун_шăматкун".split("_"),
    weekdaysShort : "выр_тун_ытл_юн_кĕç_эрн_шăм".split("_"),
    weekdaysMin : "вр_тн_ыт_юн_кç_эр_шм".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD-MM-YYYY",
        LL : "YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ]",
        LLL : "YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT",
        LLLL : "dddd, YYYY [çулхи] MMMM [уйăхĕн] D[-мĕшĕ], LT"
    },
    calendar : {
        sameDay: '[Паян] LT [сехетре]',
        nextDay: '[Ыран] LT [сехетре]',
        lastDay: '[Ĕнер] LT [сехетре]',
        nextWeek: '[Çитес] dddd LT [сехетре]',
        lastWeek: '[Иртнĕ] dddd LT [сехетре]',
        sameElse: 'L'
    },
    relativeTime : {
        future : function (output) {
            var affix = /сехет$/i.exec(output) ? "рен" : /çул$/i.exec(output) ? "тан" : "ран";
            return output + affix;
        },
        past : "%s каялла",
        s : "пĕр-ик çеккунт",
        m : "пĕр минут",
        mm : "%d минут",
        h : "пĕр сехет",
        hh : "%d сехет",
        d : "пĕр кун",
        dd : "%d кун",
        M : "пĕр уйăх",
        MM : "%d уйăх",
        y : "пĕр çул",
        yy : "%d çул"
    },
    ordinal : '%d-мĕш',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : danish (da)
// author : Ulrik Nielsen : https://github.com/mrbase

moment.lang('da', {
    months : "Januar_Februar_Marts_April_Maj_Juni_Juli_August_September_Oktober_November_December".split("_"),
    monthsShort : "Jan_Feb_Mar_Apr_Maj_Jun_Jul_Aug_Sep_Okt_Nov_Dec".split("_"),
    weekdays : "Søndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_Lørdag".split("_"),
    weekdaysShort : "Søn_Man_Tir_Ons_Tor_Fre_Lør".split("_"),
    weekdaysMin : "Sø_Ma_Ti_On_To_Fr_Lø".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D. MMMM, YYYY LT"
    },
    calendar : {
        sameDay : '[I dag kl.] LT',
        nextDay : '[I morgen kl.] LT',
        nextWeek : 'dddd [kl.] LT',
        lastDay : '[I går kl.] LT',
        lastWeek : '[sidste] dddd [kl] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "om %s",
        past : "%s siden",
        s : "få sekunder",
        m : "et minut",
        mm : "%d minutter",
        h : "en time",
        hh : "%d timer",
        d : "en dag",
        dd : "%d dage",
        M : "en måned",
        MM : "%d måneder",
        y : "et år",
        yy : "%d år"
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : german (de)
// author : lluchs : https://github.com/lluchs
// author: Menelion Elensúle: https://github.com/Oire

function processRelativeTime(number, withoutSuffix, key, isFuture) {
    var format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [number + ' Tage', number + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [number + ' Monate', number + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [number + ' Jahre', number + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

moment.lang('de', {
    months : "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
    monthsShort : "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
    weekdays : "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
    weekdaysShort : "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
    weekdaysMin : "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
    longDateFormat : {
        LT: "H:mm [Uhr]",
        L : "DD.MM.YYYY",
        LL : "D. MMMM YYYY",
        LLL : "D. MMMM YYYY LT",
        LLLL : "dddd, D. MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Heute um] LT",
        sameElse: "L",
        nextDay: '[Morgen um] LT',
        nextWeek: 'dddd [um] LT',
        lastDay: '[Gestern um] LT',
        lastWeek: '[letzten] dddd [um] LT'
    },
    relativeTime : {
        future : "in %s",
        past : "vor %s",
        s : "ein paar Sekunden",
        m : processRelativeTime,
        mm : "%d Minuten",
        h : processRelativeTime,
        hh : "%d Stunden",
        d : processRelativeTime,
        dd : processRelativeTime,
        M : processRelativeTime,
        MM : processRelativeTime,
        y : processRelativeTime,
        yy : processRelativeTime
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : modern greek (el)
// author : Aggelos Karalias : https://github.com/mehiel

moment.lang('el', {
    monthsNominativeEl : "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
    monthsGenitiveEl : "Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split("_"),
    months : function (momentToFormat, format) {
        if (/D/.test(format.substring(0, format.indexOf("MMMM")))) { // if there is a day number before 'MMMM'
            return this._monthsGenitiveEl[momentToFormat.month()];
        } else {
            return this._monthsNominativeEl[momentToFormat.month()];
        }
    },
    monthsShort : "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
    weekdays : "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
    weekdaysShort : "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
    weekdaysMin : "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'μμ' : 'ΜΜ';
        } else {
            return isLower ? 'πμ' : 'ΠΜ';
        }
    },
    longDateFormat : {
        LT : "h:mm A",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
    },
    calendarEl : {
        sameDay : '[Σήμερα {}] LT',
        nextDay : '[Αύριο {}] LT',
        nextWeek : 'dddd [{}] LT',
        lastDay : '[Χθες {}] LT',
        lastWeek : '[την προηγούμενη] dddd [{}] LT',
        sameElse : 'L'
    },
    calendar : function (key, mom) {
        var output = this._calendarEl[key],
            hours = mom && mom.hours();

        return output.replace("{}", (hours % 12 === 1 ? "στη" : "στις"));
    },
    relativeTime : {
        future : "σε %s",
        past : "%s πριν",
        s : "δευτερόλεπτα",
        m : "ένα λεπτό",
        mm : "%d λεπτά",
        h : "μία ώρα",
        hh : "%d ώρες",
        d : "μία μέρα",
        dd : "%d μέρες",
        M : "ένας μήνας",
        MM : "%d μήνες",
        y : "ένας χρόνος",
        yy : "%d χρόνια"
    },
    ordinal : function (number) {
        return number + 'η';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : canadian english (en-ca)
// author : Jonathan Abourbih : https://github.com/jonbca

moment.lang('en-ca', {
    months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat : {
        LT : "h:mm A",
        L : "YYYY-MM-DD",
        LL : "D MMMM, YYYY",
        LLL : "D MMMM, YYYY LT",
        LLLL : "dddd, D MMMM, YYYY LT"
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
        future : "in %s",
        past : "%s ago",
        s : "a few seconds",
        m : "a minute",
        mm : "%d minutes",
        h : "an hour",
        hh : "%d hours",
        d : "a day",
        dd : "%d days",
        M : "a month",
        MM : "%d months",
        y : "a year",
        yy : "%d years"
    },
    ordinal : function (number) {
        var b = number % 10,
            output = (~~ (number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});
})();
(function(){
// moment.js language configuration
// language : great britain english (en-gb)
// author : Chris Gedrim : https://github.com/chrisgedrim

moment.lang('en-gb', {
    months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
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
        future : "in %s",
        past : "%s ago",
        s : "a few seconds",
        m : "a minute",
        mm : "%d minutes",
        h : "an hour",
        hh : "%d hours",
        d : "a day",
        dd : "%d days",
        M : "a month",
        MM : "%d months",
        y : "a year",
        yy : "%d years"
    },
    ordinal : function (number) {
        var b = number % 10,
            output = (~~ (number % 100 / 10) === 1) ? 'th' :
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
})();
(function(){
// moment.js language configuration
// language : esperanto (eo)
// author : Colin Dean : https://github.com/colindean
// komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
//          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!

moment.lang('eo', {
    months : "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
    monthsShort : "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
    weekdays : "Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
    weekdaysShort : "Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
    weekdaysMin : "Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "YYYY-MM-DD",
        LL : "D[-an de] MMMM, YYYY",
        LLL : "D[-an de] MMMM, YYYY LT",
        LLLL : "dddd, [la] D[-an de] MMMM, YYYY LT"
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'p.t.m.' : 'P.T.M.';
        } else {
            return isLower ? 'a.t.m.' : 'A.T.M.';
        }
    },
    calendar : {
        sameDay : '[Hodiaŭ je] LT',
        nextDay : '[Morgaŭ je] LT',
        nextWeek : 'dddd [je] LT',
        lastDay : '[Hieraŭ je] LT',
        lastWeek : '[pasinta] dddd [je] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "je %s",
        past : "antaŭ %s",
        s : "sekundoj",
        m : "minuto",
        mm : "%d minutoj",
        h : "horo",
        hh : "%d horoj",
        d : "tago",//ne 'diurno', ĉar estas uzita por proksimumo
        dd : "%d tagoj",
        M : "monato",
        MM : "%d monatoj",
        y : "jaro",
        yy : "%d jaroj"
    },
    ordinal : "%da",
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : spanish (es)
// author : Julio Napurí : https://github.com/julionc

moment.lang('es', {
    months : "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
    monthsShort : "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
    weekdays : "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
    weekdaysShort : "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
    weekdaysMin : "Do_Lu_Ma_Mi_Ju_Vi_Sá".split("_"),
    longDateFormat : {
        LT : "H:mm",
        L : "DD/MM/YYYY",
        LL : "D [de] MMMM [de] YYYY",
        LLL : "D [de] MMMM [de] YYYY LT",
        LLLL : "dddd, D [de] MMMM [de] YYYY LT"
    },
    calendar : {
        sameDay : function () {
            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextDay : function () {
            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastDay : function () {
            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        lastWeek : function () {
            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : "en %s",
        past : "hace %s",
        s : "unos segundos",
        m : "un minuto",
        mm : "%d minutos",
        h : "una hora",
        hh : "%d horas",
        d : "un día",
        dd : "%d días",
        M : "un mes",
        MM : "%d meses",
        y : "un año",
        yy : "%d años"
    },
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : estonian (et)
// author : Henry Kehlmann : https://github.com/madhenry

function translateSeconds(number, withoutSuffix, key, isFuture) {
    return (isFuture || withoutSuffix) ? 'paari sekundi' : 'paar sekundit';
}

moment.lang('et', {
    months        : "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
    monthsShort   : "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
    weekdays      : "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
    weekdaysShort : "P_E_T_K_N_R_L".split("_"),
    weekdaysMin   : "P_E_T_K_N_R_L".split("_"),
    longDateFormat : {
        LT   : "H:mm",
        L    : "DD.MM.YYYY",
        LL   : "D. MMMM YYYY",
        LLL  : "D. MMMM YYYY LT",
        LLLL : "dddd, D. MMMM YYYY LT"
    },
    calendar : {
        sameDay  : '[Täna,] LT',
        nextDay  : '[Homme,] LT',
        nextWeek : '[Järgmine] dddd LT',
        lastDay  : '[Eile,] LT',
        lastWeek : '[Eelmine] dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s pärast",
        past   : "%s tagasi",
        s      : translateSeconds,
        m      : "minut",
        mm     : "%d minutit",
        h      : "tund",
        hh     : "%d tundi",
        d      : "päev",
        dd     : "%d päeva",
        M      : "kuu",
        MM     : "%d kuud",
        y      : "aasta",
        yy     : "%d aastat"
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : euskara (eu)
// author : Eneko Illarramendi : https://github.com/eillarra

moment.lang('eu', {
    months : "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
    monthsShort : "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
    weekdays : "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
    weekdaysShort : "ig._al._ar._az._og._ol._lr.".split("_"),
    weekdaysMin : "ig_al_ar_az_og_ol_lr".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "YYYY-MM-DD",
        LL : "YYYY[ko] MMMM[ren] D[a]",
        LLL : "YYYY[ko] MMMM[ren] D[a] LT",
        LLLL : "dddd, YYYY[ko] MMMM[ren] D[a] LT",
        l : "YYYY-M-D",
        ll : "YYYY[ko] MMM D[a]",
        lll : "YYYY[ko] MMM D[a] LT",
        llll : "ddd, YYYY[ko] MMM D[a] LT"
    },
    calendar : {
        sameDay : '[gaur] LT[etan]',
        nextDay : '[bihar] LT[etan]',
        nextWeek : 'dddd LT[etan]',
        lastDay : '[atzo] LT[etan]',
        lastWeek : '[aurreko] dddd LT[etan]',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s barru",
        past : "duela %s",
        s : "segundo batzuk",
        m : "minutu bat",
        mm : "%d minutu",
        h : "ordu bat",
        hh : "%d ordu",
        d : "egun bat",
        dd : "%d egun",
        M : "hilabete bat",
        MM : "%d hilabete",
        y : "urte bat",
        yy : "%d urte"
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : Persian Language
// author : Ebrahim Byagowi : https://github.com/ebraminio
var symbolMap = {
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
    '0': '۰'
}, numberMap = {
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
    '۰': '0'
};

moment.lang('fa', {
    months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
    weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
    weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
    weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
    longDateFormat : {
        LT : 'HH:mm',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY LT',
        LLLL : 'dddd, D MMMM YYYY LT'
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return "قبل از ظهر";
        } else {
            return "بعد از ظهر";
        }
    },
    calendar : {
        sameDay : '[امروز ساعت] LT',
        nextDay : '[فردا ساعت] LT',
        nextWeek : 'dddd [ساعت] LT',
        lastDay : '[دیروز ساعت] LT',
        lastWeek : 'dddd [پیش] [ساعت] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'در %s',
        past : '%s پیش',
        s : 'چندین ثانیه',
        m : 'یک دقیقه',
        mm : '%d دقیقه',
        h : 'یک ساعت',
        hh : '%d ساعت',
        d : 'یک روز',
        dd : '%d روز',
        M : 'یک ماه',
        MM : '%d ماه',
        y : 'یک سال',
        yy : '%d سال'
    },
    preparse: function (string) {
        return string.replace(/[۰-۹]/g, function (match) {
            return numberMap[match];
        }).replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        }).replace(/,/g, '،');
    },
    ordinal : '%dم',
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12 // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : finnish (fi)
// author : Tarmo Aidantausta : https://github.com/bleadof

var numbers_past = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' '),
    numbers_future = ['nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
                      numbers_past[7], numbers_past[8], numbers_past[9]];

function translate(number, withoutSuffix, key, isFuture) {
    var result = "";
    switch (key) {
    case 's':
        return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
    case 'm':
        return isFuture ? 'minuutin' : 'minuutti';
    case 'mm':
        result = isFuture ? 'minuutin' : 'minuuttia';
        break;
    case 'h':
        return isFuture ? 'tunnin' : 'tunti';
    case 'hh':
        result = isFuture ? 'tunnin' : 'tuntia';
        break;
    case 'd':
        return isFuture ? 'päivän' : 'päivä';
    case 'dd':
        result = isFuture ? 'päivän' : 'päivää';
        break;
    case 'M':
        return isFuture ? 'kuukauden' : 'kuukausi';
    case 'MM':
        result = isFuture ? 'kuukauden' : 'kuukautta';
        break;
    case 'y':
        return isFuture ? 'vuoden' : 'vuosi';
    case 'yy':
        result = isFuture ? 'vuoden' : 'vuotta';
        break;
    }
    result = verbal_number(number, isFuture) + " " + result;
    return result;
}

function verbal_number(number, isFuture) {
    return number < 10 ? (isFuture ? numbers_future[number] : numbers_past[number]) : number;
}

moment.lang('fi', {
    months : "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
    monthsShort : "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
    weekdays : "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
    weekdaysShort : "su_ma_ti_ke_to_pe_la".split("_"),
    weekdaysMin : "su_ma_ti_ke_to_pe_la".split("_"),
    longDateFormat : {
        LT : "HH.mm",
        L : "DD.MM.YYYY",
        LL : "Do MMMM[ta] YYYY",
        LLL : "Do MMMM[ta] YYYY, [klo] LT",
        LLLL : "dddd, Do MMMM[ta] YYYY, [klo] LT",
        l : "D.M.YYYY",
        ll : "Do MMM YYYY",
        lll : "Do MMM YYYY, [klo] LT",
        llll : "ddd, Do MMM YYYY, [klo] LT"
    },
    calendar : {
        sameDay : '[tänään] [klo] LT',
        nextDay : '[huomenna] [klo] LT',
        nextWeek : 'dddd [klo] LT',
        lastDay : '[eilen] [klo] LT',
        lastWeek : '[viime] dddd[na] [klo] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s päästä",
        past : "%s sitten",
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    ordinal : "%d.",
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : canadian french (fr-ca)
// author : Jonathan Abourbih : https://github.com/jonbca

moment.lang('fr-ca', {
    months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
    monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
    weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "YYYY-MM-DD",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Aujourd'hui à] LT",
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "dans %s",
        past : "il y a %s",
        s : "quelques secondes",
        m : "une minute",
        mm : "%d minutes",
        h : "une heure",
        hh : "%d heures",
        d : "un jour",
        dd : "%d jours",
        M : "un mois",
        MM : "%d mois",
        y : "un an",
        yy : "%d ans"
    },
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : '');
    }
});
})();
(function(){
// moment.js language configuration
// language : french (fr)
// author : John Fischer : https://github.com/jfroffice

moment.lang('fr', {
    months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
    monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
    weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Aujourd'hui à] LT",
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "dans %s",
        past : "il y a %s",
        s : "quelques secondes",
        m : "une minute",
        mm : "%d minutes",
        h : "une heure",
        hh : "%d heures",
        d : "un jour",
        dd : "%d jours",
        M : "un mois",
        MM : "%d mois",
        y : "un an",
        yy : "%d ans"
    },
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : '');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : galician (gl)
// author : Juan G. Hurtado : https://github.com/juanghurtado

moment.lang('gl', {
    months : "Xaneiro_Febreiro_Marzo_Abril_Maio_Xuño_Xullo_Agosto_Setembro_Outubro_Novembro_Decembro".split("_"),
    monthsShort : "Xan._Feb._Mar._Abr._Mai._Xuñ._Xul._Ago._Set._Out._Nov._Dec.".split("_"),
    weekdays : "Domingo_Luns_Martes_Mércores_Xoves_Venres_Sábado".split("_"),
    weekdaysShort : "Dom._Lun._Mar._Mér._Xov._Ven._Sáb.".split("_"),
    weekdaysMin : "Do_Lu_Ma_Mé_Xo_Ve_Sá".split("_"),
    longDateFormat : {
        LT : "H:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay : function () {
            return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
        },
        nextDay : function () {
            return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
        },
        nextWeek : function () {
            return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
        },
        lastDay : function () {
            return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
        },
        lastWeek : function () {
            return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : function (str) {
            if (str === "uns segundos") {
                return "nuns segundos";
            }
            return "en " + str;
        },
        past : "hai %s",
        s : "uns segundos",
        m : "un minuto",
        mm : "%d minutos",
        h : "unha hora",
        hh : "%d horas",
        d : "un día",
        dd : "%d días",
        M : "un mes",
        MM : "%d meses",
        y : "un ano",
        yy : "%d anos"
    },
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : Hebrew (he)
// author : Tomer Cohen : https://github.com/tomer
// author : Moshe Simantov : https://github.com/DevelopmentIL

moment.lang('he', {
    months : "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
    monthsShort : "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
    weekdays : "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
    weekdaysShort : "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
    weekdaysMin : "א_ב_ג_ד_ה_ו_ש".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D [ב]MMMM YYYY",
        LLL : "D [ב]MMMM YYYY LT",
        LLLL : "dddd, D [ב]MMMM YYYY LT",
        l : "D/M/YYYY",
        ll : "D MMM YYYY",
        lll : "D MMM YYYY LT",
        llll : "ddd, D MMM YYYY LT"
    },
    calendar : {
        sameDay : '[היום ב־]LT',
        nextDay : '[מחר ב־]LT',
        nextWeek : 'dddd [בשעה] LT',
        lastDay : '[אתמול ב־]LT',
        lastWeek : '[ביום] dddd [האחרון בשעה] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "בעוד %s",
        past : "לפני %s",
        s : "מספר שניות",
        m : "דקה",
        mm : "%d דקות",
        h : "שעה",
        hh : "%d שעות",
        d : "יום",
        dd : "%d ימים",
        M : "חודש",
        MM : "%d חודשים",
        y : "שנה",
        yy : "%d שנים"
    }
});
})();
(function(){
// moment.js language configuration
// language : hindi (hi)
// author : Mayank Singhal : https://github.com/mayanksinghal

var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
},
numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};

moment.lang('hi', {
    months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split("_"),
    monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split("_"),
    weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split("_"),
    weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split("_"),
    weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split("_"),
    longDateFormat : {
        LT : "A h:mm बजे",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY, LT",
        LLLL : "dddd, D MMMM YYYY, LT"
    },
    calendar : {
        sameDay : '[आज] LT',
        nextDay : '[कल] LT',
        nextWeek : 'dddd, LT',
        lastDay : '[कल] LT',
        lastWeek : '[पिछले] dddd, LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s में",
        past : "%s पहले",
        s : "कुछ ही क्षण",
        m : "एक मिनट",
        mm : "%d मिनट",
        h : "एक घंटा",
        hh : "%d घंटे",
        d : "एक दिन",
        dd : "%d दिन",
        M : "एक महीने",
        MM : "%d महीने",
        y : "एक वर्ष",
        yy : "%d वर्ष"
    },
    preparse: function (string) {
        return string.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
    meridiem : function (hour, minute, isLower) {
        if (hour < 4) {
            return "रात";
        } else if (hour < 10) {
            return "सुबह";
        } else if (hour < 17) {
            return "दोपहर";
        } else if (hour < 20) {
            return "शाम";
        } else {
            return "रात";
        }
    },
    week : {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : hungarian (hu)
// author : Adam Brunner : https://github.com/adambrunner

var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');

function translate(number, withoutSuffix, key, isFuture) {
    var num = number,
        suffix;

    switch (key) {
    case 's':
        return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
    case 'm':
        return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
    case 'mm':
        return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
    case 'h':
        return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
    case 'hh':
        return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
    case 'd':
        return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
    case 'dd':
        return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
    case 'M':
        return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
    case 'MM':
        return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
    case 'y':
        return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
    case 'yy':
        return num + (isFuture || withoutSuffix ? ' év' : ' éve');
    }

    return '';
}

function week(isFuture) {
    return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
}

moment.lang('hu', {
    months : "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
    monthsShort : "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
    weekdays : "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
    weekdaysShort : "v_h_k_sze_cs_p_szo".split("_"),
    longDateFormat : {
        LT : "H:mm",
        L : "YYYY.MM.DD.",
        LL : "YYYY. MMMM D.",
        LLL : "YYYY. MMMM D., LT",
        LLLL : "YYYY. MMMM D., dddd LT"
    },
    calendar : {
        sameDay : '[ma] LT[-kor]',
        nextDay : '[holnap] LT[-kor]',
        nextWeek : function () {
            return week.call(this, true);
        },
        lastDay : '[tegnap] LT[-kor]',
        lastWeek : function () {
            return week.call(this, false);
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s múlva",
        past : "%s",
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : Bahasa Indonesia (id)
// author : Mohammad Satrio Utomo : https://github.com/tyok
// reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

moment.lang('id', {
    months : "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
    monthsShort : "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des".split("_"),
    weekdays : "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
    weekdaysShort : "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
    weekdaysMin : "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
    longDateFormat : {
        LT : "HH.mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY [pukul] LT",
        LLLL : "dddd, D MMMM YYYY [pukul] LT"
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'siang';
        } else if (hours < 19) {
            return 'sore';
        } else {
            return 'malam';
        }
    },
    calendar : {
        sameDay : '[Hari ini pukul] LT',
        nextDay : '[Besok pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kemarin pukul] LT',
        lastWeek : 'dddd [lalu pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "dalam %s",
        past : "%s yang lalu",
        s : "beberapa detik",
        m : "semenit",
        mm : "%d menit",
        h : "sejam",
        hh : "%d jam",
        d : "sehari",
        dd : "%d hari",
        M : "sebulan",
        MM : "%d bulan",
        y : "setahun",
        yy : "%d tahun"
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : icelandic (is)
// author : Hinrik Örn Sigurðsson : https://github.com/hinrik

function plural(n) {
    if (n % 100 === 11) {
        return true;
    } else if (n % 10 === 1) {
        return false;
    }
    return true;
}

function translate(number, withoutSuffix, key, isFuture) {
    var result = number + " ";
    switch (key) {
    case 's':
        return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
    case 'm':
        return withoutSuffix ? 'mínúta' : 'mínútu';
    case 'mm':
        if (plural(number)) {
            return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
        } else if (withoutSuffix) {
            return result + 'mínúta';
        }
        return result + 'mínútu';
    case 'hh':
        if (plural(number)) {
            return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
        }
        return result + 'klukkustund';
    case 'd':
        if (withoutSuffix) {
            return 'dagur';
        }
        return isFuture ? 'dag' : 'degi';
    case 'dd':
        if (plural(number)) {
            if (withoutSuffix) {
                return result + 'dagar';
            }
            return result + (isFuture ? 'daga' : 'dögum');
        } else if (withoutSuffix) {
            return result + 'dagur';
        }
        return result + (isFuture ? 'dag' : 'degi');
    case 'M':
        if (withoutSuffix) {
            return 'mánuður';
        }
        return isFuture ? 'mánuð' : 'mánuði';
    case 'MM':
        if (plural(number)) {
            if (withoutSuffix) {
                return result + 'mánuðir';
            }
            return result + (isFuture ? 'mánuði' : 'mánuðum');
        } else if (withoutSuffix) {
            return result + 'mánuður';
        }
        return result + (isFuture ? 'mánuð' : 'mánuði');
    case 'y':
        return withoutSuffix || isFuture ? 'ár' : 'ári';
    case 'yy':
        if (plural(number)) {
            return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
        }
        return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
    }
}

moment.lang('is', {
    months : "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
    monthsShort : "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
    weekdays : "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
    weekdaysShort : "sun_mán_þri_mið_fim_fös_lau".split("_"),
    weekdaysMin : "Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
    longDateFormat : {
        LT : "H:mm",
        L : "DD/MM/YYYY",
        LL : "D. MMMM YYYY",
        LLL : "D. MMMM YYYY [kl.] LT",
        LLLL : "dddd, D. MMMM YYYY [kl.] LT"
    },
    calendar : {
        sameDay : '[í dag kl.] LT',
        nextDay : '[á morgun kl.] LT',
        nextWeek : 'dddd [kl.] LT',
        lastDay : '[í gær kl.] LT',
        lastWeek : '[síðasta] dddd [kl.] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "eftir %s",
        past : "fyrir %s síðan",
        s : translate,
        m : translate,
        mm : translate,
        h : "klukkustund",
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : italian (it)
// author : Lorenzo : https://github.com/aliem
// author: Mattia Larentis: https://github.com/nostalgiaz

moment.lang('it', {
    months : "Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre".split("_"),
    monthsShort : "Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
    weekdays : "Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato".split("_"),
    weekdaysShort : "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
    weekdaysMin : "D_L_Ma_Me_G_V_S".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
    },
    calendar : {
        sameDay: '[Oggi alle] LT',
        nextDay: '[Domani alle] LT',
        nextWeek: 'dddd [alle] LT',
        lastDay: '[Ieri alle] LT',
        lastWeek: '[lo scorso] dddd [alle] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : function (s) {
            return ((/^[0-9].+$/).test(s) ? "tra" : "in") + " " + s;
        },
        past : "%s fa",
        s : "secondi",
        m : "un minuto",
        mm : "%d minuti",
        h : "un'ora",
        hh : "%d ore",
        d : "un giorno",
        dd : "%d giorni",
        M : "un mese",
        MM : "%d mesi",
        y : "un anno",
        yy : "%d anni"
    },
    ordinal: '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : japanese (ja)
// author : LI Long : https://github.com/baryon

moment.lang('ja', {
    months : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
    monthsShort : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
    weekdays : "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
    weekdaysShort : "日_月_火_水_木_金_土".split("_"),
    weekdaysMin : "日_月_火_水_木_金_土".split("_"),
    longDateFormat : {
        LT : "Ah時m分",
        L : "YYYY/MM/DD",
        LL : "YYYY年M月D日",
        LLL : "YYYY年M月D日LT",
        LLLL : "YYYY年M月D日LT dddd"
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return "午前";
        } else {
            return "午後";
        }
    },
    calendar : {
        sameDay : '[今日] LT',
        nextDay : '[明日] LT',
        nextWeek : '[来週]dddd LT',
        lastDay : '[昨日] LT',
        lastWeek : '[前週]dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s後",
        past : "%s前",
        s : "数秒",
        m : "1分",
        mm : "%d分",
        h : "1時間",
        hh : "%d時間",
        d : "1日",
        dd : "%d日",
        M : "1ヶ月",
        MM : "%dヶ月",
        y : "1年",
        yy : "%d年"
    }
});
})();
(function(){
// moment.js language configuration
// language : Georgian (ka)
// author : Irakli Janiashvili : https://github.com/irakli-janiashvili

function monthsCaseReplace(m, format) {
    var months = {
        'nominative': 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
        'accusative': 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
    },

    nounCase = (/D[oD] *MMMM?/).test(format) ?
        'accusative' :
        'nominative';

    return months[nounCase][m.month()];
}

function weekdaysCaseReplace(m, format) {
    var weekdays = {
        'nominative': 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
        'accusative': 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_')
    },

    nounCase = (/(წინა|შემდეგ)/).test(format) ?
        'accusative' :
        'nominative';

    return weekdays[nounCase][m.day()];
}

moment.lang('ka', {
    months : monthsCaseReplace,
    monthsShort : "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
    weekdays : weekdaysCaseReplace,
    weekdaysShort : "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
    weekdaysMin : "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
    longDateFormat : {
        LT : "h:mm A",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
    },
    calendar : {
        sameDay : '[დღეს] LT[-ზე]',
        nextDay : '[ხვალ] LT[-ზე]',
        lastDay : '[გუშინ] LT[-ზე]',
        nextWeek : '[შემდეგ] dddd LT[-ზე]',
        lastWeek : '[წინა] dddd LT-ზე',
        sameElse : 'L'
    },
    relativeTime : {
        future : function (s) {
            return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
                s.replace(/ი$/, "ში") :
                s + "ში";
        },
        past : function (s) {
            if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
                return s.replace(/(ი|ე)$/, "ის წინ");
            }
            if ((/წელი/).test(s)) {
                return s.replace(/წელი$/, "წლის წინ");
            }
        },
        s : "რამდენიმე წამი",
        m : "წუთი",
        mm : "%d წუთი",
        h : "საათი",
        hh : "%d საათი",
        d : "დღე",
        dd : "%d დღე",
        M : "თვე",
        MM : "%d თვე",
        y : "წელი",
        yy : "%d წელი"
    },
    ordinal : function (number) {
        if (number === 0) {
            return number;
        }

        if (number === 1) {
            return number + "-ლი";
        }

        if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
            return "მე-" + number;
        }

        return number + "-ე";
    },
    week : {
        dow : 1,
        doy : 7
    }
});
})();
(function(){
// moment.js language configuration
// language : korean (ko)
// author : Kyungwook, Park : https://github.com/kyungw00k

moment.lang('ko', {
    months : "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
    monthsShort : "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
    weekdays : "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
    weekdaysShort : "일_월_화_수_목_금_토".split("_"),
    weekdaysMin : "일_월_화_수_목_금_토".split("_"),
    longDateFormat : {
        LT : "A h시 mm분",
        L : "YYYY.MM.DD",
        LL : "YYYY년 MMMM D일",
        LLL : "YYYY년 MMMM D일 LT",
        LLLL : "YYYY년 MMMM D일 dddd LT"
    },
    meridiem : function (hour, minute, isUpper) {
        return hour < 12 ? '오전' : '오후';
    },
    calendar : {
        sameDay : '오늘 LT',
        nextDay : '내일 LT',
        nextWeek : 'dddd LT',
        lastDay : '어제 LT',
        lastWeek : '지난주 dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s 후",
        past : "%s 전",
        s : "몇초",
        ss : "%d초",
        m : "일분",
        mm : "%d분",
        h : "한시간",
        hh : "%d시간",
        d : "하루",
        dd : "%d일",
        M : "한달",
        MM : "%d달",
        y : "일년",
        yy : "%d년"
    },
    ordinal : '%d일'
});
})();
(function(){
// moment.js language configuration
// language : latvian (lv)
// author : Kristaps Karlsons : https://github.com/skakri

var units = {
    'mm': 'minūti_minūtes_minūte_minūtes',
    'hh': 'stundu_stundas_stunda_stundas',
    'dd': 'dienu_dienas_diena_dienas',
    'MM': 'mēnesi_mēnešus_mēnesis_mēneši',
    'yy': 'gadu_gadus_gads_gadi'
};

function format(word, number, withoutSuffix) {
    var forms = word.split('_');
    if (withoutSuffix) {
        return number % 10 === 1 && number !== 11 ? forms[2] : forms[3];
    } else {
        return number % 10 === 1 && number !== 11 ? forms[0] : forms[1];
    }
}

function relativeTimeWithPlural(number, withoutSuffix, key) {
    return number + ' ' + format(units[key], number, withoutSuffix);
}

moment.lang('lv', {
    months : "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
    monthsShort : "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
    weekdays : "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
    weekdaysShort : "Sv_P_O_T_C_Pk_S".split("_"),
    weekdaysMin : "Sv_P_O_T_C_Pk_S".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD.MM.YYYY",
        LL : "YYYY. [gada] D. MMMM",
        LLL : "YYYY. [gada] D. MMMM, LT",
        LLLL : "YYYY. [gada] D. MMMM, dddd, LT"
    },
    calendar : {
        sameDay : '[Šodien pulksten] LT',
        nextDay : '[Rīt pulksten] LT',
        nextWeek : 'dddd [pulksten] LT',
        lastDay : '[Vakar pulksten] LT',
        lastWeek : '[Pagājušā] dddd [pulksten] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s vēlāk",
        past : "%s agrāk",
        s : "dažas sekundes",
        m : "minūti",
        mm : relativeTimeWithPlural,
        h : "stundu",
        hh : relativeTimeWithPlural,
        d : "dienu",
        dd : relativeTimeWithPlural,
        M : "mēnesi",
        MM : relativeTimeWithPlural,
        y : "gadu",
        yy : relativeTimeWithPlural
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : Bahasa Malaysia (ms-MY)
// author : Weldan Jamili : https://github.com/weldan

moment.lang('ms-my', {
    months : "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
    monthsShort : "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
    weekdays : "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
    weekdaysShort : "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
    weekdaysMin : "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
    longDateFormat : {
        LT : "HH.mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY [pukul] LT",
        LLLL : "dddd, D MMMM YYYY [pukul] LT"
    },
    meridiem : function (hours, minutes, isLower) {
        if (hours < 11) {
            return 'pagi';
        } else if (hours < 15) {
            return 'tengahari';
        } else if (hours < 19) {
            return 'petang';
        } else {
            return 'malam';
        }
    },
    calendar : {
        sameDay : '[Hari ini pukul] LT',
        nextDay : '[Esok pukul] LT',
        nextWeek : 'dddd [pukul] LT',
        lastDay : '[Kelmarin pukul] LT',
        lastWeek : 'dddd [lepas pukul] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "dalam %s",
        past : "%s yang lepas",
        s : "beberapa saat",
        m : "seminit",
        mm : "%d minit",
        h : "sejam",
        hh : "%d jam",
        d : "sehari",
        dd : "%d hari",
        M : "sebulan",
        MM : "%d bulan",
        y : "setahun",
        yy : "%d tahun"
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : norwegian bokmål (nb)
// author : Espen Hovlandsdal : https://github.com/rexxars

moment.lang('nb', {
    months : "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort : "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
    weekdays : "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
    weekdaysShort : "søn_man_tir_ons_tor_fre_lør".split("_"),
    weekdaysMin : "sø_ma_ti_on_to_fr_lø".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD.MM.YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: '[I dag klokken] LT',
        nextDay: '[I morgen klokken] LT',
        nextWeek: 'dddd [klokken] LT',
        lastDay: '[I går klokken] LT',
        lastWeek: '[Forrige] dddd [klokken] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "om %s",
        past : "for %s siden",
        s : "noen sekunder",
        m : "ett minutt",
        mm : "%d minutter",
        h : "en time",
        hh : "%d timer",
        d : "en dag",
        dd : "%d dager",
        M : "en måned",
        MM : "%d måneder",
        y : "ett år",
        yy : "%d år"
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : nepali/nepalese
// author : suvash : https://github.com/suvash

var symbolMap = {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
},
numberMap = {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
};

moment.lang('ne', {
    months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split("_"),
    monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split("_"),
    weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split("_"),
    weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split("_"),
    weekdaysMin : 'आइ._सो._मङ्_बु._बि._शु._श.'.split("_"),
    longDateFormat : {
        LT : "Aको h:mm बजे",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY, LT",
        LLLL : "dddd, D MMMM YYYY, LT"
    },
    preparse: function (string) {
        return string.replace(/[१२३४५६७८९०]/g, function (match) {
            return numberMap[match];
        });
    },
    postformat: function (string) {
        return string.replace(/\d/g, function (match) {
            return symbolMap[match];
        });
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 3) {
            return "राती";
        } else if (hour < 10) {
            return "बिहान";
        } else if (hour < 15) {
            return "दिउँसो";
        } else if (hour < 18) {
            return "बेलुका";
        } else if (hour < 20) {
            return "साँझ";
        } else {
            return "राती";
        }
    },
    calendar : {
        sameDay : '[आज] LT',
        nextDay : '[भोली] LT',
        nextWeek : '[आउँदो] dddd[,] LT',
        lastDay : '[हिजो] LT',
        lastWeek : '[गएको] dddd[,] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%sमा",
        past : "%s अगाडी",
        s : "केही समय",
        m : "एक मिनेट",
        mm : "%d मिनेट",
        h : "एक घण्टा",
        hh : "%d घण्टा",
        d : "एक दिन",
        dd : "%d दिन",
        M : "एक महिना",
        MM : "%d महिना",
        y : "एक बर्ष",
        yy : "%d बर्ष"
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : dutch (nl)
// author : Joris Röling : https://github.com/jjupiter

var monthsShortWithDots = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
    monthsShortWithoutDots = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");

moment.lang('nl', {
    months : "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
    monthsShort : function (m, format) {
        if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[m.month()];
        } else {
            return monthsShortWithDots[m.month()];
        }
    },
    weekdays : "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
    weekdaysShort : "zo._ma._di._wo._do._vr._za.".split("_"),
    weekdaysMin : "Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD-MM-YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: '[Vandaag om] LT',
        nextDay: '[Morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[Gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "over %s",
        past : "%s geleden",
        s : "een paar seconden",
        m : "één minuut",
        mm : "%d minuten",
        h : "één uur",
        hh : "%d uur",
        d : "één dag",
        dd : "%d dagen",
        M : "één maand",
        MM : "%d maanden",
        y : "één jaar",
        yy : "%d jaar"
    },
    ordinal : function (number) {
        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : norwegian nynorsk (nn)
// author : https://github.com/mechuwind

moment.lang('nn', {
    months : "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort : "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
    weekdays : "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
    weekdaysShort : "sun_mån_tys_ons_tor_fre_lau".split("_"),
    weekdaysMin : "su_må_ty_on_to_fr_lø".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "YYYY-MM-DD",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: '[I dag klokka] LT',
        nextDay: '[I morgon klokka] LT',
        nextWeek: 'dddd [klokka] LT',
        lastDay: '[I går klokka] LT',
        lastWeek: '[Føregående] dddd [klokka] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "om %s",
        past : "for %s siden",
        s : "noen sekund",
        m : "ett minutt",
        mm : "%d minutt",
        h : "en time",
        hh : "%d timar",
        d : "en dag",
        dd : "%d dagar",
        M : "en månad",
        MM : "%d månader",
        y : "ett år",
        yy : "%d år"
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : polish (pl)
// author : Rafal Hirsz : https://github.com/evoL

var monthsNominative = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
    monthsSubjective = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_");

function plural(n) {
    return (n % 10 < 5) && (n % 10 > 1) && (~~(n / 10) !== 1);
}

function translate(number, withoutSuffix, key) {
    var result = number + " ";
    switch (key) {
    case 'm':
        return withoutSuffix ? 'minuta' : 'minutę';
    case 'mm':
        return result + (plural(number) ? 'minuty' : 'minut');
    case 'h':
        return withoutSuffix  ? 'godzina'  : 'godzinę';
    case 'hh':
        return result + (plural(number) ? 'godziny' : 'godzin');
    case 'MM':
        return result + (plural(number) ? 'miesiące' : 'miesięcy');
    case 'yy':
        return result + (plural(number) ? 'lata' : 'lat');
    }
}

moment.lang('pl', {
    months : function (momentToFormat, format) {
        if (/D MMMM/.test(format)) {
            return monthsSubjective[momentToFormat.month()];
        } else {
            return monthsNominative[momentToFormat.month()];
        }
    },
    monthsShort : "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
    weekdays : "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
    weekdaysShort : "nie_pon_wt_śr_czw_pt_sb".split("_"),
    weekdaysMin : "N_Pn_Wt_Śr_Cz_Pt_So".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD.MM.YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
    },
    calendar : {
        sameDay: '[Dziś o] LT',
        nextDay: '[Jutro o] LT',
        nextWeek: '[W] dddd [o] LT',
        lastDay: '[Wczoraj o] LT',
        lastWeek: function () {
            switch (this.day()) {
            case 0:
                return '[W zeszłą niedzielę o] LT';
            case 3:
                return '[W zeszłą środę o] LT';
            case 6:
                return '[W zeszłą sobotę o] LT';
            default:
                return '[W zeszły] dddd [o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : "za %s",
        past : "%s temu",
        s : "kilka sekund",
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : "1 dzień",
        dd : '%d dni',
        M : "miesiąc",
        MM : translate,
        y : "rok",
        yy : translate
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : brazilian portuguese (pt-br)
// author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

moment.lang('pt-br', {
    months : "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
    monthsShort : "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
    weekdays : "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
    weekdaysShort : "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
    weekdaysMin : "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D [de] MMMM [de] YYYY",
        LLL : "D [de] MMMM [de] YYYY LT",
        LLLL : "dddd, D [de] MMMM [de] YYYY LT"
    },
    calendar : {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : "em %s",
        past : "%s atrás",
        s : "segundos",
        m : "um minuto",
        mm : "%d minutos",
        h : "uma hora",
        hh : "%d horas",
        d : "um dia",
        dd : "%d dias",
        M : "um mês",
        MM : "%d meses",
        y : "um ano",
        yy : "%d anos"
    },
    ordinal : '%dº'
});
})();
(function(){
// moment.js language configuration
// language : portuguese (pt)
// author : Jefferson : https://github.com/jalex79

moment.lang('pt', {
    months : "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
    monthsShort : "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
    weekdays : "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
    weekdaysShort : "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
    weekdaysMin : "Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D [de] MMMM [de] YYYY",
        LLL : "D [de] MMMM [de] YYYY LT",
        LLLL : "dddd, D [de] MMMM [de] YYYY LT"
    },
    calendar : {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek: function () {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT'; // Monday - Friday
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : "em %s",
        past : "%s atrás",
        s : "segundos",
        m : "um minuto",
        mm : "%d minutos",
        h : "uma hora",
        hh : "%d horas",
        d : "um dia",
        dd : "%d dias",
        M : "um mês",
        MM : "%d meses",
        y : "um ano",
        yy : "%d anos"
    },
    ordinal : '%dº',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : romanian (ro)
// author : Vlad Gurdiga : https://github.com/gurdiga
// author : Valentin Agachi : https://github.com/avaly

moment.lang('ro', {
    months : "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"),
    monthsShort : "Ian_Feb_Mar_Apr_Mai_Iun_Iul_Aug_Sep_Oct_Noi_Dec".split("_"),
    weekdays : "Duminică_Luni_Marţi_Miercuri_Joi_Vineri_Sâmbătă".split("_"),
    weekdaysShort : "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
    weekdaysMin : "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
    longDateFormat : {
        LT : "H:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY H:mm",
        LLLL : "dddd, D MMMM YYYY H:mm"
    },
    calendar : {
        sameDay: "[azi la] LT",
        nextDay: '[mâine la] LT',
        nextWeek: 'dddd [la] LT',
        lastDay: '[ieri la] LT',
        lastWeek: '[fosta] dddd [la] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "peste %s",
        past : "%s în urmă",
        s : "câteva secunde",
        m : "un minut",
        mm : "%d minute",
        h : "o oră",
        hh : "%d ore",
        d : "o zi",
        dd : "%d zile",
        M : "o lună",
        MM : "%d luni",
        y : "un an",
        yy : "%d ani"
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : russian (ru)
// author : Viktorminator : https://github.com/Viktorminator
// Author : Menelion Elensúle : https://github.com/Oire

function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}

function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': 'минута_минуты_минут',
        'hh': 'час_часа_часов',
        'dd': 'день_дня_дней',
        'MM': 'месяц_месяца_месяцев',
        'yy': 'год_года_лет'
    };
    if (key === 'm') {
        return withoutSuffix ? 'минута' : 'минуту';
    }
    else {
        return number + ' ' + plural(format[key], +number);
    }
}

function monthsCaseReplace(m, format) {
    var months = {
        'nominative': 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
        'accusative': 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_')
    },

    nounCase = (/D[oD]? *MMMM?/).test(format) ?
        'accusative' :
        'nominative';

    return months[nounCase][m.month()];
}

function weekdaysCaseReplace(m, format) {
    var weekdays = {
        'nominative': 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
        'accusative': 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_')
    },

    nounCase = (/\[ ?[Вв] ?(?:прошлую|следующую)? ?\] ?dddd/).test(format) ?
        'accusative' :
        'nominative';

    return weekdays[nounCase][m.day()];
}

moment.lang('ru', {
    months : monthsCaseReplace,
    monthsShort : "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
    weekdays : weekdaysCaseReplace,
    weekdaysShort : "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
    weekdaysMin : "вс_пн_вт_ср_чт_пт_сб".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD.MM.YYYY",
        LL : "D MMMM YYYY г.",
        LLL : "D MMMM YYYY г., LT",
        LLLL : "dddd, D MMMM YYYY г., LT"
    },
    calendar : {
        sameDay: '[Сегодня в] LT',
        nextDay: '[Завтра в] LT',
        lastDay: '[Вчера в] LT',
        nextWeek: function () {
            return this.day() === 2 ? '[Во] dddd [в] LT' : '[В] dddd [в] LT';
        },
        lastWeek: function () {
            switch (this.day()) {
            case 0:
                return '[В прошлое] dddd [в] LT';
            case 1:
            case 2:
            case 4:
                return '[В прошлый] dddd [в] LT';
            case 3:
            case 5:
            case 6:
                return '[В прошлую] dddd [в] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : "через %s",
        past : "%s назад",
        s : "несколько секунд",
        m : relativeTimeWithPlural,
        mm : relativeTimeWithPlural,
        h : "час",
        hh : relativeTimeWithPlural,
        d : "день",
        dd : relativeTimeWithPlural,
        M : "месяц",
        MM : relativeTimeWithPlural,
        y : "год",
        yy : relativeTimeWithPlural
    },

    ordinal: function (number, period) {
        switch (period) {
        case 'M':
        case 'd':
        case 'DDD':
            return number + '-й';
        case 'D':
            return number + '-го';
        case 'w':
        case 'W':
            return number + '-я';
        default:
            return number;
        }
    },

    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : slovak (sk)
// author : Martin Minka : https://github.com/k2s
// based on work of petrbela : https://github.com/petrbela

var months = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),
    monthsShort = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");

function plural(n) {
    return (n > 1) && (n < 5);
}

function translate(number, withoutSuffix, key, isFuture) {
    var result = number + " ";
    switch (key) {
    case 's':  // a few seconds / in a few seconds / a few seconds ago
        return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
    case 'm':  // a minute / in a minute / a minute ago
        return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
    case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'minúty' : 'minút');
        } else {
            return result + 'minútami';
        }
        break;
    case 'h':  // an hour / in an hour / an hour ago
        return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
    case 'hh': // 9 hours / in 9 hours / 9 hours ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'hodiny' : 'hodín');
        } else {
            return result + 'hodinami';
        }
        break;
    case 'd':  // a day / in a day / a day ago
        return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
    case 'dd': // 9 days / in 9 days / 9 days ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'dni' : 'dní');
        } else {
            return result + 'dňami';
        }
        break;
    case 'M':  // a month / in a month / a month ago
        return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
    case 'MM': // 9 months / in 9 months / 9 months ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'mesiace' : 'mesiacov');
        } else {
            return result + 'mesiacmi';
        }
        break;
    case 'y':  // a year / in a year / a year ago
        return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
    case 'yy': // 9 years / in 9 years / 9 years ago
        if (withoutSuffix || isFuture) {
            return result + (plural(number) ? 'roky' : 'rokov');
        } else {
            return result + 'rokmi';
        }
        break;
    }
}

moment.lang('sk', {
    months : months,
    monthsShort : monthsShort,
    monthsParse : (function (months, monthsShort) {
        var i, _monthsParse = [];
        for (i = 0; i < 12; i++) {
            // use custom parser to solve problem with July (červenec)
            _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
        }
        return _monthsParse;
    }(months, monthsShort)),
    weekdays : "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
    weekdaysShort : "ne_po_ut_st_št_pi_so".split("_"),
    weekdaysMin : "ne_po_ut_st_št_pi_so".split("_"),
    longDateFormat : {
        LT: "H:mm",
        L : "DD.MM.YYYY",
        LL : "D. MMMM YYYY",
        LLL : "D. MMMM YYYY LT",
        LLLL : "dddd D. MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[dnes o] LT",
        nextDay: '[zajtra o] LT',
        nextWeek: function () {
            switch (this.day()) {
            case 0:
                return '[v nedeľu o] LT';
            case 1:
            case 2:
                return '[v] dddd [o] LT';
            case 3:
                return '[v stredu o] LT';
            case 4:
                return '[vo štvrtok o] LT';
            case 5:
                return '[v piatok o] LT';
            case 6:
                return '[v sobotu o] LT';
            }
        },
        lastDay: '[včera o] LT',
        lastWeek: function () {
            switch (this.day()) {
            case 0:
                return '[minulú nedeľu o] LT';
            case 1:
            case 2:
                return '[minulý] dddd [o] LT';
            case 3:
                return '[minulú stredu o] LT';
            case 4:
            case 5:
                return '[minulý] dddd [o] LT';
            case 6:
                return '[minulú sobotu o] LT';
            }
        },
        sameElse: "L"
    },
    relativeTime : {
        future : "za %s",
        past : "pred %s",
        s : translate,
        m : translate,
        mm : translate,
        h : translate,
        hh : translate,
        d : translate,
        dd : translate,
        M : translate,
        MM : translate,
        y : translate,
        yy : translate
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : slovenian (sl)
// author : Robert Sedovšek : https://github.com/sedovsek

function translate(number, withoutSuffix, key) {
    var result = number + " ";
    switch (key) {
    case 'm':
        return withoutSuffix ? 'ena minuta' : 'eno minuto';
    case 'mm':
        if (number === 1) {
            result += 'minuta';
        } else if (number === 2) {
            result += 'minuti';
        } else if (number === 3 || number === 4) {
            result += 'minute';
        } else {
            result += 'minut';
        }
        return result;
    case 'h':
        return withoutSuffix ? 'ena ura' : 'eno uro';
    case 'hh':
        if (number === 1) {
            result += 'ura';
        } else if (number === 2) {
            result += 'uri';
        } else if (number === 3 || number === 4) {
            result += 'ure';
        } else {
            result += 'ur';
        }
        return result;
    case 'dd':
        if (number === 1) {
            result += 'dan';
        } else {
            result += 'dni';
        }
        return result;
    case 'MM':
        if (number === 1) {
            result += 'mesec';
        } else if (number === 2) {
            result += 'meseca';
        } else if (number === 3 || number === 4) {
            result += 'mesece';
        } else {
            result += 'mesecev';
        }
        return result;
    case 'yy':
        if (number === 1) {
            result += 'leto';
        } else if (number === 2) {
            result += 'leti';
        } else if (number === 3 || number === 4) {
            result += 'leta';
        } else {
            result += 'let';
        }
        return result;
    }
}

moment.lang('sl', {
    months : "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
    monthsShort : "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
    weekdays : "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
    weekdaysShort : "ned._pon._tor._sre._čet._pet._sob.".split("_"),
    weekdaysMin : "ne_po_to_sr_če_pe_so".split("_"),
    longDateFormat : {
        LT : "H:mm",
        L : "DD. MM. YYYY",
        LL : "D. MMMM YYYY",
        LLL : "D. MMMM YYYY LT",
        LLLL : "dddd, D. MMMM YYYY LT"
    },
    calendar : {
        sameDay  : '[danes ob] LT',
        nextDay  : '[jutri ob] LT',

        nextWeek : function () {
            switch (this.day()) {
            case 0:
                return '[v] [nedeljo] [ob] LT';
            case 3:
                return '[v] [sredo] [ob] LT';
            case 6:
                return '[v] [soboto] [ob] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[v] dddd [ob] LT';
            }
        },
        lastDay  : '[včeraj ob] LT',
        lastWeek : function () {
            switch (this.day()) {
            case 0:
            case 3:
            case 6:
                return '[prejšnja] dddd [ob] LT';
            case 1:
            case 2:
            case 4:
            case 5:
                return '[prejšnji] dddd [ob] LT';
            }
        },
        sameElse : 'L'
    },
    relativeTime : {
        future : "čez %s",
        past   : "%s nazaj",
        s      : "nekaj sekund",
        m      : translate,
        mm     : translate,
        h      : translate,
        hh     : translate,
        d      : "en dan",
        dd     : translate,
        M      : "en mesec",
        MM     : translate,
        y      : "eno leto",
        yy     : translate
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : Albanian (sq)
// author : Flakërim Ismani : https://github.com/flakerimi
// author: Menelion Elensúle: https://github.com/Oire (tests)

moment.lang('sq', {
    months : "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
    monthsShort : "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
    weekdays : "E Diel_E Hënë_E Marte_E Mërkure_E Enjte_E Premte_E Shtunë".split("_"),
    weekdaysShort : "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
    weekdaysMin : "D_H_Ma_Më_E_P_Sh".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
    },
    calendar : {
        sameDay : '[Sot në] LT',
        nextDay : '[Neser në] LT',
        nextWeek : 'dddd [në] LT',
        lastDay : '[Dje në] LT',
        lastWeek : 'dddd [e kaluar në] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "në %s",
        past : "%s me parë",
        s : "disa seconda",
        m : "një minut",
        mm : "%d minutea",
        h : "një orë",
        hh : "%d orë",
        d : "një ditë",
        dd : "%d ditë",
        M : "një muaj",
        MM : "%d muaj",
        y : "një vit",
        yy : "%d vite"
    },
    ordinal : '%d.',
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : swedish (sv)
// author : Jens Alm : https://github.com/ulmus

moment.lang('sv', {
    months : "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
    monthsShort : "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
    weekdays : "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
    weekdaysShort : "sön_mån_tis_ons_tor_fre_lör".split("_"),
    weekdaysMin : "sö_må_ti_on_to_fr_lö".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "YYYY-MM-DD",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: '[Idag] LT',
        nextDay: '[Imorgon] LT',
        lastDay: '[Igår] LT',
        nextWeek: 'dddd LT',
        lastWeek: '[Förra] dddd[en] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "om %s",
        past : "för %s sedan",
        s : "några sekunder",
        m : "en minut",
        mm : "%d minuter",
        h : "en timme",
        hh : "%d timmar",
        d : "en dag",
        dd : "%d dagar",
        M : "en månad",
        MM : "%d månader",
        y : "ett år",
        yy : "%d år"
    },
    ordinal : function (number) {
        var b = number % 10,
            output = (~~ (number % 100 / 10) === 1) ? 'e' :
            (b === 1) ? 'a' :
            (b === 2) ? 'a' :
            (b === 3) ? 'e' : 'e';
        return number + output;
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : thai (th)
// author : Kridsada Thanabulpong : https://github.com/sirn

moment.lang('th', {
    months : "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
    monthsShort : "มกรา_กุมภา_มีนา_เมษา_พฤษภา_มิถุนา_กรกฎา_สิงหา_กันยา_ตุลา_พฤศจิกา_ธันวา".split("_"),
    weekdays : "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
    weekdaysShort : "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"), // yes, three characters difference
    weekdaysMin : "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
    longDateFormat : {
        LT : "H นาฬิกา m นาที",
        L : "YYYY/MM/DD",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY เวลา LT",
        LLLL : "วันddddที่ D MMMM YYYY เวลา LT"
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return "ก่อนเที่ยง";
        } else {
            return "หลังเที่ยง";
        }
    },
    calendar : {
        sameDay : '[วันนี้ เวลา] LT',
        nextDay : '[พรุ่งนี้ เวลา] LT',
        nextWeek : 'dddd[หน้า เวลา] LT',
        lastDay : '[เมื่อวานนี้ เวลา] LT',
        lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "อีก %s",
        past : "%sที่แล้ว",
        s : "ไม่กี่วินาที",
        m : "1 นาที",
        mm : "%d นาที",
        h : "1 ชั่วโมง",
        hh : "%d ชั่วโมง",
        d : "1 วัน",
        dd : "%d วัน",
        M : "1 เดือน",
        MM : "%d เดือน",
        y : "1 ปี",
        yy : "%d ปี"
    }
});
})();
(function(){
// moment.js language configuration
// language : turkish (tr)
// authors : Erhan Gundogan : https://github.com/erhangundogan,
//           Burak Yiğit Kaya: https://github.com/BYK

var suffixes = {
    1: "'inci",
    5: "'inci",
    8: "'inci",
    70: "'inci",
    80: "'inci",

    2: "'nci",
    7: "'nci",
    20: "'nci",
    50: "'nci",

    3: "'üncü",
    4: "'üncü",
    100: "'üncü",

    6: "'ncı",

    9: "'uncu",
    10: "'uncu",
    30: "'uncu",

    60: "'ıncı",
    90: "'ıncı"
};

moment.lang('tr', {
    months : "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
    monthsShort : "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
    weekdays : "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
    weekdaysShort : "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
    weekdaysMin : "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD.MM.YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd, D MMMM YYYY LT"
    },
    calendar : {
        sameDay : '[bugün saat] LT',
        nextDay : '[yarın saat] LT',
        nextWeek : '[haftaya] dddd [saat] LT',
        lastDay : '[dün] LT',
        lastWeek : '[geçen hafta] dddd [saat] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : "%s sonra",
        past : "%s önce",
        s : "birkaç saniye",
        m : "bir dakika",
        mm : "%d dakika",
        h : "bir saat",
        hh : "%d saat",
        d : "bir gün",
        dd : "%d gün",
        M : "bir ay",
        MM : "%d ay",
        y : "bir yıl",
        yy : "%d yıl"
    },
    ordinal : function (number) {
        if (number === 0) {  // special case for zero
            return number + "'ıncı";
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
})();
(function(){
// moment.js language configuration
// language : Morocco Central Atlas Tamaziɣt in Latin (tzm-la)
// author : Abdel Said : https://github.com/abdelsaid

moment.lang('tzm-la', {
    months : "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
    monthsShort : "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
    weekdays : "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
    weekdaysShort : "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
    weekdaysMin : "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[asdkh g] LT",
        nextDay: '[aska g] LT',
        nextWeek: 'dddd [g] LT',
        lastDay: '[assant g] LT',
        lastWeek: 'dddd [g] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "dadkh s yan %s",
        past : "yan %s",
        s : "imik",
        m : "minuḍ",
        mm : "%d minuḍ",
        h : "saɛa",
        hh : "%d tassaɛin",
        d : "ass",
        dd : "%d ossan",
        M : "ayowr",
        MM : "%d iyyirn",
        y : "asgas",
        yy : "%d isgasn"
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : Morocco Central Atlas Tamaziɣt (tzm)
// author : Abdel Said : https://github.com/abdelsaid

moment.lang('tzm', {
    months : "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
    monthsShort : "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
    weekdays : "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
    weekdaysShort : "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
    weekdaysMin : "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[ⴰⵙⴷⵅ ⴴ] LT",
        nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
        nextWeek: 'dddd [ⴴ] LT',
        lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
        lastWeek: 'dddd [ⴴ] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
        past : "ⵢⴰⵏ %s",
        s : "ⵉⵎⵉⴽ",
        m : "ⵎⵉⵏⵓⴺ",
        mm : "%d ⵎⵉⵏⵓⴺ",
        h : "ⵙⴰⵄⴰ",
        hh : "%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
        d : "ⴰⵙⵙ",
        dd : "%d oⵙⵙⴰⵏ",
        M : "ⴰⵢoⵓⵔ",
        MM : "%d ⵉⵢⵢⵉⵔⵏ",
        y : "ⴰⵙⴳⴰⵙ",
        yy : "%d ⵉⵙⴳⴰⵙⵏ"
    },
    week : {
        dow : 6, // Saturday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : ukrainian (uk)
// author : zemlanin : https://github.com/zemlanin
// Author : Menelion Elensúle : https://github.com/Oire

function plural(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}

function relativeTimeWithPlural(number, withoutSuffix, key) {
    var format = {
        'mm': 'хвилина_хвилини_хвилин',
        'hh': 'година_години_годин',
        'dd': 'день_дні_днів',
        'MM': 'місяць_місяці_місяців',
        'yy': 'рік_роки_років'
    };
    if (key === 'm') {
        return withoutSuffix ? 'хвилина' : 'хвилину';
    }
    else if (key === 'h') {
        return withoutSuffix ? 'година' : 'годину';
    }
    else {
        return number + ' ' + plural(format[key], +number);
    }
}

function monthsCaseReplace(m, format) {
    var months = {
        'nominative': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_'),
        'accusative': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_')
    },

    nounCase = (/D[oD]? *MMMM?/).test(format) ?
        'accusative' :
        'nominative';

    return months[nounCase][m.month()];
}

function weekdaysCaseReplace(m, format) {
    var weekdays = {
        'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
        'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
        'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
    },

    nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ? 
        'accusative' :
        ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
            'genitive' :
            'nominative');

    return weekdays[nounCase][m.day()];
}

function processHoursFunction(str) {
    return function () {
        return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
    };
}

moment.lang('uk', {
    months : monthsCaseReplace,
    monthsShort : "січ_лют_бер_кві_тра_чер_лип_сер_вер_жов_лис_гру".split("_"),
    weekdays : weekdaysCaseReplace,
    weekdaysShort : "нед_пон_вів_срд_чет_птн_суб".split("_"),
    weekdaysMin : "нд_пн_вт_ср_чт_пт_сб".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD.MM.YYYY",
        LL : "D MMMM YYYY р.",
        LLL : "D MMMM YYYY р., LT",
        LLLL : "dddd, D MMMM YYYY р., LT"
    },
    calendar : {
        sameDay: processHoursFunction('[Сьогодні '),
        nextDay: processHoursFunction('[Завтра '),
        lastDay: processHoursFunction('[Вчора '),
        nextWeek: processHoursFunction('[У] dddd ['),
        lastWeek: function () {
            switch (this.day()) {
            case 0:
            case 3:
            case 5:
            case 6:
                return processHoursFunction('[Минулої] dddd [').call(this);
            case 1:
            case 2:
            case 4:
                return processHoursFunction('[Минулого] dddd [').call(this);
            }
        },
        sameElse: 'L'
    },
    relativeTime : {
        future : "за %s",
        past : "%s тому",
        s : "декілька секунд",
        m : relativeTimeWithPlural,
        mm : relativeTimeWithPlural,
        h : "годину",
        hh : relativeTimeWithPlural,
        d : "день",
        dd : relativeTimeWithPlural,
        M : "місяць",
        MM : relativeTimeWithPlural,
        y : "рік",
        yy : relativeTimeWithPlural
    },
    ordinal: function (number, period) {
        switch (period) {
        case 'M':
        case 'd':
        case 'DDD':
        case 'w':
        case 'W':
            return number + '-й';
        case 'D':
            return number + '-го';
        default:
            return number;
        }
    },

    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 7  // The week that contains Jan 1st is the first week of the year.
    }
});
})();
(function(){
// moment.js language configuration
// language : chinese
// author : suupic : https://github.com/suupic

moment.lang('zh-cn', {
    months : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
    monthsShort : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
    weekdays : "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
    weekdaysShort : "周日_周一_周二_周三_周四_周五_周六".split("_"),
    weekdaysMin : "日_一_二_三_四_五_六".split("_"),
    longDateFormat : {
        LT : "Ah点mm",
        L : "YYYY年MMMD日",
        LL : "YYYY年MMMD日",
        LLL : "YYYY年MMMD日LT",
        LLLL : "YYYY年MMMD日ddddLT",
        l : "YYYY年MMMD日",
        ll : "YYYY年MMMD日",
        lll : "YYYY年MMMD日LT",
        llll : "YYYY年MMMD日ddddLT"
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 9) {
            return "早上";
        } else if (hour < 11 && minute < 30) {
            return "上午";
        } else if (hour < 13 && minute < 30) {
            return "中午";
        } else if (hour < 18) {
            return "下午";
        } else {
            return "晚上";
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    ordinal : function (number, period) {
        switch (period) {
        case "d" :
        case "D" :
        case "DDD" :
            return number + "日";
        case "M" :
            return number + "月";
        case "w" :
        case "W" :
            return number + "周";
        default :
            return number;
        }
    },
    relativeTime : {
        future : "%s内",
        past : "%s前",
        s : "几秒",
        m : "1分钟",
        mm : "%d分钟",
        h : "1小时",
        hh : "%d小时",
        d : "1天",
        dd : "%d天",
        M : "1个月",
        MM : "%d个月",
        y : "1年",
        yy : "%d年"
    }
});
})();
(function(){
// moment.js language configuration
// language : traditional chinese (zh-tw)
// author : Ben : https://github.com/ben-lin

moment.lang('zh-tw', {
    months : "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
    monthsShort : "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
    weekdays : "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
    weekdaysShort : "週日_週一_週二_週三_週四_週五_週六".split("_"),
    weekdaysMin : "日_一_二_三_四_五_六".split("_"),
    longDateFormat : {
        LT : "Ah點mm",
        L : "YYYY年MMMD日",
        LL : "YYYY年MMMD日",
        LLL : "YYYY年MMMD日LT",
        LLLL : "YYYY年MMMD日ddddLT",
        l : "YYYY年MMMD日",
        ll : "YYYY年MMMD日",
        lll : "YYYY年MMMD日LT",
        llll : "YYYY年MMMD日ddddLT"
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 9) {
            return "早上";
        } else if (hour < 11 && minute < 30) {
            return "上午";
        } else if (hour < 13 && minute < 30) {
            return "中午";
        } else if (hour < 18) {
            return "下午";
        } else {
            return "晚上";
        }
    },
    calendar : {
        sameDay : '[今天]LT',
        nextDay : '[明天]LT',
        nextWeek : '[下]ddddLT',
        lastDay : '[昨天]LT',
        lastWeek : '[上]ddddLT',
        sameElse : 'L'
    },
    ordinal : function (number, period) {
        switch (period) {
        case "d" :
        case "D" :
        case "DDD" :
            return number + "日";
        case "M" :
            return number + "月";
        case "w" :
        case "W" :
            return number + "週";
        default :
            return number;
        }
    },
    relativeTime : {
        future : "%s內",
        past : "%s前",
        s : "幾秒",
        m : "一分鐘",
        mm : "%d分鐘",
        h : "一小時",
        hh : "%d小時",
        d : "一天",
        dd : "%d天",
        M : "一個月",
        MM : "%d個月",
        y : "一年",
        yy : "%d年"
    }
});
})();

moment.lang('en');

    }
    if (typeof define === "function" && define.amd) {
        define(["moment"], onload);
    }
    if (typeof window !== "undefined" && window.moment) {
        onload(window.moment);
    }
})();
