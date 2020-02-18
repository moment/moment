//! moment.js locale configuration

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        && typeof require === 'function' ? factory(require('../../moment')) :
    typeof define === 'function' && define.amd ? define(['../moment'], factory) :
    factory(global.moment)
 }(this, (function (moment) { 'use strict';
 
 
     var Igbo = moment.defineLocale('en-gb', {
         months : 'Jenụwarị_Febụwarị_Machị_Eprel_Mee_Jun_Julaị_Ọgọstụ_Septemba_Ọktoba_Nọvemba_Disemba'.split('_'),
         monthsShort : 'Jen_Feb_Mac_Epr_May_Jun_Jul_Ọgst_Sep_Ọkt_Nọv_Dis'.split('_'),
         weekdays : 'Sọnde_Mọnde_Tuzdee_Wenezde_Tọzdee_Fraịde_Satọde'.split('_'),
         weekdaysShort : 'Sọn_Mọn_Tuz_Wen_Tọz_Fra_Sat'.split('_'),
         weekdaysMin : 'Sọ_Mọ_Tu_We_Tọ_Fr_Sa'.split('_'),
         longDateFormat : {
             LT : 'HH:mm',
             LTS : 'HH:mm:ss',
             L : 'DD/MM/YYYY',
             LL : 'D MMMM YYYY',
             LLL : 'D MMMM YYYY HH:mm',
             LLLL : 'dddd, D MMMM YYYY HH:mm'
         },
         calendar : {
             sameDay : '[Taa n\'elekere] LT',
             nextDay : '[Echi  n\'elekere] LT',
             nextWeek : 'dddd [na-abia] [n\'elekere] LT',
             lastDay : '[ụnyaahụ n\'elekere] LT',
             lastWeek : 'dddd [gara aga] [n\'elekere] LT',
             sameElse : 'L'
         },
         relativeTime : {
             future : '%s nke di n\'ihu',
             past : '%s gara aga',
             s : 'akara nkeji ole na ole',
             ss : 'akara nkeji %d',
             m : 'otu nkeji',
             mm : 'nkeji %d',
             h : 'otu elekere',
             hh : 'elekere %d',
             d : 'otu ụbọchị',
             dd : 'ụbọchị %d',
             M : 'ọnwa',
             MM : 'ọnwa %d',
             y : 'afọ',
             yy : 'afọ %d'
         },
         week : {
             dow : 1, // Monday is the first day of the week.
             doy : 4  // The week that contains Jan 4th is the first week of the year.
         }
     });
 
     return Igbo;
 
 })));
 