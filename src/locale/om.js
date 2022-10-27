//! moment.js locale configuration
//! locale : Oromo [om]
//! author : Mario Parris : https://github.com/marioparris-qless

import moment from '../moment';

export default moment.defineLocale('om', {
    weekdays: 'Dilbata_Wixata_Facaasaa_Roobii_Kamisa_Jimaata_Sambata'.split(
        '_'
    ),
    weekdaysShort: 'Dil_Wix_Qib_Rob_Kam_Jim_San'.split('_'),
    weekdaysMin: ''.split('_'),
    // weekdaysParseExact: true,
    months: 'Amajjii_Guraandhala_Bitooteessa_Elba_Caamsa_Waxabajjii_Adooleessa_Hagayya_Fuulbana_Onkololeessa_Sadaasa_Muddee'.split(
        '_'
    ),
    monthsShort: 'Ama_Gur_Bit_Elb_Cam_Wax_Ado_Hag_Ful_Onk_Sad_Mud'.split('_'),
    // monthsRegex: monthsRegex,
    // monthsShortRegex: monthsRegex,
    // monthsStrictRegex: monthsStrictRegex,
    // monthsShortStrictRegex: monthsShortStrictRegex,
    // monthsParse: monthsParse,
    // longMonthsParse: monthsParse,
    // shortMonthsParse: monthsParse,
    meridiem: function (hour) {
        return hour < 12 ? 'WD' : 'WB';
    },
});
