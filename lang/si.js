// moment.js language configuration
// language : slovenian (si)
// author : Janez Troha : https://github.com/dz0ny

(function () {
    var lang = {
        months : ['Januar','Februar','Marc','April','Maj','Junij','Julij','Avgust','September','Oktober','Novemeber','December'],
        monthsShort : ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
        weekdays : ['Nedelja','Ponedeljek','Torek','Sreda','Četrtek','Petek','Sobota'],
        weekdaysShort : ['Ned','Pon','Tor','Sre','Čet','Pet','Sob'],
        longDateFormat : {
                LT : "HH:mm",
                L : "DD/MM/YYYY",
                LL : "D MMMM YYYY",
                LLL : "D MMMM YYYY LT",
                LLLL : "dddd, D MMMM YYYY LT"
        },
        calendar : {
             sameDay : '[Danes ob] LT',
             nextDay : '[Jutri ob] LT',
             nextWeek : 'dddd [at] LT',
             lastDay : '[Včeraj] LT',
             lastWeek : '[prejšnji teden] dddd [ob] LT',
             sameElse : 'L'
        },
        relativeTime : {
             future : "čez %s",
             past : "pred %s",
             s : "nekaj sekund",
             m : "eno minuto",
             mm : "%d minutami",
             h : "eno uro",
             hh : "%d urami",
             d : "enim dnevom",
             dd : "%d dnevi",
             M : "mesec",
             MM : "%d meseci",
             y : "enim letom",
             yy : "%d leti"
        },

        ordinal: function () {
                return 'º';
        }
    };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('si', lang);
    }
}());