//! moment.js locale configuration
//! locale : Odia [od-ind]
//! author : Siddhant Singh : https://github.com/SiDD-sIngH


import moment from '../moment';

var symbolMap={
          1: '୧',
          2: '୨',
          3: '୩',
          4: '୪',
          5: '୫',
          6: '୬',
          7: '୭',
          8: '୮',
          9: '୯',
          0: '୦',
},
  numberMap={
           '୧' : '1',
           '୨' : '2',
           '୩': '3',
           '୪' : '4',
           '୫' : '5',
           '୬' : '6',
           '୭' : '7',
           '୮' : '8',
           '୯' : '9',
           '୦' : '0',       
 };

 export default moment.defineLocale('od-ind', {
    months: 'ଜାନୁଆରୀ_ଫେବ୍ରୁଆରୀ_ମାର୍ଚ_ଏପ୍ରିଲ_ମଇ_ଜୁନ_ଜୁଲାଇ_ଅଗଷ୍ଟ_ସେପ୍ଟେମ୍ବର_ଅକ୍ଟୋବର_ନଭେମ୍ବର_ଡିସେମ୍ବର'.split(
        '_'
    ),
    monthsShort:
    'ଜାନୁ._ ଫେବ୍._ମାର୍ଚ._ଏପ୍ରି._ମଇ._ଜୁନ._ଜୁଲା._ଅଗଷ୍ଟ._ସେପ୍ଟେ._ଅକ୍ଟୋ._ନଭେ._ଡିସେ.'.split(
            '_'
        ),
    monthsParseExact: true,
    weekdays: 'ସୋମବାର_ମଙ୍ଗଳବାର_ବୁଧବାର_ଗୁରୁବାର_ଶୁକ୍ରବାର_ଶନିବାର_ରବିବାର'.split(
        '_'
    ),
    weekdaysShort: 'ସୋ_ମଙ୍ଗ_ବୁ_ଗୁ_ଶୁ_ଶନି_ରବି'.split('_'),
    weekdaysMin: 'ସୋ_ମଙ୍ଗ_ବୁ_ଗୁ_ଶୁ_ଶନି_ରବି'.split('_'),
    longDateFormat: {
        LT: 'A h:mm ସମୟ',
        LTS: 'A h:mm:ss ସମୟ',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY, A h:mm ସମୟ',
        LLLL: 'dddd, D MMMM YYYY, A h:mm ସମୟ',
    },
    calendar: {
        sameDay: '[ଆଜ] LT',
        nextDay: '[କାଲି] LT',
        nextWeek: 'dddd LT',
        lastDay: '[ଗତକାଲି] LT',
        lastWeek: '[ଗତ] dddd LT',
        sameElse: 'L'
      },
      relativeTime: {
        future: '%s ମଧ୍ୟ',
        past: '%s ପୂର୍ବରୁ',
        s: 'ସେକଣ୍ଡସ୍',
        ss: '%d ସେକଣ୍ଡସ୍',
        m: 'ଏକ ମିନିଟ',
        mm: '%d ମିନିଟ',
        h: 'ଏକ ଘଣ୍ଟ',
        hh: '%d ଘଣ୍ଟ',
        d: 'ଏକ ଦି',
        dd: '%d ଦିନ',
        M: 'ଏକ ମାସ',
        MM: '%d ମାସ',
        y: 'ଗୋଟିଏ ବର୍ଷ',
        yy: '%d ବର୍ଷ',
      },
        preparse: function (string) {
            return string.replace(/[୧୨୩୪୫୬୭୮୯୦]/g, function (match) {
                return numberMap[match];
            });
        },
        postformat: function (string) {
            return string.replace(/\d/g, function (match) {
                return symbolMap[match];
            })}
        });
