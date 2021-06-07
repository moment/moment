//! moment.js locale configuration
//! locale : Kurdish [Northern]
//! author : Cyax : https://github.com/CYAXXX



   export default moment.defineLocale('ku-northern', {
    months: 'Çile_Reşemî_Adar_Avrêl_Gulan_Pûşber_Tîrmeh_Tebax_Îlon_Cotmeh_Mijdar_Berfanbar'.split(
        '_'
    ),
    monthsShort: 'Çil_Reş_Adr_Avr_Gul_Pûş_Tîr_Teb_Îlo_Cot_Mij_Ber'.split('_'),
    weekdays: 'Yekşem_Duşem_Sêşem_Çarşem_Pêncşem_În_Şemî'.split(
        '_'
    ),
    weekdaysShort: 'Yek_Duş_Sêş_Çarş_Pênc_În_Şem'.split('_'),
    weekdaysMin: 'Ye_Du_Sê_Ça_Pê_În_Şe'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    calendar: {
        sameDay: '[Îro di demjimêr] LT',
        nextDay: '[Sibehe di demjimêr] LT',
        nextWeek: 'dddd [di demjimêr] LT',
        lastDay: '[Duh di demjimêr] LT',
        lastWeek: '[Hefteya Dawî] dddd [di demjimêr] LT',
        sameElse: 'L',
    },
    relativeTime: {
        future: 'di %s',
        past: '%s borî',
        s: 'çirke',
        ss: '%d çirke',
        m: 'yek xulek',
        mm: '%d xulek',
        h: 'demjimêr',
        hh: '%d demjimêr',
        d: ' roj',
        dd: '%d roj',
        M: ' meh',
        MM: '%d meh',
        y: 'sal',
        yy: '%d sal',
    },
      },
    meridiem: function (hours, minutes, isLower) {
        if (hours < 12) {
            return isLower ? 'bn' : 'BN';
        } else {
            return isLower ? 'pn' : 'PN';
        }
    },
    meridiemParse: /bn|BN|pn|PN/,
    isPM: function (input) {
        return input === 'pn' || input === 'PN';
    },
    dayOfMonthOrdinalParse: /\d{1,2,3,4}(yemîn|yemîn|yemîn|emîn)/,
    ordinal: function (number) {
        var b = number % 10,
            output =
                ~~((number % 100) / 10) === 1
                    ? 'emîn'
                    : b === 1
                    ? 'yemîn'
                    : b === 2
                    ? 'yemîn'
                    : b === 3
                    ? 'yemîn'
                    : 'emîn';
        return number + output;
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
});
