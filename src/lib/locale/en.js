import './prototype';
import { getSetGlobalLocale } from './locales';
import toInt from '../utils/to-int';

var monthsParse = [/^Jan/i, /^Feb/i, /^Mar/i, /^Apr/i, /^May/i, /^Jun/i, /^Jul/i, /^Aug/i, /^Sep/i, /^Oct/i, /^Nov/i, /^Dec/i];

getSetGlobalLocale('en', {
    monthsParse : monthsParse,
    longMonthsParse : monthsParse,
    shortMonthsParse : monthsParse,
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal : function (number) {
        var b = number % 10,
            output = (toInt(number % 100 / 10) === 1) ? 'th' :
            (b === 1) ? 'st' :
            (b === 2) ? 'nd' :
            (b === 3) ? 'rd' : 'th';
        return number + output;
    }
});
