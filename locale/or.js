//! moment.js locale configuration
//! locale : Odisa [or]
//! author : Mayank Singhal : https://github.com/mayanksinghal

;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' &&
    typeof require === 'function' ? factory(require('../moment')) :
    typeof define === 'function' && define.amd ? define(['../moment'], factory) :
    factory(global.moment)
}(this, (function (moment) {
  'use strict';

  //! moment.js locale configuration

  var symbolMap = {
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
    numberMap = {
      '୧': '1',
      '୨': '2',
      '୩': '3',
      '୪': '4',
      '୫': '5',
      '୬': '6',
      '୭': '7',
      '୮': '8',
      '୯': '9',
      '୦': '0',
    };

  var or = moment.defineLocale('or', {
    months: 'ଜାନୁଆରୀ_ଫେବ୍ରୁୟାରୀ_ମାର୍ଚ୍ଚ_ଅପ୍ରେଲ_ମେ_ଜୁନ_ଜୁଲାଇ_ଅଗଷ୍ଟ_ସେପ୍ଟେମ୍ବର_ଅକ୍ଟୋବର_ନଭେମ୍ବର_ଡିସେମ୍ବର'.split(
      '_'
    ),
    monthsShort: 'ଜାନ_ଫେବ୍ରୁ_ମାର୍_ଅପ୍ରଲ_ମେ_ଜୁନ_ଜୁଲ_ଅଗଷ୍ଟ_ସେପ୍_ଅକ୍ଟୋବ_ନଭେମ_ଡିସେ'.split(
      '_'
    ),
    monthsParseExact: true,
    weekdays: 'ରବିବାର_ସୋମବାର_ମଙ୍ଗଳବାର_ବୁଧବାର_ଗୁରୁବାର_ଶୁକ୍ରବାର_ଶନିବାର'.split(
      '_'
    ),
    weekdaysShort: 'ରବି_ସୋମ_ମଙ୍ଗଳ_ବୁଧ_ଗୁରୁ_ଶୁକ୍ର_ଶନି'.split('_'),
    weekdaysMin: 'ର_ସୋ_ମ_ବୁ_ଗୁ_ଶୁ_ଶ'.split('_'),
    longDateFormat: {
      LT: 'A h:mm',
      LTS: 'A h:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY, A h:mm',
      LLLL: 'dddd, D MMMM YYYY, A h:mm',
    },
    calendar: {
      sameDay: '[ଆଜି |] LT',
      nextDay: '[ଆସନ୍ତାକାଲି |] LT',
      nextWeek: 'ଆସନ୍ତା ସପ୍ତାହ, LT',
      lastDay: '[ଗତକାଲି] LT',
      lastWeek: '[ଶେଷ ସପ୍ତାହ] dddd, LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: '%s ରେ',
      past: '%s ପୂର୍ବରୁ',
      s: 'କିଛି ସେକେଣ୍ଡ୍ |',
      ss: '%d ସେକେଣ୍ଡ୍ |',
      m: 'ଏକ ମିନିଟ୍ |',
      mm: '%d ମିନିଟ୍ |',
      h: 'ଏକ ଘଣ୍ଟା',
      hh: '%d ଘଣ୍ଟା',
      d: 'ଗୋଟେ ଦିନ',
      dd: '%d ଦିନ',
      M: 'ଏକ ମାସ',
      MM: '%d ମାସଗୁଡିକ',
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
      });
    },
    dayOfMonthOrdinalParse: /\d{1,2}ର୍ଥ/,
    ordinal: '%dର୍ଥ',
    meridiemParse: /ରାତି|ସକାଳ|ଅପରାହ୍ନ|ସନ୍ଧ୍ୟା/,
    meridiemHour: function (hour, meridiem) {
      if (hour === 12) {
        hour = 0;
      }
      if (meridiem === 'ରାତି') {
        return hour < 4 ? hour : hour + 12;
      } else if (meridiem === 'ସକାଳ') {
        return hour;
      } else if (meridiem === 'ଅପରାହ୍ନ') {
        return hour >= 10 ? hour : hour + 12;
      } else if (meridiem === 'ସନ୍ଧ୍ୟା') {
        return hour + 12;
      }
    },
    meridiem: function (hour, minute, isLower) {
      if (hour < 4) {
        return 'ରାତି';
      } else if (hour < 10) {
        return 'ସକାଳ';
      } else if (hour < 17) {
        return 'ଅପରାହ୍ନ';
      } else if (hour < 20) {
        return 'ସନ୍ଧ୍ୟା';
      } else {
        return 'ରାତି';
      }
    },
    week: {
      dow: 0, // Sunday is the first day of the week.
      doy: 6, // The week that contains Jan 6th is the first week of the year.
    },
  });

  return or;

})));
