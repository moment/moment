(function () {
    var lang = {
            months : "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
            monthsShort : "jan._feb._mar._apr._mei._jun._jul._aug._sep._okt._nov._dec.".split("_"),
            weekdays : "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
            weekdaysShort : "zo._ma._di._wo._do._vr._za.".split("_"),
            longDateFormat : { 
                L : "DD-MM-YYYY",
                LL : "MMMM D YYYY",
                LLL : "MMMM D YYYY HH:mm",
                LLLL : "dddd, D MMMM YYYY HH:mm"
            },
            relativeTime : {
                future : "over %s",
                past : "%s geleden",
                s : "een paar seconden",
                m : "één minuutje",
                mm : "%d minuten",
                h : "één uur",
                hh : "%d uren",
                d : "één dag",
                dd : "%d dagen",
                M : "één maand",
                MM : "%d maanden",
                y : "één jaar",
                yy : "%d jaren"
            },
            ordinal : function (number) {
                return (number === 1 || number === 8 || number >= 20) ? 'ste' : 'de';
            }
        };

    // Node
    if (typeof module !== 'undefined') {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('nl', lang);
    }
}());
