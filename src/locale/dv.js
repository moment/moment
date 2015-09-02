//! moment.js locale configuration
//! locale : dhivehi (dv)
//! author : Jawish Hameed : https://github.com/jawish

import moment from '../moment';

var months = [
    '\u0796\u07ac\u0782\u07aa\u0787\u07a6\u0783\u07a9',
    '\u078a\u07ac\u0784\u07aa\u0783\u07aa\u0787\u07a6\u0783\u07a9',
    '\u0789\u07a7\u0783\u07a8\u0797\u07aa',
    '\u0787\u07ad\u0795\u07b0\u0783\u07a9\u078d\u07aa',
    '\u0789\u07ad',
    '\u0796\u07ab\u0782\u07b0',
    '\u0796\u07aa\u078d\u07a6\u0787\u07a8',
    '\u0787\u07af\u078e\u07a6\u0790\u07b0\u0793\u07aa',
    '\u0790\u07ac\u0795\u07aa\u0793\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa',
    '\u0787\u07ae\u0786\u07b0\u0793\u07af\u0784\u07a6\u0783\u07aa',
    '\u0782\u07ae\u0788\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa',
    '\u0791\u07a8\u0790\u07ac\u0789\u07b0\u0784\u07a6\u0783\u07aa'
];

export default moment.defineLocale('dv', {
    months : months,
    monthsShort : months,
    weekdays : [
        '\u0787\u07a7\u078b\u07a8\u0787\u07b0\u078c\u07a6',
        '\u0780\u07af\u0789\u07a6',
        '\u0787\u07a6\u0782\u07b0\u078e\u07a7\u0783\u07a6',
        '\u0784\u07aa\u078b\u07a6',
        '\u0784\u07aa\u0783\u07a7\u0790\u07b0\u078a\u07a6\u078c\u07a8',
        '\u0780\u07aa\u0786\u07aa\u0783\u07aa',
        '\u0780\u07ae\u0782\u07a8\u0780\u07a8\u0783\u07aa'
    ],
    weekdaysShort : '\u0787\u07a7\u078b\u07a8_\u0780\u07af\u0789\u07a6_\u0787\u07a6\u0782\u07b0_\u0784\u07aa\u078b\u07a6_\u0784\u07aa\u0783\u07a7_\u0780\u07aa\u0786\u07aa_\u0780\u07ae\u0782\u07a8'.split('_'),
    weekdaysMin : '\u0787\u078b_\u0780\u0789_\u0787\u0782_\u0784\u078b_\u0784\u0783_\u0780\u0786_\u0780\u0782'.split('_'),
    longDateFormat : {

        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'D/M/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    meridiemParse: /\u0789\u0786|\u0789\u078a/,
    isPM : function (input) {
        return '\u0789\u078a' === input;
    },
    meridiem : function (hour, minute, isLower) {
        if (hour < 12) {
            return '\u0789\u0786';
        } else {
            return '\u0789\u078a';
        }
    },
    calendar : {
        sameDay : '[\u0789\u07a8\u0787\u07a6\u078b\u07aa] LT',
        nextDay : '[\u0789\u07a7\u078b\u07a6\u0789\u07a7] LT',
        nextWeek : 'dddd LT',
        lastDay : '[\u0787\u07a8\u0787\u07b0\u0794\u07ac] LT',
        lastWeek : '[\u078a\u07a7\u0787\u07a8\u078c\u07aa\u0788\u07a8] dddd LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : '\u078c\u07ac\u0783\u07ad\u078e\u07a6\u0787\u07a8 %s',
        past : '\u0786\u07aa\u0783\u07a8\u0782\u07b0 %s',
        s : '\u0790\u07a8\u0786\u07aa\u0782\u07b0\u078c\u07aa\u0786\u07ae\u0785\u07ac\u0787\u07b0',
        m : '\u0789\u07a8\u0782\u07a8\u0793\u07ac\u0787\u07b0',
        mm : '\u0789\u07a8\u0782\u07a8\u0793\u07aa %d',
        h : '\u078e\u07a6\u0791\u07a8\u0787\u07a8\u0783\u07ac\u0787\u07b0',
        hh : '\u078e\u07a6\u0791\u07a8\u0787\u07a8\u0783\u07aa %d',
        d : '\u078b\u07aa\u0788\u07a6\u0780\u07ac\u0787\u07b0',
        dd : '\u078b\u07aa\u0788\u07a6\u0790\u07b0 %d',
        M : '\u0789\u07a6\u0780\u07ac\u0787\u07b0',
        MM : '\u0789\u07a6\u0790\u07b0 %d',
        y : '\u0787\u07a6\u0780\u07a6\u0783\u07ac\u0787\u07b0',
        yy : '\u0787\u07a6\u0780\u07a6\u0783\u07aa %d'
    },
    preparse: function (string) {
        return string.replace(/،/g, ',');
    },
    postformat: function (string) {
        return string.replace(/,/g, '،');
    },
    week : {
        dow : 7,  // Sunday is the first day of the week.
        doy : 12  // The week that contains Jan 1st is the first week of the year.
    }
});
