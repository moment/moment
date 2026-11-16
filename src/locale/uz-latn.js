//! moment.js locale configuration
//! locale : Uzbek Latin [uz-latn]
//! author : Rasulbek Mirzayev : github.com/Rasulbeeek

import moment from '../moment';

export default moment.defineLocale('uz-latn', {
    months: 'yanvar_fevral_mart_aprel_may_iyun_iyul_avgust_sentabr_oktabr_noyabr_dekabr'.split(
        '_'
    ),
    monthsShort: 'yan_fev_mar_apr_may_iyun_iyul_avg_sen_okt_noy_dek'.split('_'),
    weekdays:
        'yakshanba_dushanba_seshanba_chorshanba_payshanba_juma_shanba'.split(
            '_'
        ),
    weekdaysShort: 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
    weekdaysMin: 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'D MMMM YYYY, dddd HH:mm',
    },
    calendar: {
        sameDay: '[Bugun soat] LT [da]',
        nextDay: '[Ertaga] LT [da]',
        nextWeek: 'dddd [kuni soat] LT [da]',
        lastDay: '[Kecha soat] LT [da]',
        lastWeek: "[O'tgan] dddd [kuni soat] LT [da]",
        sameElse: 'L',
    },
    relativeTime: {
        future: '%sdan keyin',
        past: '%s oldin',
        s: 'soniya',
        ss: '%d soniya',
        m: 'bir daqiqa',
        mm: '%d daqiqa',
        h: 'bir soat',
        hh: '%d soat',
        d: 'bir kun',
        dd: '%d kun',
        M: 'bir oy',
        MM: '%d oy',
        y: 'bir yil',
        yy: '%d yil',
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7, // The week that contains Jan 7th is the first week of the year.
    },
});
