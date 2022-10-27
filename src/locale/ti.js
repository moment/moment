//! moment.js locale configuration
//! locale : Tigrinya [ti]
//! author : Mario Parris : https://github.com/marioparris-qless

import moment from '../moment';

export default moment.defineLocale('ti', {
    weekdays: 'ሰንበት_ሰኑይ_ሰሉስ_ረቡዕ_ሓሙስ_ዓርቢ_ቀዳም'.split('_'),
    weekdaysShort: 'ሰን_ሰኑ_ሰሉ_ረቡ_ሓሙ_ዓር_ቀዳ_ሰን'.split('_'),
    weekdaysMin: ''.split('_'),
    months: 'ጥሪ_ለካቲት_መጋቢት_ሚያዝያ_ጉንበት_ሰነ_ሓምለ_ነሓሰ_መስከረም_ጥቕምቲ_ሕዳር_ታሕሳስ'.split('_'),
    monthsShort: 'ጥሪ_ለካ_መጋ_ሚያ_ግን_ሰነ_ሓም_ነሓ_መስ_ጥቅ_ሕዳ_ታሕ'.split('_'),
    meridiem: function (hour) {
        return hour < 12 ? 'ቅ.ቀ.' : 'ድ.ቀ.';
    },
});
