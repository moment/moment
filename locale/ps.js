//! moment.js locale configuration
//! locale : Pashto [ps]
//! author : Nassim Nasibullah : https://github.com/spinzar

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        && typeof require === 'function' ? factory(require('../moment')) :
    typeof define === 'function' && define.amd ? define(['../moment'], factory) :
    factory(global.moment)
 }(this, (function (moment) { 'use strict';


  var symbolMap = {
     '1': '۱',
     '2': '۲',
     '3': '۳',
     '4': '٤',
     '5': '۵',
     '6': '۶',
     '7': '۷',
     '8': '۸',
     '9': '۹',
     '0': '۰'
 };
 var numberMap = {
     '۱': '1',
     '۲': '2',
     '۳': '3',
     '٤': '4',
     '۵': '5',
     '۶': '6',
     '۷': '7',
     '۸': '8',
     '۹': '9',
     '۰': '0'
 };

  var ps = moment.defineLocale('ps', {
     months : 'سلواغه_كب_وری_غويی_غبرګولی_چنګاښ_زمری_وږی_تله_لړم_ليندۍ_مرغومی'.split('_'),
     monthsShort : 'سلواغه_كب_وری_غويی_غبرګولی_چنګاښ_زمری_وږی_تله_لړم_ليندۍ_مرغومی'.split('_'),
     weekdays : 'اتوار_ ګول_نهه_شورو_زیارت_جمعه_خالي ورځ'.split('_'),
     weekdaysShort : 'اتوار_ ګول_نهه_شورو_زیارت_جمعه_خالي ورځ'.split('_'),
     weekdaysMin : 'ا_ګ_ن_ش_ز_ج_خ'.split('_'),
     weekdaysParseExact : true,
     longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'YYYY/MM/DD',
        LL : 'YYYYکالMمیاشتDورځ',
        LLL : 'YYYYکالMمیاشتDورځ HH:mm',
        LLLL : 'YYYYکالMمیاشتDورځ HH:mm dddd',
        l : 'YYYY/MM/DD',
        ll : 'YYYYکالMمیاشتDورځ',
        lll : 'YYYYکالMمیاشتDورځ HH:mm',
        llll : 'YYYYکالMمیاشتDورځ HH:mm dddd'
     },
     meridiemParse: /د غرمې دمخه|ماسپښین/,
     isPM: function (input) {
         return /ماسپښین/.test(input);
     },
     meridiem : function (hour, minute, isLower) {
         if (hour < 12) {
             return 'د غرمې دمخه';
         } else {
             return 'ماسپښین';
         }
     },
     calendar : {
         sameDay : '[نن ورځ] LT',
         nextDay : '[سبا] LT',
         nextWeek : 'dddd [بله اونۍ] LT',
         lastDay : '[پرون] LT',
         lastWeek : '[تیره اونۍ]dddd LT',
         sameElse : 'L'
     },
     relativeTime : {
         future : 'وروسته %s',
         past : '%s مخکې',
         s : 'څو ثاني',
         m : 'يوه دقيقه',
         mm : '%d دقیقه',
         h : 'یو ساعت',
         hh : '%d ساعت',
         d : 'یوه ورځ',
         dd : '%d ورځ',
         M : 'يوه مياشت',
         MM : '%d مياشت',
         y : 'یو کال',
         yy : '%d کال'
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
     dayOfMonthOrdinalParse: /\d{1,2}\./,
     ordinal : '%d',
     week : {
         dow : 6, // Saturday is the first day of the week.
         doy : 12 // The week that contains Jan 1st is the first week of the year.
     }
 });

  return ps;

  })));
