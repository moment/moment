// moment.js language configuration
// language : esperanto (eo)
// author : Colin Dean : https://github.com/colindean
// komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
//          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!
(function () {
    var lang = {
            months : "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
            monthsShort : "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
            weekdays : "Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato".split("_"),
            weekdaysShort : "Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab".split("_"),
            weekdaysMin : "Di_Lu_Ma_Me_Ĵa_Ve_Sa".split("_"),
            longDateFormat : {
                LT : "h:mm A",
                L : "YYYY-MM-DD",
                LL : "D-\\an \\de MMMM, YYYY",
                LLL : "D-\\an \\de MMMM, YYYY LT",
                LLLL : "dddd, \\l\\a D-\\an \\d\\e MMMM, YYYY LT"
            },
            calendar : {
                sameDay : '[Hodiaŭ je] LT',
                nextDay : '[Morgaŭ je] LT',
                nextWeek : 'dddd [je] LT', 
                lastDay : '[Hieraŭ je] LT',
                lastWeek : '[pasinta] dddd [je] LT', 
                sameElse : 'L'
            },
            relativeTime : {
                future : "je %s",
                past : "antaŭ %s",
                s : "sekundoj",
                m : "minuto",
                mm : "%d minutoj",
                h : "horo",
                hh : "%d horoj",
                d : "tago",//ne 'diurno', ĉar estas uzita por proksimumo
                dd : "%d tagoj",
                M : "monato",
                MM : "%d monatoj",
                y : "jaro",
                yy : "%d jaroj"
            },
            ordinal : function (number) {
                return "a";
            }
        };

    // Node
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = lang;
    }
    // Browser
    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
        this.moment.lang('eo', lang);
    }
}());
