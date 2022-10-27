//! moment.js locale configuration
//! locale : Amharic [am]
//! author : Mario Parris : https://github.com/marioparris-qless

import moment from '../moment';

export default moment.defineLocale('am', {
    weekdays: 'እሁድ_ሰኞ_ማክሰኞ_ረቡዕ_ሃሙስ_አርብ_ቅዳሜ'.split('_'),
    weekdaysShort: 'እሑድ_ሰኞ_ማክሰ_ረቡዕ_ሐሙስ_ዓርብ_ቅዳሜ'.split('_'),
    weekdaysMin: ''.split('_'),
    months: 'ጃንዩወሪ_ፌብሩወሪ_ማርች_ኤፕሪል_ሜይ_ጁን_ጁላይ_ኦገስት_ሴፕቴምበር_ኦክቶበር_ኖቬምበር_ዲሴምበር'.split(
        '_'
    ),
    monthsShort: 'ጃንዩወሪ_ፌብሩወሪ_ማርች_ኤፕሪል_ሜይ_ጁን_ጁላይ_ኦገስት_ሴፕቴምበር_ኦክቶበር_ኖቬምበር_ዲሴምበር'.split(
        '_'
    ),
    meridiem: function (hour, minute, isLowercase) {
        return hour < 12 ? 'ጥዋት' : 'ከሰዓት';
    },
});
