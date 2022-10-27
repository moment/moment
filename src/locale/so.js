//! moment.js locale configuration
//! locale : Somali [so]
//! author : Mario Parris : https://github.com/marioparris-qless

import moment from '../moment';

export default moment.defineLocale('so', {
    weekdays: 'Axad_Isniin_Talaado_Arbaco_Khamiis_Jimco_Sabti'.split('_'),
    weekdaysShort: 'Axd_Isn_Tldo_Arbc_Khms_Jmc_Sbti'.split('_'),
    weekdaysMin: ''.split('_'),
    // weekdaysParseExact: true,
    months: 'Janaayo_Febraayo_Maarso_Abriil_Maajo_Juunyo_Luulyo_Ogoosto_Sebteembar_Oktoobar_Nofeembar_Diseembar'.split(
        '_'
    ),
    monthsShort: 'Jan_Feb_Mar_Abr_May_Jun_Lul_Ogs_Seb_Okt_Nof_Dis'.split('_'),
    // monthsRegex: monthsRegex,
    // monthsShortRegex: monthsRegex,
    // monthsStrictRegex: monthsStrictRegex,
    // monthsShortStrictRegex: monthsShortStrictRegex,
    // monthsParse: monthsParse,
    // longMonthsParse: monthsParse,
    // shortMonthsParse: monthsParse,
    meridiem: function (hour, minute, isLowercase) {
        return hour < 12 ? 'GH' : 'GD';
    },
});
