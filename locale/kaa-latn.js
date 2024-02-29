//! moment.js locale configuration
//! locale : Karakalpak Latin [kaa-latn]
//! author : Azamat Jumabaev : github.com/zju1

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var kaaLatn = moment.defineLocale('kaa-latn', {
        months: 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentyabr_Oktyabr_Noyabr_Dekabr'.split(
            '_'
        ),
        monthsShort: 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
        weekdays:
            'Ekshembi_Dúyshembi_Shiyshembi_Sárshembi_Piyshembi_Juma_Shembi'.split(
                '_'
            ),
        weekdaysShort: 'Eksh_Dúy_Shiy_Sár_Piy_Juma_Shem'.split('_'),
        weekdaysMin: 'Ek_Dú_Shi_Sá_Pi_Ju_Sh'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'D MMMM YYYY, dddd HH:mm',
        },
        calendar: {
            sameDay: '[Búgin saat] LT [da]',
            nextDay: '[Erteń] LT [da]',
            nextWeek: 'dddd [kúni saat] LT [da]',
            lastDay: '[Keshe saat] LT [da]',
            lastWeek: "[Ótken] dddd [kúni saat] LT [da]",
            sameElse: 'L',
        },
        relativeTime: {
            future: 'Jaqın %s ishinde',
            past: 'Bir neshe %s aldın',
            s: 'sekund',
            ss: '%d sekund',
            m: 'bir minut',
            mm: '%d minut',
            h: 'bir saat',
            hh: '%d saat',
            d: 'bir kún',
            dd: '%d kún',
            M: 'bir ay',
            MM: '%d ay',
            y: 'bir jıl',
            yy: '%d jıl',
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 7, // The week that contains Jan 7th is the first week of the year.
        },
    });

    return kaaLatn;

})));
