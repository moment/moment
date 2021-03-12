//! moment.js locale configuration
//! locale : Kabyle [kab]
//! authors : Slimane Selyan Amiri : https://github.com/SelyanKab
//!           ZiriSut : https://github.com/ZiriSut

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var monthsStrictRegex = /^(yennayer|fuṛar|meɣres|yebrir|mayyu|yunyu|yulyu|ɣuct|ctembeṛ|tubeṛ|nunembeṛ|duǧembeṛ)/i,
        monthsShortStrictRegex = /(yen\.?|fur\.?|meɣ|yeb\.?|may|yun|yul\.?|ɣuc|cte\.?|tub\.?|nun\.?|duǧ\.?)/i,
        monthsRegex = /(yen\.?|fur\.?|meɣ|yeb\.?|may|yun|yul\.?|ɣuc|cte\.?|tub\.?|nun\.?|duǧ\.?|yennayer|fuṛar|meɣres|yebrir|mayyu|yunyu|yulyu|ɣuct|ctembeṛ|tubeṛ|nunembeṛ|duǧembeṛ)/i,
        monthsParse = [
            /^yen/i,
            /^fur/i,
            /^meɣ/i,
            /^yeb/i,
            /^may/i,
            /^yun/i,
            /^yul/i,
            /^ɣuc/i,
            /^cte/i,
            /^tub/i,
            /^nun/i,
            /^duǧ/i,
        ];

    var kab = moment.defineLocale('kab', {
        months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
            '_'
        ),
        monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
            '_'
        ),
        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex: monthsStrictRegex,
        monthsShortStrictRegex: monthsShortStrictRegex,
        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,
        weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
        weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
        weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
        weekdaysParseExact: true,
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        calendar: {
            sameDay: '[Aujourd’hui à] LT',
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L',
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            ss: '%d secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            w: 'une semaine',
            ww: '%d semaines',
            M: 'un mois',
            MM: '%d mois',
            y: 'un an',
            yy: '%d ans',
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
        ordinal: function (number, period) {
            switch (period) {
                // TODO: Return 'e' when day of month > 1. Move this case inside
                // block for masculine words below.
                // See https://github.com/moment/moment/issues/3375
                case 'D':
                    return number + (number === 1 ? 'er' : '');

                // Words with masculine grammatical gender: mois, trimestre, jour
                default:
                case 'M':
                case 'Q':
                case 'DDD':
                case 'd':
                    return number + (number === 1 ? 'er' : 'e');

                // Words with feminine grammatical gender: semaine
                case 'w':
                case 'W':
                    return number + (number === 1 ? 're' : 'e');
            }
        },
        week: {
            dow: 1, // Monday is the first day of the week.
            doy: 4, // The week that contains Jan 4th is the first week of the year.
        },
    });

    return kab;

})));
