(function () {
    var lang = {
            months : "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
            monthsShort : "Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
            weekdays : "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
            weekdaysShort : "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            longDateFormat : {
                XXXX: "HH:mm U\\hr",
                L : "DD.MM.YYYY",
                LL : "D. MMMM YYYY",
                LLL : "D. MMMM YYYY XXXX",
                LLLL : "dddd, D. MMMM YYYY XXXX"
            },
            meridiem : {
                AM : 'AM',
                am : 'am',
                PM : 'PM',
                pm : 'pm'
            },
            relativeDate : {
                today: "Heute um %time",
                tomorrow: 'Morgen um %time',
                next: '%weekday um %time',
                yesterday: 'Gestern um %time',
                last: 'letzten %weekday um %time'
            },
            relativeTime : {
                future : "in %s",
                past : "vor %s",
                s : "ein paar Sekunden",
                m : "einer Minute",
                mm : "%d Minuten",
                h : "einer Stunde",
                hh : "%d Stunden",
                d : "einem Tag",
                dd : "%d Tagen",
                M : "einem Monat",
                MM : "%d Monaten",
                y : "einem Jahr",
                yy : "%d Jahren"
            },
            ordinal : function (number) {
                return '.';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('de', lang);
    }
}());
